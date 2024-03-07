export interface User {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UserLoginInput {
  username?: string;
  password?: string;
}

export interface UserRegisterInput {
  username?: string;
  password1?: string;
  password2?: string;
  first_name?: string;
  last_name?: string;
}

export interface Auth {
  token: string;
  user: User;
}

export interface UserRepository {
  login(input: UserLoginInput): Promise<{ key: string }>;
  register(input: UserRegisterInput): Promise<void>;
}

export interface UserUsecase {
  login(input: UserLoginInput): Promise<Auth>;
  register(input: UserRegisterInput): Promise<Auth>;
}
