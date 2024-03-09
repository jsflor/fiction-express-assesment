import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Auth,
  User,
  UserLoginInput,
  UserRegisterInput,
} from '../../../domain/user.entity';
import { UserRepositoryImpl } from '../../../repository/user.repository';
import { UserUsecaseImpl } from '../../../usecase/user.usecase';
import { Status } from '../../../utils/types';

const userRepository = new UserRepositoryImpl();
const userUsecase = new UserUsecaseImpl(userRepository);

export interface UserState {
  user?: User;
  token?: string;
  status: Status;
}

const initialState: UserState = {
  user: undefined,
  token: undefined,
  status: 'idle',
};

export const login = createAsyncThunk<Auth, UserLoginInput>(
  'user/login',
  // Declare the type your function argument here:
  async (input: UserLoginInput) => {
    const response = await userUsecase.login(input);
    console.log('🚀 ~ user/login/response:', response);
    // Inferred return type: Promise<Auth>
    return response as Auth;
  }
);

export const register = createAsyncThunk<Auth, UserRegisterInput>(
  'user/register',
  // Declare the type your function argument here:
  async (input: UserRegisterInput) => {
    const response = await userUsecase.register(input);
    console.log('🚀 ~ user/register/response:', response);
    // Inferred return type: Promise<Auth>
    return response as Auth;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      state.status = 'fetched';
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.token = undefined;
      state.user = undefined;
      state.status = 'error';
    });
    // REGISTER
    builder.addCase(register.pending, (state) => {
      console.log('🚀 ~ builder.addCase.pending');
      state.status = 'loading';
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      console.log('🚀 ~ builder.addCase.rejected ~ fulfilled:', payload);
      state.token = payload.token;
      state.user = payload.user;
      state.status = 'fetched';
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.token = undefined;
      state.user = undefined;
      state.status = 'error';
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
