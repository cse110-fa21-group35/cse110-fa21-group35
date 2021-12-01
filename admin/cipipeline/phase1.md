## Screenshot

![diagram](/admin/cipipeline/phase1.png)

## Currently Functional

- We can run an instance of our pipeline locally using act

1. Open docker, and wait for the docker engine to start up
2. (Optional) Select which branch you wish to test, git checkout <branch-name>
3. Navigate to the root of the project directory
4. Then simply run act or act -j test

- Is necessary for creating a CI/CD pipeline, also a nice sanity check for the developers.
- We are checking style of codes using prettier
- Utilizing npx prettier --write, we keep our .md, .yml, .html, .css, .js files in format.
- For the most part, prettier’s styling conforms to our linters.
- Configured linting with gh super linter, status badge indicating success.
- A status badge is generated and included at the top of the README.md after the job is finished. This is a great indicator for code quality in main.
- We have configurations for standard, jscpd, gitleaks, and markdown-lint.
- Additional linters with default linting settings are included for our css, html, and even human grammar
- Set up our jest test suite, and added it as a job in our pipeline
- Run using npm test
- We currently have sample unit tests

## What is planned

- Planning to implement additional unit and e2e tests. All hands on deck for thinking about testing.
- We need to mock our requests to firebase, or consider a QA/test environment instead.
- Can leverage a tool like mock-jest, but might be difficult to mock our requests as such since some of our CRUD uses the firebase sdk.
- The goal is to have basic validation.
- Set up deployment in our pipeline. Currently we are manually deploying to netlify; ideally we want to avoid this and just issue a new deployment of our app when a PR gets merged. We can also have this as a sort of check in our pipeline, whenever changes are pushed to a feature branch, we ensure the code is deployable (as in ensure the netlify deployment cycle succeeds).
