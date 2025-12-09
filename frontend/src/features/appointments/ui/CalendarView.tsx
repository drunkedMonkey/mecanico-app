import React, { useMemo, useState } from 'react';
import { Box, Typography, IconButton, Paper, useTheme, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Appointment } from '../domain/Appointment';
import { getStatusColor } from './statusStyles';

interface CalendarViewProps {
  appointments: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getMonthMatrix(year: number, month: number) {
  // Builds a matrix of weeks where each week has 7 entries and the week starts on Monday.
  const firstDay = new Date(year, month, 1);
  const lastDay = endOfMonth(firstDay);
  const matrix: (Date | null)[][] = [];

  let week: (Date | null)[] = [];
  // weekday of first day (0 = Sunday). Convert to Monday-first index (0 = Monday, 6 = Sunday)
  const rawWeekday = firstDay.getDay();
  const startWeekday = (rawWeekday + 6) % 7;

  // Fill initial empty cells (for days before the 1st of the month)
  for (let i = 0; i < startWeekday; i++) week.push(null);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  // Fill trailing empty cells
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }

  return matrix;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ appointments, onAppointmentClick }) => {
  const today = new Date();
  const [current, setCurrent] = useState<Date>(startOfMonth(today));
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  const apptsByDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    appointments.forEach(a => {
      const d = new Date(a.scheduledAt);
      const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      const arr = map.get(key) || [];
      arr.push(a);
      map.set(key, arr);
    });
    return map;
  }, [appointments]);

  const matrix = useMemo(() => getMonthMatrix(current.getFullYear(), current.getMonth()), [current]);

  return (
    <Box sx={{ p: 2, boxSizing: 'border-box', width: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <IconButton onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Typography variant="h6">
          {(() => {
            const s = current.toLocaleString(undefined, { month: 'long', year: 'numeric' });
            return s.charAt(0).toUpperCase() + s.slice(1);
          })()}
        </Typography>
        <Box />
      </Box>

      <Box>
        {/* responsive calendar: month grid on md+, week rows (horizontal scroll) on small screens */}
        {isSm ? (
          <Box>
            {matrix.map((week, wi) => (
              <Box key={`week-${wi}`} sx={{ mb: 2, overflowX: 'auto' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 140px)', gap: '8px', minWidth: 'max-content', p: 1 }}>
                  {/* Week Headers */}
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                    <Box key={`h-${wi}-${d}`} sx={{ textAlign: 'center', p: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">{d}</Typography>
                    </Box>
                  ))}

                  {/* Week Days */}
                  {week.map((day, di) => {
                    const key = day ? `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}` : `empty-${wi}-${di}`;
                    const dayAppts = day ? (apptsByDate.get(key) || []) : [];
                    return (
                      <Box key={key} sx={{ p: 0.5 }}>
                        <Paper sx={{ height: '100%', aspectRatio: '1 / 1', p: 1, display: 'flex', flexDirection: 'column', boxShadow: 1, borderRadius: 1, bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color={day && day.toDateString() === new Date().toDateString() ? 'primary' : 'text.primary'}>
                              {day ? day.getDate() : ''}
                            </Typography>
                          </Box>
                          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {dayAppts.map(appt => (
                              <Paper
                                key={appt.id}
                                sx={{
                                  p: 0.5,
                                  mb: 0.5,
                                  cursor: onAppointmentClick ? 'pointer' : 'default',
                                  bgcolor: getStatusColor(appt.status),
                                  borderRadius: 1,
                                  border: '1px solid rgba(0,0,0,0.06)',
                                  boxShadow: 'none',
                                  width: '100%',
                                  boxSizing: 'border-box',
                                  overflow: 'hidden'
                                }}
                                onClick={() => onAppointmentClick && onAppointmentClick(appt)}
                              >
                                <Typography variant="caption" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {new Date(appt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {appt.vehiclePlate}
                                </Typography>
                              </Paper>
                            ))}
                          </Box>
                        </Paper>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(140px, 1fr))', gap: '8px', width: '100%', minWidth: '1000px' }}>
            {/* header labels */}
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
              <Box key={`h-${d}`} sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">{d}</Typography>
              </Box>
            ))}

            {/* day cells (flattened weeks) */}
            {matrix.flatMap((week, wi) => (
              week.map((day, di) => {
                const key = day ? `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}` : `empty-${wi}-${di}`;
                const dayAppts = day ? (apptsByDate.get(key) || []) : [];
                return (
                  <Box key={key} sx={{ p: 0.5, minWidth: 0 }}>
                    <Paper sx={{ aspectRatio: '1 / 1', height: '100%', p: 1, display: 'flex', flexDirection: 'column', boxShadow: 1, borderRadius: 1, bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color={day && day.toDateString() === new Date().toDateString() ? 'primary' : 'text.primary'}>
                          {day ? day.getDate() : ''}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {dayAppts.map(appt => (
                          <Paper
                            key={appt.id}
                            sx={{
                              p: 0.5,
                              mb: 0.5,
                              cursor: onAppointmentClick ? 'pointer' : 'default',
                              bgcolor: getStatusColor(appt.status),
                              borderRadius: 1,
                              border: '1px solid rgba(0,0,0,0.06)',
                              boxShadow: 'none',
                              width: '100%',
                              boxSizing: 'border-box',
                              overflow: 'hidden'
                            }}
                            onClick={() => onAppointmentClick && onAppointmentClick(appt)}
                          >
                            <Typography variant="caption" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {new Date(appt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {appt.vehiclePlate}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                );
              })
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CalendarView;
