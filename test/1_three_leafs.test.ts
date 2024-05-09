import { tree } from "../src/1_three_leafs";

describe("1: three leafs", () => {
  test("1_1: Inspecting the tree", () => {
    console.log("This is the whole tree:\n", tree.render());
    console.log("This is the tree's root:\n", tree.root);

    expect(tree.root).toBe(
      "0x4aced1c6cd24cc0494d3408b4b01d4ac86af6c293ae6cfb5e6a42f09517ac1c6"
    );
  });
});
