#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

function lint(){
  eslint --no-eslintrc --config .eslintrc ${@-.}
}

function git_require_clean_work_tree(){
  git diff --exit-code
}

function find_changelog_file(){
  # find the changelog file
  local CHANGELOG=""
  if test "$CHANGELOG" = ""; then
    CHANGELOG="$(ls | egrep '^(change|history)' -i | head -n1)"
    if test "$CHANGELOG" = ""; then
      CHANGELOG="CHANGELOG.md";
    fi
  fi
  echo $CHANGELOG
}

function find_last_git_tag(){
  git tag -l | sort -V | tail -n 1
}

# based on https://github.com/tj/git-extras/blob/master/bin/git-changelog
function generate_git_changelog(){
  GIT_LOG_OPTS="--no-merges"
  local DATE=$(date +'%Y-%m-%d')
  local HEAD='## '

  # get the commits between the most recent tag and the second most recent
  local lasttag=$(find_last_git_tag)
  local version=$(git describe --tags --abbrev=0 "$lasttag" 2>/dev/null)
  local previous_version=$(git describe --tags --abbrev=0 "$lasttag^" 2>/dev/null)
  # if we don't have a previous version to look at
  if test -z "$version"; then
    local head="$HEAD$DATE"
    local changes=$(git log $GIT_LOG_OPTS --pretty="format:* %s%n" 2>/dev/null)
  # the more common case, there's a version to git the changes betwen
  else
    local head="$HEAD$version | $DATE"
    # tail to get remove the first line, which will always just be the version commit
    # awk to remove empty lines
    local changes=$(tail -n +2 <<< "$(git log $GIT_LOG_OPTS --pretty="format:* %s%n" "$previous_version..$version" 2>/dev/null)" | awk NF)
  fi

  local CHANGELOG=$(find_changelog_file)

  echo "Editing $CHANGELOG"
  # insert the changes after the header (assumes markdown)
  # this shells out to node b/c I couldn't figure out how to do it with awk
  local tmp_changelog=/tmp/changelog
  node -e "console.log(require('fs').readFileSync(process.argv[1]).toString().replace(/(#.*?\n\n)/, '\$1' + process.argv.slice(2).join('\n') + '\n\n'))" "$CHANGELOG" "$head" "$changes" > $tmp_changelog

  # open the changelog in the editor for editing
  test -n "$EDITOR" && $EDITOR $tmp_changelog
  mv $tmp_changelog "$CHANGELOG"
}

function git_ammend_tag(){
  git add "$(find_changelog_file)"
  git commit --amend --no-edit --no-verify
  git tag "$(find_last_git_tag)" -f
}

function npm_release(){
  local version

  if [ -z "${1:-}" ]; then
    version="patch"
  else
    version="$1"
  fi

  npm version "$version" && generate_git_changelog && git_ammend_tag && npm run gitPush && npm publish
}

