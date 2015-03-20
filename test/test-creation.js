'use strict'

var path = require('path')
  , test = require('tape')
  , helpers = require('yeoman-generator').test
  , fs = require('fs')
  , testDir = path.join(__dirname, 'temp')

test('iojs generator creation', function creationTest(t){
  var promptAnswers = {
      name: 'mymodule'
      , description: 'awesome module'
      , pkgName: false
      , license: 'Artistic 2.0'
      , homepage: 'https://github.com'
      , githubUsername: 'octocat'
      , authorName: 'Octo Cat'
      , authorEmail: 'octo@example.com'
      , authorUrl: 'http://yeoman.io'
      , keywords: 'keyword1,keyword2,keyword3'
    }
    , runTests

  runTests = function runTests(){
      var expected = [
        'package.json'
        , '.editorconfig'
        , '.gitignore'
        , '.eslintrc'
        , '.npmignore'
        , '.npmrc'
        , 'scripts.sh'
        , '.travis.yml'
        , 'README.md'
        , 'CONTRIBUTING.md'
        , 'CHANGELOG.md'
        , 'LICENSE'
      ]

      // 3 assertations + the count of files we expect
      t.plan(3 + expected.length)

      fs.readdir(testDir, function filesInTestDir(err, files){
        t.error(err, 'should be able to read the test dir')

        expected.forEach(function forEachExpectedFile(file){
          t.ok(
            files.indexOf(file) > -1
            , 'outputs ' + file
          )
        })

      })

      fs.readFile(path.join(testDir, 'package.json'), function readPackageJson(err, file){
        t.error(err, 'should be able to read the package.json')
        t.ok(
           /"name": "mymodule"/.test(file.toString())
          , 'adds the module name to package.json'
        )
      })

    }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompt(promptAnswers)
    .on('end', runTests)
})
