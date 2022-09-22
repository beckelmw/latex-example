import { readFile } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import frontmatter from "./get-frontmatter.js";
import remarkStringify from "remark-stringify";
import getSection from "./lib/get-section.js";
import removeAnswers from "./lib/remove-answers.js";

async function convert(content) {
  const { value: markdown, data } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(frontmatter)
    .use(getSection, {section: 'Homework'})
    .use(removeAnswers)
    .use(remarkStringify)
    .process(content);

  return { markdown, meta: data.meta };
}

async function process(file) {
  const content = await readFile(file);
  let { markdown, meta } = await convert(content);

  for (const replacement of replacements) {
    markdown = replacement(markdown);
  }

  return { markdown, meta };
}

export default async (files) => {
  return await Promise.all(files.map(process));
};

const replacements = [(txt) => txt.replace(/\n\d+.\s/g, "\n@. ")];
