import { Location } from '../../interfaces';

export class LocationRepository {
  constructor() {}
  private locations = new Map<string, Location>([
    [
      '8d98d0f7-9b28-448a-9c5b-9bbc500727b2',
      {
        lat: 76.10916,
        lng: -104.94462,
      },
    ],
    [
      '1e033e8f-c88e-405d-8577-111a0496cb13',
      {
        lat: 11.88274,
        lng: -70.42192,
      },
    ],
    [
      '5a1b54ab-2fa9-40bf-8f46-87be1bb894fa',
      {
        lat: -21.53059,
        lng: 131.54647,
      },
    ],
  ]);

  public async getLocation(deviceId: string): Promise<Location> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.locations.get(deviceId)), 40);
    });
  }
}
