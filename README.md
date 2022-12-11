# fastify-user-agent
User-agent information plugin for Fastify.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://github.com/Eomm/fastify-user-agent/workflows/ci/badge.svg)](https://github.com/Eomm/fastify-user-agent/actions)


## Install

```
npm install fastify-user-agent
```

### Compatibility

| Plugin version | Fastify version |
| -------------- |:---------------:|
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
