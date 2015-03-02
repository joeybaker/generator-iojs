'use strict'

var path = require('path')
  , npmName = require('npm-name')
  , yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  init: function init(){
    this.pkg = require('../package.json')
    this.log(
      this.yeoman +
      '\nThe name of your project shouldn\'t contain "node" or "js" and' +
      '\nshould be a unique ID not already in use at npmjs.org.')
  }

  , askForModuleName: function askForModuleName(){
    var done = this.async()
      , prompts

    prompts = [{
      name: 'name'
      , message: 'Module Name'
      , 'default': path.basename(process.cwd())
    }
    , {
      type: 'confirm'
      , name: 'pkgName'
      , message: 'The name above already exists on npm, choose another?'
      , 'default': true
      , when: function when(answers){
        var whenDone = this.async()

        npmName(answers.name, function gotNPMName(err, available){
          if (err) throw err

          if (!available){
            done(true)
            return
          }

          whenDone(false)
        })
      }
    }]

    this.prompt(prompts, function onPrompt(props){
      if (props.pkgName) return this.askForModuleName()

      this.slugname = this._.slugify(props.name)
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function safedTheSlugName(g){
        return g[1].toUpperCase()
      })

      done()
    }.bind(this))
  }

  , askFor: function askFor(){
    var cb = this.async()
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
      , store: true
    }
    , {
      name: 'authorName'
      , message: 'Author\'s Name'
      , store: true
    }
    , {
      name: 'authorEmail'
      , message: 'Author\'s Email'
      , store: true
    }
    , {
      name: 'authorUrl'
      , message: 'Author\'s Homepage'
      , store: true
    }
    , {
      name: 'keywords'
      , message: 'Key your keywords (comma to split)'
    }]

    this.currentYear = (new Date()).getFullYear()

    this.prompt(prompts, function onPrompt(props){
      if (props.githubUsername)
        this.repoUrl = props.githubUsername + '/' + this.slugname
      else
        this.repoUrl = 'user/repo'

      this.keywords = props.keywords.split(',').map(function trimKeywords(el){
        return el.trim()
      })

      this.props = props

      cb()
    }.bind(this))
  }

  , app: function app(){
    this.config.save()
    this.template('_package.json', 'package.json')
    this.copy('editorconfig', '.editorconfig')
    this.copy('gitignore', '.gitignore')
    this.copy('eslintrc', '.eslintrc')
    this.copy('npmignore', '.npmignore')
    this.copy('npmrc', '.npmrc')
    this.copy('scripts.sh', 'scripts.sh')
    this.copy('travis.yml', '.travis.yml')

    this.template('README.md', 'README.md')
    this.template('CONTRIBUTING.md', 'CONTRIBUTING.md')
    this.template('CHANGELOG.md', 'CHANGELOG.md')
    this.copy('LICENSE', 'LICENSE')
  }

  , projectfiles: function projectfiles(){
    this.template('index.js', 'index.js')
    this.mkdir('test')
    this.template('test/test.js', 'test/test.js')
  }

  , install: function install(){
    this.installDependencies({
      bower: false
      , skipInstall: this.options['skip-install']
    })
  }
})
