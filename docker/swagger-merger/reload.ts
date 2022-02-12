const chokidar = require('chokidar')
const swaggerMerger = require('swagger-merger')

const rootFile = 'index.yaml'
const mergedFile = 'openapi.yaml'

chokidar
  .watch('.', { ignored: mergedFile })
  .on('all', (event: string, path: string) => {
    // eslint-disable-next-line no-console
    console.log(event, path)

    swaggerMerger({ input: rootFile, output: mergedFile }).catch(
      (err: object) => {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    )
  })
