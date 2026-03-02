import {
  PollingTrainer,
  PollingTrainerCenter,
} from '../../../generated/prisma/client';

export type PollingTrainerPayload = PollingTrainer & {
  pollingTrainerCenters: PollingTrainerCenter[];
};

export interface loginPayload {
  name: string;
  password: string;
}
