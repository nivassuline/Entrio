import { searchGitHubForRepo , getRepoLanguages } from '../services/repoCollectionService.js';
import repoCollection from '../models/repoModel.js'


export const collectRepoFromGithub = async (req,res) => {
    const repoName = req.query.name
    try {
        const repoSearch = await searchGitHubForRepo(repoName)
        if (repoSearch) {
            const repoLanguages = await getRepoLanguages(repoSearch.name, repoSearch.owner.login)
            const repo = {
                repoId: repoSearch.id,
                name: repoSearch.name.toLowerCase(),
                stargazers_count: repoSearch.stargazers_count,
                description: repoSearch.description,
                forks: repoSearch.forks,
                languages: repoLanguages,
                forks_count: repoSearch.forks_count,
                topics: repoSearch.topics
            }
            try {
                await repoCollection.create(repo)
            } catch (error) {
                console.error(error)
            }
            return res.json([repo])
        }
        return res.status(404).json({ message: 'Repository not found' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}