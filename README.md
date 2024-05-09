# A practical introduction into merkle trees

Congratulations to your decision to learn about merkle trees. They are a foundamental building block of blockchains, very useful for many different types of decentralized applications, and they are very easy to use.

In this tutorial, you will use the [merkle tree library of Open Zeppelin](https://github.com/OpenZeppelin/merkle-tree). You will build a simple merkle tree and test it with jest.

At the end of this tutorial:

- You will know how to create a merkle tree.
- You will know how to use proofs to verify leafs.
- You will understand the concept of merkle trees, how they are built, and why they are important.
- You will have had some fun learning a new technology.

## 1. Intro: Why are merkle trees useful?

### Problem: Blockspace is expensive

As a developer new to blockchain technology, you will encounter many new concepts. While the syntax of Solidity looks similar to JS, some programming paradigms are fundamentally different on the blockchain, than on the centralized internet.

One main example is access control and verification. Let's say you'd wanted to grant access to a selected group of users, verified by their email. Coming from a centralized backend, you would store every verified email address in a database. When a user proofs she owns an email address, you would look up the email address in a database, check if it's verified, and than proceed accordingly.

That does not work on the blockchain.

Why?

- Because storage is very expensive on the blockchain. For every email address that you'd wanted to store on the blockchain, you would have to pay the gas fee for altering the state of the chain.

- Also, depending on the amount of addresses, you may have to use mutliple transactions, so you would have to write a routine to make sure all transactions settle.

- And last but not least, every data on the chain is transparently visible. Different to a centralized backend, you cannot make sure that the data is private. Your users don't want to read their email address on the blockchain.

Enter merkle trees. 🦾

### Solution: Merkle trees verify data efficiently

Merkle trees allow you to verify a (theoretically) infinite amount of data by storing only one hash on the blockchain.

The general idea of merkle trees is to hash a value, and combine pairs of hashes toghether into one hash. The resulting hash is combined with another hash and hashed again. This procedure get's repeated as long as there is only one hash remaining, which is called the "root" of the merkle tree. A merkle tree thus consists of the leafs (the hashed of the data to verify, i.e. email addresses), the branches (the combined hashes of leafs and other branches), and the root (the final hash) of the merkle tree.

In the next chapter, you will get an understanding of merkle trees by building them.

## Build a merkle tree

### Setup

Please clone this git repository and rum `npm install`. Make sure to use a node version >=20.0.0.

### Starting with the whole picture: A tree with tree leafs

We will start by creating a merkle tree with three leafs. This will feel fast at the beginning. Please code along, as we will add more theory later, and you will understand everything fully at the end of this tutorial.

First, we will create the tree, by writing this into the file `src/01_three_leafs.ts`:

```ts
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// We provide values as an array of arrays:
const values = [["alice@email.com"], ["bob@email.com"], ["carol@email.com"]];

// We have to provide the type of the values:
const types = ["string"];

// Now we can create the tree:
export const tree = StandardMerkleTree.of(values, types);
```

Perfect. To inspect our tree, we use jest as a testing library. Write this into `test/1_three_leafs.test.ts`:

```ts
import { tree } from "../src/1_three_leafs";

describe("1: three leafs", () => {
  test("1_1: Inspecting the tree", () => {
    console.log("We can inspect the tree:\n", tree.render());
    console.log("And get the root of the tree:", tree.root);

    expect(tree.root).toBe(
      "0x4aced1c6cd24cc0494d3408b4b01d4ac86af6c293ae6cfb5e6a42f09517ac1c6"
    );
  });
});
```

You can run this test with `npx jest -t "1_1: Inspecting the tree"`.

You will see this output:

```
 PASS  test/1_three_leafs.test.ts
  ● Console

    console.log
      This is the whole tree:
       0) 4aced1c6cd24cc0494d3408b4b01d4ac86af6c293ae6cfb5e6a42f09517ac1c6
      ├─ 1) 0b580d4cfb79ca51389e26e12f08c0a85d8fbfe53a696a5b025c0691cbcbf210
      │  ├─ 3) ca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201
      │  └─ 4) 3f43cd0ce9c9d6491f71bb4a13e347f191e98c76cc943f33502ecc68b4488de0
      └─ 2) e1fa5b6773accf9566324b9fbd5e5eac6c4c2a624cb2cd1e47691ce04619070c

      at Object.log (test/1_three_leafs.test.ts:5:13)

    console.log
      This is the tree's root:
       0x4aced1c6cd24cc0494d3408b4b01d4ac86af6c293ae6cfb5e6a42f09517ac1c6
```

Here is another image of our newly created merkle tree.

1. The tree starts with the values.
2. The leafs are the hashes of the value.
3. There is only one branch, which hashes the first two leafs.
4. Finally, the root is a hash of the branch and the third leaf.

![Image of a merkle tree with three leafs](./images/three_leaf_merkle_tree.png)

Well done.

In a next step, you will learn, how merkle trees are composed, by creating two very small merkle trees.
