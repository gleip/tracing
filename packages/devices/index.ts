import { getByRegion } from './handlers';
import { Transport } from '../common/Transport';
import { tracer } from './tracer';
import { DevicesMethods } from '../common/constants';

export const transport = new Transport(tracer);

(async () => {
  try {
    await transport.connect();

    transport.subscribe(DevicesMethods.getByRegion, getByRegion);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
