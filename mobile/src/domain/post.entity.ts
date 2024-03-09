export interface Post {
  id: number;
  title: string;
  content: string;
  author_username: string;
}

export interface PostInput {
  title?: string;
  content?: string;
  author_username?: string;
}

export interface PostRepository {
  getAll(): Promise<Post[]>;
  getOne(id: number): Promise<Post>;
  delete(id: number): Promise<void>;
  create(input: PostInput): Promise<Post>;
}

export interface PostUsecase {
  getAll(): Promise<Post[]>;
  getOne(id: number): Promise<Post>;
  delete(id: number): Promise<void>;
  create(input: PostInput): Promise<Post>;
}
