var test = require('tape')
  , exec = require('child_process').execFile
  , path = require('path')
  , helpers = require('yeoman-generator').test
  , testDir = path.join(__dirname, 'temp')
  , eslintPath = path.join(__dirname, '../node_modules/.bin/eslint')
  , babelPath = path.join(__dirname, '../node_modules/.bin/babel')
  , appPath = path.join(testDir, 'index.js')
  , eslintRcPath = path.join(testDir, '.eslintrc')
  , defaultProptAnswers = {
    name: 'mymodule'
    , pkgName: false
    , description: 'awesome module'
    , homepage: 'https://github.com'
    , keywords: 'keyword1,keyword2,keyword3'
    , license: 'Artistic 2.0'
    , githubUsername: 'octocat'
    , authorName: 'Octo Cat'
    , authorEmail: 'octo@example.com'
    , authorUrl: 'http://yeoman.io'
    , isServer: true
    , isBrowser: true
    , isCLI: false
    , extension: '.js'
    , isPrivate: true
  }

test('iojs generator load', function generatorTest (t) {
  var runTests = function runTests () {
    var app = require('../app')

    t.ok(
      typeof app !== 'undefined'
      , 'can be imported without blowing up'
    )

    exec(eslintPath, ['-c ' + eslintRcPath, appPath], {cwd: testDir}, function eslintRan (err) {
      t.error(err, 'eslint doesn\'t error')
    })

    exec(babelPath, [appPath], {cwd: testDir}, function babelRan (err, stdout) {
      t.error(err, 'babel doesn\'t error')
      t.ok(stdout, 'babel produces output')
    })
  }

  t.plan(4)

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(defaultProptAnswers)
    .on('end', runTests)
})
