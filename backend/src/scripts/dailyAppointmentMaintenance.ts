import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runDailyMaintenance() {
  console.log('Starting daily appointment maintenance...');

  const now = new Date();
  // Today's bounds (server local timezone)
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    // Find appointments scheduled for today
    const todays = await prisma.appointment.findMany({
      where: { scheduledAt: { gte: startOfDay, lte: endOfDay } },
    });

    console.log(`Found ${todays.length} appointments scheduled for today.`);

    for (const appt of todays) {
      if (appt.status === 'scheduled') {
        // Was scheduled and not started by end of day -> cancel
        console.log(`Cancelling appointment id=${appt.id} (status was scheduled)`);
        await prisma.appointment.update({ where: { id: appt.id }, data: { status: 'cancelled' } });
      } else if (appt.status === 'in_progress') {
        // Was in progress and not completed by end of day -> create follow-up 24h later
        const followUpDate = new Date(appt.scheduledAt);
        followUpDate.setDate(followUpDate.getDate() + 1);

        // Check idempotency: if a follow-up already exists for this appointment, skip
        const existingFollowUp = await prisma.appointment.findFirst({ where: { followUpOf: appt.id } });
        if (existingFollowUp) {
          console.log(`Follow-up already exists for appointment id=${appt.id}, skipping creation.`);
          continue;
        }

        // Also check for any appointment for same vehicle at same scheduled time to avoid duplicates
        const duplicate = await prisma.appointment.findFirst({
          where: {
            vehicleId: appt.vehicleId,
            scheduledAt: followUpDate,
          }
        });

        if (duplicate) {
          console.log(`A duplicate appointment was found for vehicleId=${appt.vehicleId} at ${followUpDate.toISOString()}, skipping creation.`);
          continue;
        }

        console.log(`Creating follow-up for appointment id=${appt.id} at ${followUpDate.toISOString()}`);

        await prisma.appointment.create({
          data: {
            customerId: appt.customerId,
            vehicleId: appt.vehicleId,
            mechanicId: appt.mechanicId,
            serviceId: appt.serviceId,
            scheduledAt: followUpDate,
            status: 'scheduled',
            description: appt.description,
            followUpOf: appt.id,
          },
        });
      } else {
        // cancelled or completed -> nothing to do
      }
    }

    console.log('Daily appointment maintenance finished.');
  } catch (err) {
    console.error('Error during daily appointment maintenance:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

runDailyMaintenance();
