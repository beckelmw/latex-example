import { visit } from "unist-util-visit";

export default ({ answerRegex = /\\boxed\{.*\}/, replacement = "" } = {}) => {
  return (ast, file) => {
    // Remove the answers
    visit(
      ast,
      (x) => x.type === "text" && answerRegex.test(x.value),
      (node, idx, parent) => {
        const newNode = {
          ...node,
          value: node.value.replace(answerRegex, replacement),
        };
        parent.children[idx] = newNode;
      }
    );
  };
};
