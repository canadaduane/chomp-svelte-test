const fs = require("fs");
const path = require("path");
const svelte = require("svelte/compiler");

// console.log("ENV:", process.env);

const source = fs.readFileSync(process.env.dep, "utf-8");

const result = svelte.compile(source, {
  // options
});

const jsFile = process.env.target.replace(/\.js$/, ".js");
fs.writeFileSync(jsFile, result.js.code);
fs.writeFileSync(jsFile + ".map", JSON.stringify(result.js.map, null, 2));

const cssFile = process.env.target.replace(/\.js$/, ".css");
fs.writeFileSync(cssFile, result.css.code);
fs.writeFileSync(cssFile + ".map", JSON.stringify(result.css.map, null, 2));
