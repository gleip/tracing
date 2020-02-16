import { Device } from '../../interfaces';
import { repositoryPerfomance } from '../../common/decorators';
import { tracer } from '../tracer';
import { Span } from 'opentracing';

export class DeviceRepository {
  private db = 'mongodb';
  constructor(private parent?: Span) {}
  private devices: Device[] = [
    {
      id: '8d98d0f7-9b28-448a-9c5b-9bbc500727b2',
      regionId: '1',
      userId: '8dd5c205-33d0-41b0-818d-cfa482914138',
      connected: true,
    },
    {
      id: '1e033e8f-c88e-405d-8577-111a0496cb13',
      regionId: '1',
      userId: '339805d2-ae3c-4381-927d-4d90f75d5d5e',
      connected: true,
    },
    {
      id: '5a1b54ab-2fa9-40bf-8f46-87be1bb894fa',
      regionId: '1',
      userId: '45cfd4e8-2db4-4411-b2a6-6c729b62fe5d',
      connected: true,
    },
  ];
  @repositoryPerfomance(tracer)
  public async getByRegion(regionId: string): Promise<Device[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.devices), 300);
    });
  }
}
