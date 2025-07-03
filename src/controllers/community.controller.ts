import { Request, Response } from 'express';
import { CommunityPostService } from '../services/community.service';

const service = new CommunityPostService();

export const createCommunityPost = async (req: any, res: any) => {
  try {
    const user = req.user;
    if (!user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { type, content, tags } = req.body;

    const newPost = await service.createPost(user.id, {
      type,
      content,
      tags,
    });

    res.status(201).json({ message: 'Post created', data: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getAllCommunityPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await service.getAllPosts();
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};
