const fs = require('fs')
const core = require('@actions/core')

// main cleanup action entrypoint
async function run() {
  const secretFile = core.getState('secret_file')

  if (secretFile !== "") {
    await fs.access(secretFile, fs.constants.F_OK, (err) => {
      if (err) throw err

      fs.unlink(secretFile, (err) => {
        if (err) throw err

        core.info(`File "${secretFile}" with a secret was deleted`)
      })
    })
  } else {
    core.info('Nothing to clean up')
  }
}

// run the action
(async () => {
  await run()
})().catch(error => {
  core.setFailed(error.message)
})
