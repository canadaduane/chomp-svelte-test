import { Generator } from '@jspm/generator';
import { readFile, writeFile } from 'fs/promises';
import { pathToFileURL } from 'url';

const inHtmlFile = process.env.dep;
const outHtmlFile = process.env.target;

if (!inHtmlFile || !outHtmlFile)
  throw new Error('HTML input and output args must be provided');

const generator = new Generator({
  mapUrl: pathToFileURL(outHtmlFile),
  env: ['browser', 'production', 'module']
});

await generator.traceInstall('./main.js');

const map = generator.getMap();

let htmlSource = (await readFile(inHtmlFile)).toString();

htmlSource = htmlSource.replace('<script type="importmap"></script>', `<script type="importmap">${JSON.stringify(map, null, 2)}</script>`);

await writeFile(outHtmlFile, htmlSource);