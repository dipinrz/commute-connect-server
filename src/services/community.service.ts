import { AppDataSource } from '../config/database.config';
import { CommunityPost } from '../entities/community.entity';
import { User } from '../entities/user.entity';

interface CreatePostDto {
  type: 'community' | 'ride' | 'adventure';
  content: string;
  tags?: string[];
}

export class CommunityPostService {
  private postRepo = AppDataSource.getRepository(CommunityPost);
  private userRepo = AppDataSource.getRepository(User);

  async createPost(userId: string, dto: CreatePostDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const post = this.postRepo.create({
      user,
      avatar: user.avatar || null,
      designation: user.designation || null,
      company: user.company || null,
      workBuilding: user.workBuilding || null,
      type: dto.type,
      content: dto.content,
      tags: dto.tags || [],
    });

    return await this.postRepo.save(post);
  }

  async getAllPosts() {
    return await this.postRepo.find({
      order: { createdAt: 'DESC' },
    });
  }
}
