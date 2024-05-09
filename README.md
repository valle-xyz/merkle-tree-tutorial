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

// For this turorial, we have to disable the automatic sorting of the leaves:
const options = { sortLeaves: false };

// Now we can create the tree:
export const tree = StandardMerkleTree.of(values, types, options);
```

Perfect. To inspect our tree, we use jest as a testing library. Write this into `test/1_three_leafs.test.ts`:

```ts
import { tree } from "../src/1_three_leafs";

test("1: three leafs", () => {
  console.log("This is the whole tree:\n", tree.render());
  console.log("This is the tree's root:\n", tree.root);

  expect(tree.root).toBe(
    "0xa7901c479a3c48fa9e81e243dbcb61fe824afa909bfe1364a9e795526c121c21"
  );
});
```

You can run this test with `npx jest -t "1: three leafs"`.

You will see this output:

```
 PASS  test/1_three_leafs.test.ts
  ● Console

    console.log
      This is the whole tree:
       0) a7901c479a3c48fa9e81e243dbcb61fe824afa909bfe1364a9e795526c121c21
      ├─ 1) a1b2630267038e5532c85a3d54c96ad53f1d7ef353cde3912f5d30f5627311bb
      │  ├─ 3) e1fa5b6773accf9566324b9fbd5e5eac6c4c2a624cb2cd1e47691ce04619070c
      │  └─ 4) ca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201
      └─ 2) 3f43cd0ce9c9d6491f71bb4a13e347f191e98c76cc943f33502ecc68b4488de0

      at Object.log (test/1_three_leafs.test.ts:5:13)

    console.log
      This is the tree's root:
       0xa7901c479a3c48fa9e81e243dbcb61fe824afa909bfe1364a9e795526c121c21

      at Object.log (test/1_three_leafs.test.ts:6:13)
```

Here is another image of our newly created merkle tree.

1. The tree starts with the values.
2. The leafs are the hashes of the value.
3. There is only one branch, which hashes the first two leafs.
4. Finally, the root is a hash of the branch and the third leaf.

![Image of a merkle tree with three leafs](./images/three_leaf_merkle_tree.png)

Well done.

In a next step, you will learn, how merkle trees are composed, by creating two very small merkle trees.

## The two subtrees

Let's now have a quick look at the two subtrees of our first merkle tree. You will see, that merkle trees are simple combinations of hashes.

Start by pasting this code into the file `src/2_sub_trees.ts`:

```ts
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
```

You created two merkle trees.

Let's inspect them in a test file `test/2_sub_trees.test.ts`:

```ts
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
```

Run this test with `npx jest -t "2: subtrees"`. Your console will output this:

```
 PASS  test/2_sub_trees.test.ts
  ● Console

    console.log
      This is the one leaf tree:
       0) ca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201

      at Object.log (test/2_sub_trees.test.ts:4:11)

    console.log
      This is the two leafs tree:
       0) a1b2630267038e5532c85a3d54c96ad53f1d7ef353cde3912f5d30f5627311bb
      ├─ 1) e1fa5b6773accf9566324b9fbd5e5eac6c4c2a624cb2cd1e47691ce04619070c
      └─ 2) ca2eaa280e118a6ce002d549e4042829140131fcf9a3f58feec61afe359c2201

      at Object.log (test/2_sub_trees.test.ts:5:11)
```

As you see, the leafs and hashes of the two subtrees are the same hashes we already know from our first tree with three leafs. This shows, how a merkle tree is combining the hashes of its leafs and branches until only one root node is left. Each branch of a tree is the root of a subtree:

![The subtrees of our merkle tree](./images/subtrees.png)

> The subtrees in our example require the option _sortLeaves_ to be false. Otherwise, the library will [order the leafes](https://github.com/OpenZeppelin/merkle-tree?tab=readme-ov-file#leaf-ordering) in order to make the merkle tree more efficient on the blockchain.

Perfect, now you should have a decent understanding of how merkle trees are created. In the next chapter you will learn how to use merkle trees to verify data.
