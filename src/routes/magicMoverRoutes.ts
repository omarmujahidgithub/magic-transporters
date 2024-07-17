import { Router } from 'express';
import {
  addMagicMover,
  loadMagicMover,
  startMission,
  endMission,
  listTopMovers,
  startLoading
} from '../controllers/magicMoverController';

const router = Router();

router.post('/', addMagicMover);
router.post('/load', loadMagicMover);
router.post('/start-mission', startMission);
router.post('/end-mission', endMission);
router.post('/start-loading', startLoading);
router.get('/top-movers', listTopMovers);

export default router;
