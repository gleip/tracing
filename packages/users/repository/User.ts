import { User } from '../../interfaces';

export class UserRepository {
  private users: User[] = [
    {
      id: '8dd5c205-33d0-41b0-818d-cfa482914138',
      name: '',
      address: '',
    },
    {
      id: '339805d2-ae3c-4381-927d-4d90f75d5d5e',
      name: '',
      address: '',
    },
    {
      id: '45cfd4e8-2db4-4411-b2a6-6c729b62fe5d',
      name: '',
      address: '',
    },
  ];

  public async getByIds(ids: string[]): Promise<User[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.users), 50);
    });
  }
}
