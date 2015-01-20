# Title

[![NPM](https://nodei.co/npm/{{name}}.png)](https://nodei.co/npm/{{name}}/) [![Build Status](https://travis-ci.org/{{username}}/{{name}}.png?branch=master)](https://travis-ci.org/{{username}}/{{name}}) ![Depencency status](https://david-dm.org/{{username}}/{{name}}.png)

{{DESCRIPTION}}

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
- [Events](#events)
  - [myEvent `(<String> myString)`](#myevent-string-mystring)
- [Tests](#tests)
- [Developing](#developing)
  - [Requirements](#requirements)
- [TODO](#todo)
- [Changelog](#changelog)
  - [1.0.0](#100)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Install
`npm install {{name}}`

## Usage
```js
var {{camelName}} = require('{{name}}')

```

## Methods

## Events
### myEvent `(<String> myString)`
Emitted when x happens. Passes `myString` which is a y.

## Tests
Tests are [prova](https://github.com/azer/prova), based on [tape](https://github.com/substack/tape). They can be run with `npm test`.

Tests can be run in a loop with `npm run tdd`

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## TODO
* [x] integrate https://github.com/inikulin/dmn
* [x] integrate https://github.com/thlorenz/doctoc

## Changelog
### 1.0.0
Initial Release
