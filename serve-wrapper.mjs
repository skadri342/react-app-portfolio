// serve-wrapper.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const [dir = '.', port = 3000] = args;

async function startServer() {
  try {
    const { default: handler } = await import('serve-handler');
    const http = require('http');

    const server = http.createServer((request, response) => {
      return handler(request, response, {
        public: join(__dirname, dir)
      });
    });

    server.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();