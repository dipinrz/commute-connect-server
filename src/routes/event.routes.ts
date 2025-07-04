import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

const router = Router();

router.post('/', EventController.create);
router.get('/', EventController.getAllEvents);
router.get('/type', EventController.filterByType);
router.get('/tag', EventController.filterByTag);
router.get('/:id', EventController.getById);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.delete);

export default router;
