import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// The values are our three email addresses:
const values = [["alice@email.com"], ["bob@email.com"], ["carol@email.com"]];

// The email addresses are of the type string:
const types = ["string"];

// For this tutorial, we have to disable the automatic sorting of the leaves:
const options = { sortLeaves: false };

// With these parameters, we can create the tree:
export const tree = StandardMerkleTree.of(values, types, options);
