const fs = require('fs')
const core = require('@actions/core')
const {httpClient, BasicCredentialHandler} = require('@actions/http-client')

// read action inputs
const input = {
  dopplerToken: core.getInput('token', {required: true}),
  dopplerProject: core.getInput('project', {required: true}),
  dopplerConfig: core.getInput('config'),
  secretName: core.getInput('secret-name', {required: true}),
  saveToFile: core.getInput('save-to-file'),
}

// force the doppler token masking
if (input.dopplerToken.length > 0) {
  core.setSecret(input.dopplerToken)
} else {
  core.warning('Doppler token was not provided')
}

// main action entrypoint
async function run() {
  // create http client instance (docs: <https://github.com/actions/http-client>)
  const http = new httpClient.HttpClient(undefined, [new BasicCredentialHandler(input.dopplerToken, '')], {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  // make an http request to the doppler API
  const res = await http.get(
    'https://api.doppler.com/v3/configs/config/secret?' + (new URLSearchParams({
      project: input.dopplerProject,
      config: input.dopplerConfig,
      name: input.secretName,
    }).toString())
  )

  // read and parse response content
  const bodyRaw = await res.readBody(), bodyObj = JSON.parse(bodyRaw)

  // check the response code
  if (res.message.statusCode !== 200) {
    let messages = []

    if (Object.prototype.hasOwnProperty.call(bodyObj, 'messages')) {
      messages = bodyObj.messages
    }

    throw new Error('Wrong API endpoint response code: ' + res.message.statusCode + ' (' + messages.join(';') + ')')
  }

  // extract required response parts
  // common response: `{"name":"secret_name","value":{"raw":"secret_here","computed":"secret_here"},"success":true}`
  // docs: <https://docs.doppler.com/reference/enclave-config-secret-retrieve>
  const raw = bodyObj.value.raw,
    computed = bodyObj.value.computed

  // check the secret value
  if (computed === null) {
    throw new Error(`Secret "${input.secretName}" was not found on the API side`)
  }

  // mask the sensitive data
  core.setSecret(raw)
  core.setSecret(computed)

  // set the secret output
  core.setOutput('secret', computed)

  // writing the secret to a file
  if (input.saveToFile !== '') {
    fs.open(input.saveToFile, 'w', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          throw new Error(`file "${input.saveToFile}" already exists`)
        }

        throw err
      }

      try {
        fs.write(fd, Buffer.from(computed), 0, computed.length, null, (err) => {
          if (err) throw err
        })
      } finally {
        fs.close(fd, (err) => {
          if (err) throw err
        });
      }
    })
  }
}

// run the action
(async () => {
  await run()
})().catch(error => {
  core.setFailed(error.message)
})
