const github = require('@actions/github')
const core = require('@actions/core');

async function run() {
    try {
        const token = core.getInput('github_token')
        const target_branch = core.getInput('target_branch')
        const source_ref = core.getInput('source_ref')
        const commit_message_template = core.getInput('commit_message_template')
        const octokit = github.getOctokit(token);

        const repo = github.context.repo

        const { data: branches } = await octokit.repos.listBranches({
            owner: repo.owner,
            repo: repo.repo
        });

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

        const filteredBranches = branches.filter((branch) => {
            // Extract the branch name
            const branchName = branch.name;

            // Extract the year and month from the branch name
            const [year, month] = branchName.split('/')[1].split('.').map(Number);

            // Calculate a numerical representation of the branch's release date
            const branchReleaseDate = year * 10000 + month * 100;

            // Calculate a numerical representation of the current date
            const currentDateValue = currentYear * 10000 + currentMonth * 100;

            // Check if the branch's release date is greater than or equal to the current date
            return branchReleaseDate >= currentDateValue;
        });

        for (const branch of filteredBranches) {
            let commitMessage = commit_message_template
                .replace('{source_ref}', source_ref)
                .replace('{target_branch}', branch.name);

            await octokit.repos.merge({
                owner: repo.owner,
                repo: repo.repo,
                base: branch.name,
                head: source_ref,
                commit_message: commitMessage
            })
        }

    } catch (e) {
        core.setFailed(e.message)
    }
}

// noinspection JSIgnoredPromiseFromCall
run();
