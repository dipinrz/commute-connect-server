import { Router } from 'express';
import { createCommunityPost, getAllCommunityPosts } from '../controllers/community.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);

router.post('/', createCommunityPost);
router.get('/', getAllCommunityPosts);

export default router;

