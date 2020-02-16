import { Msg } from '../../interfaces';
import { UserRepository } from '../repository/User';

export interface GetByIds {
  ids: string[];
}

export async function getByIds(request: Msg<GetByIds>) {
  try {
    const userRepository = new UserRepository(this);
    const users = await userRepository.getByIds(request.ids);
    return users;
  } catch (error) {
    console.error(error);
    (this as any).createError(error);
  }
}
