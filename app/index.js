'use strict'

var path = require('path')
  , npm = require('npm')
  , npmName = require('npm-name')
  , yeoman = require('yeoman-generator')
  , getUsername = require('username')
  , getFullname = require('fullname')
  , _ = require('lodash')
  , mkdirp = require('mkdirp')
  , cwd = process.cwd()

module.exports = yeoman.generators.Base.extend({
  init: function init () {
    var done = this.async()
    this.pkg = require('../package.json')
    this.log(
      this.yeoman +
      '\nThe name of your project shouldn\'t contain "node" or "js" and' +
      '\nshould be a unique ID not already in use at npmjs.org.')
    npm.load(done)
  }

  , askForModuleName: function askForModuleName () {
    var done = this.async()
      , prompts

    prompts = [{
      name: 'name'
      , message: 'Module Name'
      , 'default': path.basename(cwd)
    }
    , {
      type: 'confirm'
      , name: 'pkgName'
      , message: 'The name above already exists on npm, choose another?'
      , 'default': true
      , when: function when (answers) {
        var whenDone = this.async()

        npmName(answers.name, function gotNPMName (err, available) {
          if (err || !available){
            return void whenDone(true)
          }

          whenDone(false)
        })
      }
    }]

    this.prompt(prompts, function onPrompt (props) {
      if (props.pkgName) return this.askForModuleName()

      this.slugname = _.deburr(props.name).split(' ').join('-')
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function safedTheSlugName (g) {
        return g[1].toUpperCase()
      })

      done()
    }.bind(this))
  }

  , askFor: function askFor () {
    var done = this.async()
      , prompts

    prompts = [{
      name: 'description'
      , message: 'Description'
      , 'default': 'The best module ever.'
    }
    , {
      name: 'homepage'
      , message: 'Homepage'
    }
    , {
      name: 'license'
      , message: 'License'
      , 'default': 'Artistic 2.0'
      , store: true
    }
    , {
      name: 'githubUsername'
      , message: 'GitHub username'
      , default: getUsername.sync()
      , store: true
    }
    , {
      name: 'authorName'
      , message: 'Author\'s Name'
      , default: npm.config.get('init.author.name') || getFullname.sync()
      , store: true
    }
    , {
      name: 'authorEmail'
      , message: 'Author\'s Email'
      , default: npm.config.get('init.author.email')
      , store: true
    }
    , {
      name: 'authorUrl'
      , message: 'Author\'s Homepage'
      , default: npm.config.get('init.author.site')
      , store: true
    }
    , {
      name: 'keywords'
      , message: 'Key your keywords (comma to split)'
    }]

    this.currentYear = (new Date()).getFullYear()

    this.prompt(prompts, function onPrompt (props) {
      if (props.githubUsername){
        this.repoUrl = props.githubUsername + '/' + this.slugname
      }
      else {
        this.repoUrl = 'user/repo'
      }

      this.keywords = props.keywords.split(',')
        .map(function trimKeywords (el) {
          return el.trim()
        })
        .filter(Boolean)

      this.props = props

      done()
    }.bind(this))
  }

  , app: function app () {
    this.config.save()
    this.copy('editorconfig', '.editorconfig')
    this.copy('gitignore', '.gitignore')
    this.copy('eslintrc', '.eslintrc')
    this.copy('npmignore', '.npmignore')
    this.copy('npmrc', '.npmrc')
    this.copy('scripts.sh', 'scripts.sh')
    this.copy('travis.yml', '.travis.yml')

    this.template('README.md', 'README.md')
    this.template('_package.json', 'package.json')
    this.template('CONTRIBUTING.md', 'CONTRIBUTING.md')
    this.template('CHANGELOG.md', 'CHANGELOG.md')
    this.copy('LICENSE', 'LICENSE')
  }

  , projectfiles: function projectfiles () {
    this.template('index.js', 'index.js')
    mkdirp(path.join(cwd, 'test'))
    this.template('test/test.js', 'test/test.js')
  }

  , install: function install () {
    this.installDependencies({
      bower: false
      , skipInstall: this.options['skip-install']
    })
  }
})
