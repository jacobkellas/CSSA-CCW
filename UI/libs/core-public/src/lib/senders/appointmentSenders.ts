import Endpoints from '@shared-ui/api/endpoints';
import axios from 'axios';
import { AppointmentType } from '@shared-utils/types/defaultTypes';

export async function getAppointments() {
  const res = await axios
    .get(Endpoints.GET_AVAILABLE_APPOINTMENTS_ENDPOINT)
    .catch(err => {
      console.warn(err);

      return Promise.reject();
    });

  return res?.data;
}

export async function sendAppointmentCheck(body: AppointmentType) {
  const res = await axios
    .put(Endpoints.PUT_APPOINTMENTS_ENDPOINT, body)
    .catch(err => {
      console.warn(err);

      return Promise.reject();
    });

  return res?.data;
}
