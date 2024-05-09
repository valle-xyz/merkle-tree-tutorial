import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// We provide values as an array of arrays:
const values = [["alice@email.com"], ["bob@email.com"], ["carol@email.com"]];

// We have to provide the type of the values:
const types = ["string"];

// Now we can create the tree:
export const tree = StandardMerkleTree.of(values, types);