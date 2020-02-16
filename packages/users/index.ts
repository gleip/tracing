import { getByIds } from './handlers';
import { Transport } from '../common/Transport';
import { UsersMethods } from '../common/constants';
import { tracer } from './tracer';

export interface GetByIds {
  ids: string[];
}

export const transport = new Transport(tracer);

(async () => {
  try {
    await transport.connect();

    transport.subscribe(UsersMethods.getByIds, getByIds);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
