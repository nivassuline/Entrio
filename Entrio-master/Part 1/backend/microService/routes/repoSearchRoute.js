const express = require('express');
const router = express.Router();
const { getRepositoryByNameOrId, getAllRepos } = require('../controllers/repoSearchController');

router.get('/repository', getRepositoryByNameOrId);
router.get('/repositories', getAllRepos);

module.exports = router;