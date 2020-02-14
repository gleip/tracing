import * as express from 'express';
import { Transport } from '../common/Transport';
import { ConnectedDevice } from '../interfaces';
import { DevicesMethods } from '../common/constants';
import { GetByRegion } from '../devices/handlers';

(async () => {
  const transport = new Transport();
  const port = 5000;

  await transport.connect();
  const api = express();

  api.get('/devices/:regionId', async (request, response) => {
    const result = await transport.publish<GetByRegion, ConnectedDevice[]>(DevicesMethods.getByRegion, {
      regionId: request.params.regionId,
    });

    response.send(result);

    return result;
  });
  api.listen(port, () => {
    console.info(`Server started on port ${port}`);
  });
})();
