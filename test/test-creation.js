const path = require('path')
const test = require('tape')
const helpers = require('yeoman-generator').test
const fs = require('fs')
const testDir = path.join(__dirname, 'temp')
const _ = require('lodash')
const glob = require('glob')

const defaultProptAnswers = {
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

const defaultExpectedFiles = [
  'package.json'
  , '.babelrc'
  , '.editorconfig'
  , '.eslintrc'
  , '.eslintignore'
  , '.gitignore'
  , '.npmignore'
  , '.npmrc'
  , '.travis.yml'
  , 'CHANGELOG.md'
  , '.github/CONTRIBUTING.md'
  , '.github/ISSUE_TEMPLATE.md'
  , '.github/PULL_REQUEST_TEMPLATE.md'
  , 'LICENSE'
  , 'README.md'
  , 'index.js'
  , 'scripts.sh'
  , 'test'
]

const assertFilesInDir = function assertFilesInDir (t, dir, expectedFiles, callback) {
  glob('**/*', {cwd: dir, dot: true}, function readFilesInDir (err, files) {
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
  const promptAnswers = _.clone(defaultProptAnswers)
  const runTests = function runTests () {
    const expected = _.clone(defaultExpectedFiles)
    const expectedInTest = ['test.js']

    // 4 assertations + the count of files we expect
    t.plan(12 + expected.length + expectedInTest.length)

    assertFilesInDir(t, testDir, expected)
    assertFilesInDir(t, path.join(testDir, 'test'), expectedInTest)

    fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
      const pkgContents = file.toString()
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
      t.ok(
         /"babel-plugin-closure-elimination":/.test(pkgContents)
        , 'includes the closure-elimination plugin'
      )
    })

    fs.readFile(path.join(testDir, '.travis.yml'), function readTravisYml (err, file) {
      const travisContents = file.toString()
      t.error(err, 'should be able to read .travis.yml')

      t.ok(
        /export DISPLAY=\:99\.0; sh \-e \/etc\/init.d\/xvfb start/.test(travisContents)
        , 'adds a before script, that starts xvfb for browser tests'
      )
    })
  }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})

test('iojs generator creation: CLI only', function creationTest (t) {
  const promptAnswers = _.clone(defaultProptAnswers)

  promptAnswers.isServer = false
  promptAnswers.isBrowser = false
  promptAnswers.isCLI = true
  promptAnswers.name = 'my-module'

  /* eslint-disable no-shadow */
  // eslint bug
  const runTests = function runTests () {
    /* eslint-enable no-shadow */
    const expected = _.clone(defaultExpectedFiles)
    const expectedInBin = [promptAnswers.name]

    expected.push('bin')

    // assertations + the count of files we expect
    t.plan(13 + expected.length + expectedInBin.length)

    assertFilesInDir(t, testDir, expected)
    assertFilesInDir(t, path.join(testDir, 'bin'), expectedInBin)

    fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
        const pkgContents = file.toString()
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
        t.ok(
          /"yargs"/.test(pkgContents)
          , 'install yargs'
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

    fs.readFile(path.join(testDir, 'bin', promptAnswers.name), function readPackageJson (err, file) {
        t.error(err, 'should be able to read the bin script')

        const cliContents = file.toString()

        t.ok(
           cliContents.indexOf('.usage(\'' + promptAnswers.description + '\')') > -1
          , 'adds the description to usage'
        )

        t.ok(
           cliContents.indexOf('.epilog(\'License: ' + promptAnswers.license + '\')') > -1
          , 'adds the license to epilog'
        )
      })
  }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})

test('iojs generator creation: no es6', function creationTest (t) {
  const promptAnswers = _.clone(defaultProptAnswers)

  promptAnswers.isEs6 = false

  /* eslint-disable no-shadow */
  // eslint bug
  const runTests = function runTests () {
    /* eslint-enable no-shadow */
    const expected = _.clone(defaultExpectedFiles)
    expected.splice(expected.indexOf('.babelrc'), 1)

    // assertations + the count of files we expect
    t.plan(9 + expected.length)

    assertFilesInDir(t, testDir, expected)

    fs.readFile(path.join(testDir, 'package.json'), function readPackageJson (err, file) {
        t.error(err, 'should be able to read the package.json')
        const pkgContents = file.toString()

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

    fs.readFile(path.join(testDir, '.eslintrc'), function readPackageJson (err, file) {
        t.error(err, 'should be able to read the .eslintrc')

        const eslintrcContents = file.toString()

        t.notOk(
           /"es6": true/.test(eslintrcContents)
          , 'does not enable es6 env'
        )

        t.notOk(
           /"ecmaFeatures": \{/.test(eslintrcContents)
          , 'does not enable ecmaFeatures'
        )
      })
  }

  helpers.run(path.join(__dirname, '..', 'app', 'index.js'))
    .inDir(testDir)
    .withPrompts(promptAnswers)
    .on('end', runTests)
})
