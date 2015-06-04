# <%= repoName %> <% if (!props.isPrivate) { %>[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]<% } %> [![Build Status][travis-image]][travis-url]

<%= props.description %>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
- [Events](#events)
- [Tests](#tests)
- [Developing](#developing)
  - [Requirements](#requirements)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -S <%= slugname %>
```


## Usage

```js
import <%= props.safeSlugname %> from '<%= slugname %>'

<%= props.safeSlugname %>('Rainbow')
```

## Methods
### get `(<String> string)`
Returns the string passed to it.

## Events
### myEvent `(<String> myString)`
Emitted when x happens. Passes `myString` which is a y.

## Tests
Tests are in [tape](https://github.com/substack/tape).

<% if (props.isBrowserAndServer) { %>* `npm test` will run both server and browser tests
* `npm run test-browser` and `npm run test-server` run their respective tests
* `npm run tdd-server` will run the server tests on every file change.
* `npm run tdd-browser` will run the browser tests on every file change.
<% } %><% if (props.isBrowser && !props.isServer) { %>
* `npm test` will run the tests in a browser
* `npm run tdd` will run the tests in a browser on every file change.
<% } %><% if (!props.isBrowser && (props.isServer || props.isCLI)) { %>
* `npm test` will run the tests
* `npm run tdd` will run the tests on every file change.
<% } %>

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## License

Artistic 2.0 © <% if (props.authorUrl) { %>[<%= props.authorName %>](<%= props.authorUrl %>)<% } else { %><%= props.authorName %><% } %> and contributors. A copy of the license can be found in the file `LICENSE`.


[npm-url]: https://npmjs.org/package/<%= slugname %>
[npm-image]: https://badge.fury.io/js/<%= escapedSlugname %>.svg
[travis-url]: https://travis-ci.org/<%= props.githubUsername %>/<%= repoName %>
[travis-image]: https://travis-ci.org/<%= props.githubUsername %>/<%= repoName %>.svg?branch=master
[daviddm-url]: https://david-dm.org/<%= props.githubUsername %>/<%= repoName %>.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/<%= props.githubUsername %>/<%= repoName %>
