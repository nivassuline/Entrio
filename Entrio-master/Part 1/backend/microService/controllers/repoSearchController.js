const { searchRepositoriesFromDataCollection, getRepoByName, getRepoById, getRepositoriesFromDb } = require('../services/repoSearchService');

const getAllRepos = async (req, res) => {
  const { page, perPage }  = req.query
  try {
    const repositories = await getRepositoriesFromDb(parseInt(page), parseInt(perPage))
    if (!repositories) {
      return res.status(404).json({ message: 'No repositories found' });
    }
    return res.json(repositories)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving repository' });
  }
}

const getRepositoryByNameOrId = async (req, res) => {
  const { name, id } = req.query;
  try {
    let repository;
    if (id) {
      repository = await getRepoById(id);
      if (!repository) {
        return res.status(404).json({ message: 'Repository not found' });
      }
    } else if (name) {
      repository = await getRepoByName(name);
      if (repository.repositories.length === 0) {
        const externalRepo = await searchRepositoriesFromDataCollection(name);
        if (externalRepo) {
          return res.json(externalRepo);
        } else {
          return res.status(404).json({ message: 'Repository not found' });
        }
      }
    } else {
      return res.status(400).json({ message: 'No repository name or ID provided' });
    }
    return res.json(repository);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving repository' });
  }
};

module.exports = {
  getRepositoryByNameOrId,
  getAllRepos
};