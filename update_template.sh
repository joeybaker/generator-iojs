#!/bin/bash
# strict mode http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFS=$'\n\t'

function update_template(){
  # read from opts
  local dir_to_replace_in=$1
  local dir_to_read_from=$2

  # sources
  local package_name="package.json"
  local script_name="scripts.sh"
  local source_script="$dir_to_read_from/$script_name"
  local source_package="$dir_to_read_from/$package_name"
  local source_package_scripts=$(cat $source_package | json -a scripts)

  # vars for working on files
  local work_script
  local work_dir
  local work_package
  local work_package_scripts

  # ensure dependencies are installed
  command -v json >/dev/null 2>&1 || { echo >&2 "json is required but it's not installed.  I'll just install that for you with 'npm i -g json'."; npm i -g json; }

  echo "finding script files…"
  local script_files=$(find $dir_to_replace_in -iname scripts.sh -maxdepth 2)
  echo $(echo $script_files | tr ' ' '\n' | wc -l)" directories found"

  # for each match, replace
  for work_script in $script_files
  do
    work_dir=$(dirname ${work_script})
    work_package="$work_dir/$package_name"
    work_package_scripts=$(cat $work_package | json -a scripts)

    # replace the scripts file if necessary
    if [ "$(diff $work_script $source_script)" != "" ]; then
      cp -f $source_script $work_script
      echo "UPDATED: $work_script"
    fi

    if [ "$(diff <(echo "$work_package_scripts") <(echo "$source_package_scripts"))" != "" ]; then
      node -e "var work=require('$work_package'), source=$source_package_scripts, fs = require('fs'); work.scripts = source; fs.writeFileSync('$work_package', JSON.stringify(work, null, 2) + '\n')"
      # echo $(cat $work_package) \
      #   "{\"scripts\": $source_package_scripts }" | json --deep-merge -I -f $work_package > $work_package
      echo "UPDATED $work_package"
    fi
  done

  echo "DONE"
}
update_template $@
