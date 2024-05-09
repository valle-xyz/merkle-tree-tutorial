import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// For this file to be concise, we omit declaring variables and pass values and types directly to the `of` method.

// This tree will only have one leaf:
export const one_leaf_tree = StandardMerkleTree.of(
  [["alice@email.com"]],
  ["string"]
);

// And this tree will have two leafs:
export const two_leafs_tree = StandardMerkleTree.of(
  [["alice@email.com"], ["bob@email.com"]],
  ["string"],
  { sortLeaves: false }
);
