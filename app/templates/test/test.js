'use strict'

var test = require('tape')
  , <%= repoName %> = require('../')

test('<%= repoName %>#get', function getTest(t){
  t.plan(2)

  t.doesNotThrow(
    <%= repoName %>.get
    , 'does not throw'
  )

  t.ok(
    'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
