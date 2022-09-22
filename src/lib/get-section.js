import { visit } from "unist-util-visit";
import { findAfter } from "unist-util-find-after";

export default ({ section, depth = 2 }) => {
  return (ast, file) => {
    visit(
      ast,
      (x) =>
        x.type === "heading" &&
        x.depth == depth &&
        x.children.some((x) => x.type === "text" && x.value === section),

      (start, idx, parent) => {
        const isEnd = (node) => node.type === "heading" && node.depth == depth;
        const end = findAfter(ast, start, isEnd);
        const endIndex = parent.children.indexOf(end);

        const children = parent.children.slice(
          idx,
          endIndex > 0 ? endIndex : undefined
        );

        // Only return odd problems if list contains more than 1 item
        // for (const child of children) {
        //   if (child.type === "list" && child.children.length > 1) {
        //     child.children = child.children.filter((x, idx) => idx % 2 == 1);
        //   }
        // }

        // Hacky first element right now is yaml but would be better to pull it out directly
        ast.children = [parent.children[0], ...children];
      }
    );
  };
};
