#!/usr/bin/env node

(async () => {

  const run = {}
  const yargs = require('yargs')

  run.argv = yargs
    .commandDir('cmd')
    .strict()
    .version(false)
    .help()
    .wrap(null)
    .argv

})();
