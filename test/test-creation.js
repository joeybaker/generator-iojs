'use strict'

var path = require('path')
  , test = require('tape')
  , helpers = require('yeoman-generator').test
  , fs = require('fs')
  , testDir = path.join(__dirname, 'temp')
  , _ = require('lodash')
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
  , defaultExpectedFiles = [
      'package.json'
      , '.editorconfig'
      , '.eslintrc'
      , '.gitignore'
      , '.npmignore'
      , '.npmrc'
      , '.travis.yml'
      , 'CHANGELOG.md'
      , 'CONTRIBUTING.md'
      , 'LICENSE'
      , 'README.md'
      , 'index.js'
      , 'scripts.sh'
      , 'test'
    ]
  , assertFilesInDir = function assertFilesInDir (t, dir, expectedFiles, callback) {
    fs.readdir(dir, function readFilesInDir (err, files) {
      t.error(err, t.name + ' should be able to read ' + dir)

      expectedFiles.forEach(function forEachExpectedFile (file) {
        t.ok(
          files.indexOf(file) > -1
          , t.name + ' outputs ' + dir + file
        )
      })

      if (callback) callback(err, files)
    })
  }

test('iojs generator creation: defaults', function creationTest (t) {
  var promptAnswers = _.clone(defaultProptAnswers)
    , runTests

  runTests = function runTests () {
      var expected = _.clone(defaultExpectedFiles)
        , expectedInTest = ['test.js']

      // 4 assertations + the count of files we expect
      t.plan(9 + expected.length + expectedInTest.length)

      assertFilesInDir(t, testDir, expected)
      assertFilesInDir(t, path.join(testDir, 'test'), expectedInTest)

      fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
        var pkgContents = file.toString()
        t.error(err, 'should be able to read the package.json')
        t.ok(
           /"name": "mymodule"/.test(pkgContents)
          , 'adds the module name to package.json'
        )
        t.ok(
           /"test-browser":/.test(pkgContents)
          , 'adds a `test-browser` script'
        )
        t.ok(
           /"test-server":/.test(pkgContents)
          , 'adds a `test-server` script'
        )
        t.ok(
           /"tdd-browser":/.test(pkgContents)
          , 'adds a `tdd-browser` script'
        )
        t.ok(
           /"tdd-server":/.test(pkgContents)
          , 'adds a `tdd-server` script'
        )
        t.ok(
           /npm_release restricted/.test(pkgContents)
          , 'passes the access level to npm_run'
        )
      })
    }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})

test('iojs generator creation: CLI only', function creationTest (t) {
  var promptAnswers = _.clone(defaultProptAnswers)
    , runTests

  promptAnswers.isServer = false
  promptAnswers.isBrowser = false
  promptAnswers.isCLI = true
  promptAnswers.name = 'my-module'

  runTests = function runTests () {
      var expected = _.clone(defaultExpectedFiles)
        , expectedInBin = [promptAnswers.name]
      expected.push('bin')

      // 4 assertations + the count of files we expect
      t.plan(9 + expected.length + expectedInBin.length)

      assertFilesInDir(t, testDir, expected)
      assertFilesInDir(t, path.join(testDir, 'bin'), expectedInBin)

      fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
        var pkgContents = file.toString()
        t.error(err, 'should be able to read the package.json')
        t.ok(
           /"name": "my-module"/.test(pkgContents)
          , 'adds the module name to package.json'
        )
        t.ok(
           /"my-module": "bin\/my-module"/.test(pkgContents)
          , 'sets the bin script'
        )
        t.ok(
           /"test":/.test(pkgContents)
          , 'adds a `test` script'
        )
        t.ok(
           /"tdd":/.test(pkgContents)
          , 'adds a `tdd` script'
        )
        t.notOk(
           /"tdd-server":/.test(pkgContents)
          , 'does not add a `tdd-server` script'
        )
        t.notOk(
           /"tdd-browser":/.test(pkgContents)
          , 'does not add a `tdd-browser` script'
        )
      })
    }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})

test('iojs generator creation: no es6', function creationTest (t) {
  var promptAnswers = _.clone(defaultProptAnswers)
    , runTests

  promptAnswers.isEs6 = false

  runTests = function runTests () {
      var expected = _.clone(defaultExpectedFiles)

      // assertations + the count of files we expect
      t.plan(6 + expected.length)

      assertFilesInDir(t, testDir, expected)

      fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
        var pkgContents = file.toString()
        t.error(err, 'should be able to read the package.json')
        t.ok(
          /"start": "node index/.test(pkgContents)
          , 'uses node, not babel to start'
        )
        t.notOk(
           /"build-es5":/.test(pkgContents)
          , 'does not add a build script'
        )
        t.notOk(
           /"watch":/.test(pkgContents)
          , 'does not add a watch script'
        )
        t.ok(
          new RegExp('"main": "index' + defaultProptAnswers.extension).test(pkgContents)
          , 'does not change the main extension to .es5'
        )
      })
    }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})
