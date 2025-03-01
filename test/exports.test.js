'use strict'

const { test } = require('node:test')
const plugin = require('../index')

test('export default', t => {
  t.plan(5)
  t.assert.strictEqual(typeof plugin, 'function')
  t.assert.strictEqual(typeof plugin.default, 'function')
  t.assert.strictEqual(typeof plugin.fastifyUserAgent, 'function')
  t.assert.strictEqual(plugin.default, plugin)
  t.assert.strictEqual(plugin.fastifyUserAgent, plugin)
})
