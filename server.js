const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const { randomInteger, spacesToDashes, countWords } = require('./');

const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');
const staticFiles = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
};

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(data));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Request body must be valid JSON'));
      }
    });
    request.on('error', reject);
  });
}

const apiHandlers = {
  '/api/random-integer': ({ min, max }) => ({ value: randomInteger(min, max) }),
  '/api/spaces-to-dashes': ({ value }) => ({ value: spacesToDashes(value) }),
  '/api/count-words': ({ value }) => ({ value: countWords(value) }),
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (request.method === 'GET' && staticFiles[pathname]) {
    const [fileName, contentType] = staticFiles[pathname];
    try {
      const content = await readFile(path.join(publicDirectory, fileName));
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content);
    } catch {
      response.writeHead(500);
      response.end('Unable to load page');
    }
    return;
  }

  if (request.method === 'POST' && apiHandlers[pathname]) {
    try {
      const input = await readJson(request);
      sendJson(response, 200, apiHandlers[pathname](input));
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return;
  }

  sendJson(response, 404, { error: 'Not found' });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Utility Desk is running at http://127.0.0.1:${port}`);
});