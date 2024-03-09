import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post, PostInput } from '../../../domain/post.entity';
import { PostRepositoryImpl } from '../../../repository/post.repository';
import { PostUsecaseImpl } from '../../../usecase/post.usecase';
import { AppDispatch } from '../store';
import { Status } from '../../../utils/types';

const postRepository = new PostRepositoryImpl();
const postUsecase = new PostUsecaseImpl(postRepository);

export interface PostState {
  all?: Post[];
  allStatus: Status;
  detailed?: Post;
  detailedStatus: Status;
  createStatus: Status;
  deleteStatus: Status;
}

const initialState: PostState = {
  all: undefined,
  allStatus: 'idle',
  detailed: undefined,
  detailedStatus: 'idle',
  createStatus: 'idle',
  deleteStatus: 'idle',
};

export const getAll = createAsyncThunk<Post[], void, { dispatch: AppDispatch }>(
  'post/getAll',
  // Declare the type your function argument here:
  async () => {
    const response = await postUsecase.getAll();
    console.log('🚀 ~ post/getAll/response:', response);
    // Inferred return type: Promise<Post[]>
    return response as Post[];
  }
);

export const getOne = createAsyncThunk<
  Post,
  { id: number },
  { dispatch: AppDispatch }
>(
  'post/getOne',
  // Declare the type your function argument here:
  async ({ id }: { id: number }) => {
    const response = await postUsecase.getOne(id);
    console.log('🚀 ~ post/getOne/response:', response);
    // Inferred return type: Promise<Post>
    return response as Post;
  }
);

export const deleteOne = createAsyncThunk<
  any,
  { id: number },
  { dispatch: AppDispatch }
>(
  'post/deleteOne',
  // Declare the type your function argument here:
  async ({ id }: { id: number }) => {
    const response = await postUsecase.delete(id);
    console.log('🚀 ~ post/deleteOne/response:', response);
    // Inferred return type: Promise<Post>
    return response;
  }
);

export const create = createAsyncThunk<
  Post,
  PostInput,
  { dispatch: AppDispatch }
>(
  'post/create',
  // Declare the type your function argument here:
  async (input: PostInput, { dispatch }) => {
    const response = await postUsecase.create(input);
    console.log('🚀 ~ post/create/response:', response);
    // Inferred return type: Promise<Post>
    return response as Post;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCreateStatus: (
      state,
      action: { payload: 'loading' | 'idle' | 'error' | 'fetched' }
    ) => {
      state.createStatus = action.payload;
    },
    setDeleteStatus: (
      state,
      action: { payload: 'loading' | 'idle' | 'error' | 'fetched' }
    ) => {
      state.deleteStatus = action.payload;
    },
  },
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
      console.log('🚀 ~ builder.addCase.pending ~ payload:');
      state.createStatus = 'loading';
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      console.log('🚀 ~ builder.addCase.fulfilled ~ payload:', payload);
      // state.all = [...state.all, payload];
      state.createStatus = 'fetched';
    });
    builder.addCase(create.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.createStatus = 'error';
    });

    // DELETE ONE
    builder.addCase(deleteOne.pending, (state) => {
      state.deleteStatus = 'loading';
    });
    builder.addCase(deleteOne.fulfilled, (state, { payload }) => {
      state.detailed = undefined;
      state.deleteStatus = 'fetched';
    });
    builder.addCase(deleteOne.rejected, (state, { payload }) => {
      console.error('🚀 ~ builder.addCase.rejected ~ payload:', payload);
      state.deleteStatus = 'error';
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCreateStatus, setDeleteStatus } = postSlice.actions;

export default postSlice.reducer;
