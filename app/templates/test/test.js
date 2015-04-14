'use strict'

var test = require('tape')
  , <%= slugname %> = require('../')

test('<%= slugname %>#get', function getTest(t){
  t.plan(2)

  t.doesNotThrow(
    <%= slugname %>.get
    , 'does not throw'
  )

  t.ok(
    'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
