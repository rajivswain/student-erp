
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';

const logDirectory = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: logDirectory,
  compress: 'gzip',
  maxFiles: 10,
});

const logger = process.env.NODE_ENV === 'production'
  ? morgan('combined', { stream: accessLogStream })
  : morgan('dev');

export default logger;
