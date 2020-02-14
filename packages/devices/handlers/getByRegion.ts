import { DeviceRepository } from '../repository/Device';
import { LocationRepository } from '../repository/Location';
import { Msg, User } from '../../interfaces';
import { transport } from '../index';
import { UsersMethods } from '../../common/constants';
import { GetByIds } from '../../users/handlers';

export interface GetByRegion {
  regionId: string;
}

export async function getByRegion(request: Msg<GetByRegion>) {
  try {
    const deviceRepository = new DeviceRepository();
    const locationRepository = new LocationRepository();

    const regionId = request.regionId;
    const devices = await deviceRepository.getByRegion(regionId);

    const connectedDevices = await Promise.all(
      devices.map(async device => {
        const location = await locationRepository.getLocation(device.id);
        return { ...device, location };
      }),
    );

    const users: User[] = await transport.publish<GetByIds, User[]>(UsersMethods.getByIds, {
      ids: devices.map(device => device.id),
    });

    return connectedDevices.map(device => {
      const user = users.find(user => user.id === device.userId);
      return {
        ...device,
        user,
      };
    });
  } catch (error) {
    console.error(error);
    (this as any).createError(error);
  }
}