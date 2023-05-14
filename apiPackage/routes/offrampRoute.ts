import { Router } from 'express';
import { offRampCreated, getTransactions } from '../controllers/offramp';

const router = Router();

router.post('/offramp', offRampCreated);
router.get('/offramp', getTransactions);
router.get('/', (req, res) => {
  res.send('seen you too');
});

export default router;
