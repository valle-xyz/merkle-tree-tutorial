import { one_leaf_tree, two_leafs_tree } from "../src/2_sub_trees";

test("2: subtrees", () => {
  console.log("This is the one leaf tree:\n", one_leaf_tree.render());
  console.log("This is the two leafs tree:\n", two_leafs_tree.render());

  expect(one_leaf_tree.root).toBe(
    "0xca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201"
  );
  expect(two_leafs_tree.root).toBe(
    "0xa1b2630267038e5532c85a3d54c96ad53f1d7ef353cde3912f5d30f5627311bb"
  );
});
