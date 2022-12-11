'use strict'

const { test } = require('tap')
const fastify = require('fastify')

const plugin = require('../index')

const us1 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'

const us1Parsed = Object.freeze({
  onRequest: {
    family: 'Chrome',
    major: '76',
    minor: '0',
    patch: '3809',
    device: {
      family: 'Other',
      major: '0',
      minor: '0',
      patch: '0'
    },
    os: {
      family: 'Mac OS X',
      major: '10',
      minor: '14',
      patch: '6'
    }
  },
  preHandler: {
    family: 'Chrome',
    major: '76',
    minor: '0',
    patch: '3809',
    device: {
      family: 'Other',
      major: '0',
      minor: '0',
      patch: '0'
    },
    os: {
      family: 'Mac OS X',
      major: '10',
      minor: '14',
      patch: '6'
    }
  }
})

async function buildApp (t, opts) {
  const app = fastify()
  app.register(plugin, opts)
  t.teardown(() => app.close())

  app.addHook('onRequest', function hook (request, reply, done) {
    if (request.headers.skip !== 'true') {
      request.data = { onRequest: request.userAgent }
    }

    done()
  })

  app.addHook('preHandler', function hook (request, reply, done) {
    if (request.headers.skip !== 'true') {
      request.data.preHandler = request.userAgent
    }

    done()
  })

  app.get('/', (req, reply) => { reply.send(req.data) })

  return app
}

test('Basic usage', async t => {
  t.plan(1)

  const app = await buildApp(t)

  const res = await app.inject({
    url: '/',
    headers: { 'user-agent': us1 }
  })

  t.strictSame(res.json(), us1Parsed)
})

test('Check decorator', async t => {
  t.plan(2)

  const app = await buildApp(t)

  {
    const res = await app.inject({
      url: '/',
      headers: { 'user-agent': us1 }
    })
    t.strictSame(res.json(), us1Parsed)
  }

  {
    const res = await app.inject({
      url: '/',
      headers: { 'user-agent': us1, skip: 'true' }
    })
    t.strictSame(res.payload, '')
  }
})

test('Change decorator name', async t => {
  t.plan(2)

  const app = await buildApp(t, { name: 'foo' })
  app.get('/foo', (req, reply) => {
    t.ok(req.foo, 'custom foo is defined')
    reply.send(req.foo)
  })

  const res = await app.inject({
    url: '/foo',
    headers: { 'user-agent': us1, skip: 'true' }
  })
  t.strictSame(res.json(), us1Parsed.onRequest)
})
