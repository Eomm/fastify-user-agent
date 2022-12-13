'use strict'

const fp = require('fastify-plugin')
const Useragent = require('useragent')

// https://www.npmjs.com/package/useragent#adding-more-features-to-the-useragent
// require('useragent/features')

function fastifyUserAgent (fastify, options, next) {
  const opts = Object.assign({
    name: 'userAgent',
    hook: 'onRequest'
  }, options)

  fastify.decorateRequest(opts.name, null)

  fastify.addHook(opts.hook, (request, reply, done) => {
    request[opts.name] = Useragent.lookup(request.headers['user-agent'])
    done()
  })

  next()
}

const plugin = fp(fastifyUserAgent, {
  fastify: '^4.x',
  name: 'fastify-user-agent'
})

module.exports = plugin
module.exports.default = plugin
module.exports.fastifyUserAgent = fastifyUserAgent
