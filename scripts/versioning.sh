#!/bin/bash

# abort the script if there is a non-zero error
set -e

# use git+ssh instead of https
git config --local url."ssh://git@github.com".insteadOf "https://github.com" || true
git config --local user.email circleci@circleci
git config --local user.name CircleCI

# add github to the list of known_hosts
echo "Add github.com to known_hosts"
cat ./scripts/known_hosts >> ~/.ssh/known_hosts

npm run increasePatchVersion
git push origin master
