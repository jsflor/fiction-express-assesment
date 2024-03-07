import {
  Post,
  PostInput,
  PostRepository,
  PostUsecase,
} from '../domain/post.entity';

export class PostUsecaseImpl implements PostUsecase {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async create(input: PostInput): Promise<Post> {
    const res = await this.postRepository.create(input);
    console.log('🚀 ~ PostUsecaseImpl ~ create ~ res:', res);
    return res;
  }

  async getAll(): Promise<Post[]> {
    const res = await this.postRepository.getAll();
    console.log('🚀 ~ PostUsecaseImpl ~ getAll ~ res:', res);
    return res;
  }

  async getOne(id: number): Promise<Post> {
    const res = await this.postRepository.getOne(id);
    console.log('🚀 ~ PostUsecaseImpl ~ getOne ~ res:', res);
    return res;
  }
}
