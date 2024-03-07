import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post, PostInput } from '../../../domain/post.entity';
import { PostRepositoryImpl } from '../../../repository/post.repository';
import { PostUsecaseImpl } from '../../../usecase/post.usecase';

const postRepository = new PostRepositoryImpl();
const postUsecase = new PostUsecaseImpl(postRepository);

export interface PostState {
  all?: Post[];
  allStatus: 'loading' | 'idle' | 'error' | 'fetched';
  detailed?: Post;
  detailedStatus: 'loading' | 'idle' | 'error' | 'fetched';
}

const initialState: PostState = {
  all: undefined,
  allStatus: 'idle',
  detailed: undefined,
  detailedStatus: 'idle',
};

export const getAll = createAsyncThunk<Post[], void>(
  'post/getAll',
  // Declare the type your function argument here:
  async () => {
    const response = await postUsecase.getAll();
    console.log('🚀 ~ post/getAll/response:', response);
    // Inferred return type: Promise<Post[]>
    return response as Post[];
  }
);

export const getOne = createAsyncThunk<Post, { id: number }>(
  'post/getOne',
  // Declare the type your function argument here:
  async ({ id }: { id: number }) => {
    const response = await postUsecase.getOne(id);
    console.log('🚀 ~ post/getOne/response:', response);
    // Inferred return type: Promise<Post[]>
    return response as Post;
  }
);

export const create = createAsyncThunk<Post, PostInput>(
  'post/create',
  // Declare the type your function argument here:
  async (input: PostInput) => {
    const response = await postUsecase.create(input);
    console.log('🚀 ~ post/create/response:', response);
    // Inferred return type: Promise<Post[]>
    return response as Post;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder.addCase(getAll.pending, (state) => {
      state.allStatus = 'loading';
    });
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.all = payload;
      state.allStatus = 'fetched';
    });
    builder.addCase(getAll.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.all = undefined;
      state.allStatus = 'error';
    });
    // GET ONE
    builder.addCase(getOne.pending, (state) => {
      state.detailedStatus = 'loading';
    });
    builder.addCase(getOne.fulfilled, (state, { payload }) => {
      state.detailed = payload;
      state.detailedStatus = 'fetched';
    });
    builder.addCase(getOne.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.detailed = undefined;
      state.detailedStatus = 'error';
    });

    // CREATE
    builder.addCase(create.pending, (state) => {
      // state.detailedStatus = 'loading';
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      state.all = [...state.all, payload];
      // state.detailedStatus = 'fetched';
    });
    builder.addCase(create.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      // state.detailed = undefined;
      // state.detailedStatus = 'error';
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = postSlice.actions;

export default postSlice.reducer;
