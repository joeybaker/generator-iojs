'use strict';
var test = require('tape')
  , <%= safeSlugname %> = require('../')

test('<%= slugname %>#get', function getTest(t){
  t.plan(1)
  <%= safeSlugname %>.get()

  t.equal(
    true
    , 'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
