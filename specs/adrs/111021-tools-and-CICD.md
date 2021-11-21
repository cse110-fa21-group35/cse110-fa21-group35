- Deciders: EggCellent (Team 35)
- Date: 2021/11/10

## Context and Problem Statement

1. What tools should we use to be able to create the MVP?
2. What should our CI/CD pipeline (and its diagram) be?

## Considered Options

1. HTML, CSS, Vanilla JS, Firebase/MongoDB/Redis, Possible Food API
2. Only leverage a CI pipeline, keep it simple with GitHub actions.(format stage, test stage, deployment stage). Whatever we use for our unit tests will be simply run as a routine in the CI pipeline. This pipeline should run upon pushing changes to any branch, and merging into main. CD might not be within our interests for time sake (we’re really just demoing, not shipping for customers)

## Decision Outcome

1.HTML, CSS, JS: Required; Firebase: Store user data so it can be accessed across multiple devices (not required but is a nice feature); Food API: Get nutrition facts/other recipe items (not required but helps for the features)

2.GitHub actions for CI, there’s a nifty tutorial and it’s the only true open source solution for GitHub rn.
