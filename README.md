# fastify-user-agent
User-agent information plugin for Fastify.

[![ci](https://github.com/Eomm/fastify-user-agent/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Eomm/fastify-user-agent/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/fastify-user-agent)](https://www.npmjs.com/package/fastify-user-agent)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```
npm install fastify-user-agent
```

### Compatibility

| Plugin version | Fastify version |
| -------------- |:---------------:|
| `^2.0.0`       | `^5.0.0`        |
| `^1.0.0`       | `^4.0.0`        |


## Usage

The plugin adds a `userAgent` property to the `request` object by parsing the `user-agent` header.  
The object is an [`agent` instance](https://www.npmjs.com/package/useragent#agents-operatingsystem-and-device-instances) and it has the following properties:

- `family` The browser family, or browser name, it defaults to Other.
- `major` The major version number of the family, it defaults to 0.
- `minor` The minor version number of the family, it defaults to 0.
- `patch` The patch version number of the family, it defaults to 0.
- `os` [OperatingSystem instance](https://www.npmjs.com/package/useragent#operatingsystemtostring)
- `device` [Device instance](https://www.npmjs.com/package/useragent#devicetostring)

```js
const fastify = require('fastify')

const app = fastify()
app.register(require('fastify-user-agent'))

app.get('/', async (request, reply) => {
  return request.userAgent
})

app.listen({ port: 3000 })
```


### Options

You can pass the following options during the registration:

| Option | Default | Description |
|--------|---------|-------------|
|`name`  | `userAgent` | Change the `request` property name where the plugin will store the parsed user-agent information. |


## License

Licensed under [MIT](./LICENSE).
