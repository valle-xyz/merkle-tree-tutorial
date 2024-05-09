import { tree } from "../src/1_first_merkle_tree";

test("1: First Merkle tree", () => {
  console.log("This is the whole tree:\n", tree.render());
  console.log("This is the tree's root:\n", tree.root);

  expect(tree.root).toBe(
    "0xa7901c479a3c48fa9e81e243dbcb61fe824afa909bfe1364a9e795526c121c21"
  );
});
