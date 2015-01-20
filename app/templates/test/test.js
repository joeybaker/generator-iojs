'use strict';
var test = require('prova')
  , <%= safeSlugname %> = require('../')

test('<%= slugname %>#get', function getTest(t){
  <%= safeSlugname %>()
  t.equal(
    false
    , 'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
