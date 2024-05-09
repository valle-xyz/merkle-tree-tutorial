import { one_leaf_tree, two_leaves_tree } from "../src/2_subtrees";

test("2: Subtrees", () => {
  console.log("This is the tree with one leaf:\n", one_leaf_tree.render());
  console.log("This is the tree with two leaves:\n", two_leaves_tree.render());

  expect(one_leaf_tree.root).toBe(
    "0xca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201"
  );
  expect(two_leaves_tree.root).toBe(
    "0xa1b2630267038e5532c85a3d54c96ad53f1d7ef353cde3912f5d30f5627311bb"
  );
});
