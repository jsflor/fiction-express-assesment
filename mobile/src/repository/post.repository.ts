import { Post, PostInput, PostRepository } from '../domain/post.entity';
import { NetworkImpl } from '../utils/network';

export class PostRepositoryImpl implements PostRepository {
  async create(input: PostInput): Promise<Post> {
    const res = await NetworkImpl.post('blogposts/', input);
    console.log('🚀 ~ PostRepositoryImpl ~ create ~ res:', res);
    return res;
  }

  async getAll(): Promise<Post[]> {
    const res = await NetworkImpl.get('blogposts/');
    console.log('🚀 ~ PostRepositoryImpl ~ getAll ~ res:', res);
    return res;
  }

  async getOne(id: number): Promise<Post> {
    const res = await NetworkImpl.get(`blogposts/${id}/`);
    console.log('🚀 ~ PostRepositoryImpl ~ getOne ~ res:', res);
    return res;
  }

  async delete(id: number): Promise<void> {
    const res = await NetworkImpl.delete(`blogposts/${id}/`);
    console.log('🚀 ~ PostRepositoryImpl ~ delete ~ res:', res);
    return res;
  }
}
