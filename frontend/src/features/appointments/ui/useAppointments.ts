import { useState, useEffect } from 'react';
import { AppointmentRepository } from '../infrastructure/AppointmentRepository';
import type { Appointment } from '../domain/Appointment';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = () => {
    setLoading(true);
    const repository = new AppointmentRepository();
    repository.getAppointments()
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching appointments:", err);
        setError("No se pudieron cargar las citas. Asegúrate de que el backend está corriendo.");
        setLoading(false);
      });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      fetchAppointments();
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return { appointments, loading, error, refresh: fetchAppointments };
};
