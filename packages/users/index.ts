import { getByIds } from './handlers';
import { Transport } from '../common/Transport';
import { UsersMethods } from '../common/constants';
import { Msg } from '../interfaces';

export interface GetByIds {
  ids: string[];
}

(async () => {
  try {
    const transport = new Transport();
    await transport.connect();

    transport.subscribe<Msg<GetByIds>>(UsersMethods.getByIds, getByIds);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
