import {
  UserLoginInput,
  UserRegisterInput,
  UserRepository,
} from '../domain/user.entity';
import { NetworkImpl } from '../utils/network';

export class UserRepositoryImpl implements UserRepository {
  async login(input: UserLoginInput): Promise<{ key: string }> {
    const res = await NetworkImpl.post('auth/login/', input);

    console.log('🚀 ~ UserRepositoryImpl ~ login ~ res:', res);

    return res;
  }

  async register(input: UserRegisterInput): Promise<void> {
    const res = await NetworkImpl.post('auth/register/', input);

    console.log('🚀 ~ UserRepositoryImpl ~ register ~ res:', res);

    return res;
  }
}
