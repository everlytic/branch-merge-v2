// const github = require('@actions/github')
// const core = require('@actions/core');
//
// async function run() {
//     try {
//         const token = core.getInput('github_token')
//         const target_branch = core.getInput('target_branch')
//         const source_ref = core.getInput('source_ref')
//         const commit_message_template = core.getInput('commit_message_template')
//         const octokit = github.getOctokit(token);
//
//         const repo = github.context.repo
//
//         const { data: branches } = await octokit.repos.listBranches({
//             owner,
//             repo,
//         });
//
//         const currentDate = new Date();
//         const currentYear = currentDate.getFullYear();
//         const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
//
//         // Calculate the branch name pattern for the current year and month
//         const branchPattern = `release/${currentYear}.${currentMonth}.`;
//
//         const filteredBranches = branches.filter((branch) => {
//             // Check if the branch name starts with the current year and month pattern
//             return branch.name.startsWith(branchPattern);
//         });
//
//         for (const branch of filteredBranches) {
//             console.log("Branch:" + branch.name)
//             let commitMessage = commit_message_template
//                 .replace('{source_ref}', source_ref)
//                 .replace('{target_branch}', branch.name);
//
//             console.log("commitMessage:" + commitMessage)
//
//             console.log("target_branch:" + target_branch)
//             console.log("branch:" + branch.name)
//
//             // await octokit.repos.merge({
//             //     owner: repo.owner,
//             //     repo: repo.repo,
//             //     base: branch.name,
//             //     head: source_ref,
//             //     commit_message: commitMessage
//             // })
//         }
//
//     } catch (e) {
//         core.setFailed(e.message)
//     }
// }
//
// // noinspection JSIgnoredPromiseFromCall
// run();
