import { Router } from 'express';
const router = Router();
import { collectRepoFromGithub } from '../controllers/repoCollectionController.js';

router.get('/collect', collectRepoFromGithub)


export default router;