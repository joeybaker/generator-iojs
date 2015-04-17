# Changelog

## v1.6.3 | 2015-04-17
* eslint: rm react/displayName since jsx is common

## v1.6.2 | 2015-04-15
* bah… setting the engine doesn’t work

## v1.6.1 | 2015-04-15
* put back lint and test checks before release

## v1.6.0 | 2015-04-15
* fixes crazy generator error that came from the better `npm run lint`
* fixes for crazy undocumented yeoman changes
* Update yeoman generator

## v1.5.2 | 2015-04-14
* smarter `npm run lint`
* eslint rule modifications
* use slugname in generated test
* Fix eslint env config
* correct readme for rm prova

## v1.5.1 | 2015-03-29
* Update eslint-react-plugin

## v1.5.0 | 2015-03-29
* Move nsp check to travis fixes #1
* Much simpler git_require_clean_work_tree

## v1.4.2 | 2015-03-20
* generator tests: fix for new (non-semver!) yeoman-generator
* generator: hardlink eslintrc, actually runs eslint in dev
* readme: Fix usage command
* readme: Note that we're now using smokestack

## v1.4.1 | 2015-03-19
* generator: fix npmName callback #oops
* generator: fix: npm run tdd script
* Unpin yeoman generator, turns out it was a bug in my code :|
* eslint rule loosening
* Actually install eslint-plugin-react #oops

## v1.4.0 | 2015-03-17
* Add react plugin to eslint rules
* Loosening up some eslint rules
* CHANGE: `npm run tdd-server` instead of just `npm run tdd`
* update doctoc script to not fail if there's no CONTRIBUTING.md

## v1.3.4 | 2015-03-11
* rm babel-eslint. We can do this with eslint 0.16, and it was buggy

## v1.3.3 | 2015-03-11
* Update eslint, add more es6 goodness

## v1.3.2 | 2015-03-03
* eslint: change func-style to expression
* eslint: change curly to multi-line
* eslint: disable no-unused-expressions

## v1.3.1 | 2015-03-01
* Conform to eslintrc syntax for true/false, linter now… works.

## v1.3.0 | 2015-02-28
* Replace jscs and jscs with eslint

## v1.2.9 | 2015-02-27
* Don’t add version commit to changelog
* linted scripts

## v1.2.8 | 2015-02-27
* Upgrade npm-name
* Added `npm start` default

## v1.2.7 | 2015-02-26
* npmigonore .npmrc

## v1.2.6 | 2015-02-26
* npmignore yo generated files

## v1.2.5 | 2015-02-26
* Okay, for real this, time default tests pass

# v1.2.4 | 2015-02-26
* tests pass by default now

## v1.2.3 | 2015-02-26
* update test file to use tape #oops

## v1.2.2 | 2015-02-21
* Travis now runs against iojs and node 0.12

## v1.2.1 | 2015-02-05
* Add docs around new tests

## v1.2.0 | 2015-02-05
* Move to tape and smokestack in the template; prova just wasn't working
* Move tests to tape

## v1.1.0 | 2015-02-03
* Install covert for code-coverage

## v1.0.1 | 2015-01-29
* table of contents update
* fix typo in readme

## v1.0.0 | 2015-01-28
Using this across several projects already. It's stable enough to 1.0

* Add script to update the template across dirs
* remove Travis support for iojs again. It won’t support iojs until Feb 2 :(

## v0.7.13 | 2015-01-27
* Pin yeoman-generator version, latest breaks tests

## v0.7.12 | 2015-01-27
* Fix finding last git tag

## v0.7.11 | 2015-01-27
* Travis now supports iojs!

## v0.7.10 | 2015-01-22
* Travis doesn't support iojs yet :(

## v0.7.9 | 2015-01-20
* Add travis badge to readme

## v0.7.8 | 2015-01-20
* run travis tests in iojs

## v0.7.7 | 2015-01-20
* Ensure git tags are pushed

## v0.7.6 | 2015-01-20
* Add benefits to the readme

## v0.7.5 | 2015-01-20
* update npmignore

## v0.7.4 | 2015-01-20
* Update scripts

## v0.7.3 | 2015-01-20
* More readme cleanup

## v0.7.2 | 2015-01-20
* Note that the changelog is generated too

## v0.7.1 | 2015-01-20
* Update template readme

## v0.7.0 | 2015-01-20
* link scripts
* fix test
* update npmignore
* update readme
* update npmignore
* Now based off a fork of generator-node
* Updated License.

## v0.3.1 | 2015-01-20
* Add files key in package.json

## v0.3.0 | 2015-01-20
* 0.3.0
* rename to generator-iojs

## v0.2.0 | 2015-01-20
* table of contents update
* npm ignore the changelog
* fix bad git command
* Fix generator location
* Fix up readme

### 0.0.0
Init













































