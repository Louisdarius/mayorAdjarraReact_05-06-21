import https from '../utils/https';
import parseDate from 'date-fns/parse';

/**
 * Add appointments service
 */
export async function addAppointments(description, status) {
  return await https.post(`/appointments/`, {
    description: description,
    status: status,
  });
}

/**
 * View appointments service
 */
export async function viewAppointments(filter) {
  return await https.get(`/appointments/${filter}`, {});
}

/**
 * View each appointment service
 */
export async function viewEachAppointment(id) {
  return await https.get(`/appointments/${id}`, {});
}

/**
 * Update appointment service
 */
export async function updateAppointments(date, time, status, id) {
  return await https.put(`/appointments/${id}`, {
    date: parseDate(date, 'dd/MM/yyyy', new Date()),
    time: time,
    status: status,
  });
}

/**
 * Delete service
 */
export async function deleteAppointment(id) {
  return await https.remove(`/appointments/${id}`, {});
}
