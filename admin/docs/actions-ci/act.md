# How to Test CI Pipeline Locally, Using Act

- [act](https://github.com/nektos/act) is an opensource tool that allows us to run our CI pipeline locally. This will be helpful for when we add additional stages such as unit and e2e tests, and we want to ensure our code passes the necesary checks before we push to our PRs. Here's how to use act with our app:

## Set-up

1. First install [docker](https://docs.docker.com/get-docker/), which is necessary to run our pipeline.
2. Then install [act](https://github.com/nektos/act#installation), preferred way is homebrew (must have).

## Usage

1. Open docker, and wait for the docker engine to start up.
2. (Optional) Select which branch you wish to test, `git checkout <branch-name>`.
3. Navigate to the root of the project directory.
4. Then simply run `act` (runs entire pipeline) or `act -j test` (runs only the job test).

## Additional Useful Notes

- act usage notes can be found [here](https://github.com/nektos/act#example-commands)
- If you see something along the lines of: FAILURE, style/formatting check. Make sure you format the code on your branch with [prettier](https://prettier.io/docs/en/install.html). Simply run `npx prettier --write .` to format all .md, .yml, .html, .css, .js files, and you can also check if files are formatted with `--check` instead of write.
- Slack Logan if you're lost, please, I don't bite.
