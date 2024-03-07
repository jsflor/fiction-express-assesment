import {
  UserUsecase,
  UserRepository,
  Auth,
  UserLoginInput,
  UserRegisterInput,
} from '../domain/user.entity';

export class UserUsecaseImpl implements UserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(input: UserLoginInput): Promise<Auth> {
    const res = await this.userRepository.login(input);

    console.log('🚀 ~ UserUsecaseImpl ~ login ~ res:', res);

    return {
      token: res?.key,
      user: {
        username: input.username,
        password: input.password,
      },
    };
  }

  async register(input: UserRegisterInput): Promise<Auth> {
    const res = await this.userRepository.register(input);

    console.log('🚀 ~ UserUsecaseImpl ~ register ~ res:', res);

    return {
      token: 'dummy',
      user: {
        username: input.username,
        password: input.password1,
      },
    };
  }
}
