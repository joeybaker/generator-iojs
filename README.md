# Yoeman Generator for Node projects [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

A basic module template, that includes handy git hooks, a release script, es{6,2015} support via babel, and auto-changelog generation.

Here's what you get:

* auto-creates a `package.json`
* auto-creates and keeps your `.npmignore` file up-to-date
* auto-creates a `CONTRIBUTING.md`
* auto-creates a `LICENSE`
* auto-creates a `README.md` with a template that you can fill in
* auto-creates a `.travis.yml` for easy CI
* tests are auto-setup in `tape`, and it uses `smokestack` so you can do browser tests too.
* auto-runs tests and linters before a `git push`, to ensure you can never push bad code
* auto-runs the Node Security Project advisory list against installed node modules before a `git push` to make sure your project is always secure
* adds a release script to automate the headache of releasing a new version. It auto-generates a changelog, runs the tests, bumps the version, pushes to github, and publishes to npm.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [Install](#install)
  - [Usage](#usage)
  - [What Everything Does](#what-everything-does)
    - [`.babelrc`](#babelrc)
    - [`.editorconfig`](#editorconfig)
    - [`.gitignore`](#gitignore)
    - [`.eslintrc`](#eslintrc)
    - [`.npmignore`](#npmignore)
    - [`.npmrc`](#npmrc)
    - [`.travis.yml`](#travisyml)
    - [`README.md`](#readmemd)
    - [`LICENSE`](#license)
    - [`CHANGELOG.md`](#changelogmd)
    - [`CONTRIBUTING.md`](#contributingmd)
    - [`package.json`](#packagejson)
    - [`index.js`](#indexjs)
    - [`test/test.js`](#testtestjs)
    - [`bin/<module name>`](#binmodule-name)
  - [Developing](#developing)
  - [Tests](#tests)
    - [Requirements](#requirements)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Install
`npm install -g generator-iojs yo`

## Usage
```sh
yo iojs
```

## What Everything Does
### `.babelrc`
As long as you haven't turned off es6 (and why would you!?), this file is created to configure Babel, the es6 compiler. By default, it includes a [closure-elimination](https://github.com/codemix/babel-plugin-closure-elimination) plugin. This makes the compiled code faster!

### `.editorconfig`
[The Editor Config standard](http://editorconfig.org/) enforces very basic white space rules in files.

### `.gitignore`
Ever accidentally commit `.DS_Store` to git? There are a bunch of defaults here that you almost certainly don't want to commit.

### `.eslintrc`
Linters are good! They save you from making silly mistakes. This is a fairly opinionated linter setup, but it catches you from many silly errors. The linter will be run before every commit and before every release.

### `.npmignore`
What you commit to git and what you publish to npm don't need to be the same thing. Just like you wouldn't commit compiled files to git, you don't want to send unnecessary files to npm. When others `npm install` your module, they don't need all your tests or source files. These defaults strip out everything but what people really need when they install your module. It's kept up-to-date semi-automatically with [dmn](https://www.npmjs.com/package/dmn).

### `.npmrc`
Local configuration for npm commands. Most of the time, when you're installing modules, you want to save them to `package.json`. This changes the default behavior of `npm install` to always be `npm install --save`. `--save-dev` overrides this and works as normal.

### `.travis.yml`
Tests are good. Automatically testing is even better. [travis](https://travis-ci.org/) is free for open source modules and is a good choice for a CI server. This file is configured to automatically test your code against node 0.10, 0.12, and iojs latest. It puts you into the faster build environment on travis.

### `README.md`
Without docs, no one (including you, 3 months from now) will be able to figure out how to use this thing you've built! This readme provides a decent structure for a readme. It includes a table of contents that is automatically updated when deploying a new version.

### `LICENSE`
[You should have a license](https://help.github.com/articles/open-source-licensing/)

### `CHANGELOG.md`
Changelogs are really important for open source projects, but they're a pain to maintain. This changelog will automatically get updated (but give you a chance to edit it) every time you run `npm run release`.

### `CONTRIBUTING.md`
A file for github! This will show a banner above the new issue and new PR screens. This file has a set of general rules.

### `package.json`
So much magic! This sets up your node module with good defaults, and installs a bunch of dev dependencies to make magic! There are many included scripts to make dev life easier. `npm run release` and `npm run tdd` are some favorites.

### `index.js`
Just dummy content for your new node module.

### `test/test.js`
Just a dummy test file.

### `bin/<module name>`
If you specified this module as a CLI module, this file gets created for you. It should be a light-weight wrapper around `index.js` so that you can use the module both from the CLI and programatically.

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

## Tests
Tests are in [tape](https://github.com/substack/tape). They can be run with `npm test`.

Tests can be run in a loop with `npm run tdd`

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

# License
Artistic 2.0 © [Joey Baker](https://byjoeybaker.com)

[npm-url]: https://npmjs.org/package/generator-iojs
[npm-image]: https://badge.fury.io/js/generator-iojs.svg
[travis-url]: https://travis-ci.org/joeybaker/generator-iojs
[travis-image]: https://travis-ci.org/joeybaker/generator-iojs.svg?branch=master
[daviddm-url]: https://david-dm.org/joeybaker/generator-iojs.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/joeybaker/generator-iojs

