import axios from 'axios';
import {
  CompleteApplication,
  HistoryType,
} from '@shared-utils/types/defaultTypes';
import Endpoints from '@shared-ui/api/endpoints';
import { v4 as uuidv4 } from 'uuid';

export async function createNewApplication(
  body: CompleteApplication,
  changeType: string,
  user: string
) {
  const applicationId = uuidv4().toString();
  const date = new Date(Date.now()).toUTCString();
  const historyLog: HistoryType = {
    change: changeType,
    dateTime: date,
    changeMadeBy: user,
  };

  body.id = applicationId;
  body.history.push(historyLog);

  const application = {
    application: body,
  };

  await axios
    .put(Endpoints.PUT_CREATE_PERMIT_ENDPOINT, application)
    .catch(err => {
      console.warn(err);

      return false;
    });

  return applicationId;
}

export async function updateApplication(
  body: CompleteApplication,
  changeType: string,
  user: string
) {
  const date = new Date(Date.now()).toUTCString();
  const historyLog: HistoryType = {
    change: changeType,
    dateTime: date,
    changeMadeBy: user,
  };

  body.history.push(historyLog);

  const application = {
    application: body,
  };

  const res = await axios
    .put(Endpoints.PUT_UPDATE_PERMIT_ENDPOINT, application)
    .catch(err => {
      console.warn(err);
    });

  return res?.data;
}
