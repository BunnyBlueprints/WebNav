import { Router } from 'express';
import { createUploadSession, listUploadSessions } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listUploadSessions);
router.post('/', requireAuth, createUploadSession);

export default router;
