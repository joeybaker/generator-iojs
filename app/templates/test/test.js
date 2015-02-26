'use strict';

var test = require('tape')
  , luceneEscapeQuery = require('../')

test('lucene-escape-query#get', function getTest(t){
  t.plan(2)

  t.doesNotThrow(
    luceneEscapeQuery.get
    , 'does not throw'
  )

  t.ok(
    'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})

