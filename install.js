#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");

const homelinks = fs.readdirSync(path.resolve(__dirname, "homelinks"));

const doLink = (src, dest) => {
  console.log(`ensuring ${src} ==> ${dest}`);
  // wrong destination check
  if (fs.pathExistsSync(dest) && fs.lstatSync(dest) && !fs.pathExistsSync(dest)) {
    fs.unlinkSync(dest);
  }
  fs.ensureSymlinkSync(src, dest);
}

for (const file of homelinks) {
  const src = path.resolve(__dirname, "homelinks", file);
  const dest = path.resolve(process.env.HOME, file);
  // we copy directory links one layer deep for config
  if (fs.lstatSync(src).isDirectory()) {
    const subdirContents = fs.readdirSync(src);
    for (subFile of subdirContents) {
      const subSrc = path.resolve(src, subFile);
      const subDest = path.resolve(dest, subFile);
      doLink(subSrc, subDest);
    }
  }
  else {
    doLink(src, dest);
  }
}
