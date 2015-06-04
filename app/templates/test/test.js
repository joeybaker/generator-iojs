import test from 'tape'
import <%= safeSlugname %> from '../index<%= props.extension %>'

test('<%= repoName %>#get', (t) => {
  t.plan(2)

  t.doesNotThrow(
    <%= safeSlugname %>.get
    , 'does not throw'
  )

  t.ok(
    'I was too lazy to write any tests. Shame on me.'
    , 'must have at least one test'
  )
})
