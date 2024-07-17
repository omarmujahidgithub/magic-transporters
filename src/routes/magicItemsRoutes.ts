import { Router } from 'express';
import { addMagicItem } from '../controllers/magicItemsController';

const router = Router();

router.post('/', addMagicItem);

export default router;
