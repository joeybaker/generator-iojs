# <%= slugname %> [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

<%= props.description %>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [Developing](#developing)
  - [Requirements](#requirements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -S <%= slugname %>
```


## Usage

```js
var <%= safeSlugname %> = require('<%= slugname %>')

<%= safeSlugname %>('Rainbow')
```

## Methods
### get `(<String> string)`
Returns the string passed to it.

## Events
### myEvent `(<String> myString)`
Emitted when x happens. Passes `myString` which is a y.

## Tests
Tests are in [tape](https://github.com/substack/tape) and code coverage is run though [covert](https://github.com/substack/covert).

* `npm test` will run both server and browser tests
* `npm run test-browser` and `npm run test-server` run their respective tests
* `npm run tdd` will run the server tests on every file change.

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## License

Artistic 2.0 © [<%= props.authorName %>](<%= props.authorUrl %>)


[npm-url]: https://npmjs.org/package/<%= slugname %>
[npm-image]: https://badge.fury.io/js/<%= slugname %>.svg
[travis-url]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>
[travis-image]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>.svg?branch=master
[daviddm-url]: https://david-dm.org/<%= props.githubUsername %>/<%= slugname %>.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/<%= props.githubUsername %>/<%= slugname %>
