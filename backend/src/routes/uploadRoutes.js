import { Router } from 'express';
import { createUploadSession, listUploadSessions, getUploadSession, deleteUploadSession } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listUploadSessions);
router.post('/', requireAuth, createUploadSession);
router.get('/:id', requireAuth, getUploadSession);
router.delete('/:id', requireAuth, deleteUploadSession);

export default router;
