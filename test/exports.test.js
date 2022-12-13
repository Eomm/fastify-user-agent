'use strict'

const { test } = require('tap')
const plugin = require('../index')

test('export default', t => {
  t.plan(5)
  t.type(plugin, 'function')
  t.type(plugin.default, 'function')
  t.type(plugin.fastifyUserAgent, 'function')
  t.equal(plugin.default, plugin)
  t.equal(plugin.fastifyUserAgent, plugin)
})
