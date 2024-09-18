import { Octokit } from 'octokit';
import { githubAuthKey } from '../config/config.js';


export const getRepoLanguages = async (repoName, repoOwner) => {
  const octokit = new Octokit({
    auth: githubAuthKey
  });
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/languages', {
      owner: repoOwner,
      repo: repoName
    })

    return Object.keys(response.data); 
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

export const searchGitHubForRepo = async (repoName) => {

  const octokit = new Octokit({
    auth: githubAuthKey
  });
  try {
    const response = await octokit.request('GET /search/repositories', {
      q: `${repoName} in:name`
    });

    return response.data.items[0];
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
};
