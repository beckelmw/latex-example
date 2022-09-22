import getFiles from "./src/get-files.js";
import getMarkdown from "./src/get-markdown.js";
import { log } from "node:console";

const files = await getFiles("./classes/**/*.md");

const json = await getMarkdown(files);

log(JSON.stringify(json, null, 2));
