'use strict'

var test = require('tape')
  , app = require('../app')

test('iojs generator', function generatorTest(t){
  t.ok(
    app !== undefined
    , 'can be imported without blowing up'
  )
  t.end()
})
