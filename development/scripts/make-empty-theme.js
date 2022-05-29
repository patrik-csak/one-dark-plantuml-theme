#!/usr/bin/env node

import fs from 'node:fs/promises';
import * as cheerio from 'cheerio';

const svg = await fs.readFile(new URL('../skinparams.svg', import.meta.url), {
	encoding: 'utf8',
});

const $ = cheerio.load(svg);

const skinparams = $('text')
	.toArray()
	.map(element => cheerio.load(element).text());

const emptyThemeContents = `@startuml empty theme

skinparam {
  ${skinparams.map(name => `' ${name}`).join('\n  ')}
}

@enduml
`;

await fs.writeFile(
	new URL('../puml-theme-empty.puml', import.meta.url),
	emptyThemeContents,
);
