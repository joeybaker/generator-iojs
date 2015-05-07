import test from 'tape'
import <%= repoName %> from '../index.js'

test('<%= repoName %>#get', (t) => {
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
