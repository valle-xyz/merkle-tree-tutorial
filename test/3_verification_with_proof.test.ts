import { tree } from "../src/1_first_merkle_tree";

test("3: Verification with proof", () => {
  // We can get a proof for a leaf/value like this:
  const proof = tree.getProof(["alice@email.com"]);

  console.log("This is the proof for Alice's email:\n", proof);

  // Now we can verify the proof:
  expect(tree.verify(["alice@email.com"], proof)).toBe(true);
});
