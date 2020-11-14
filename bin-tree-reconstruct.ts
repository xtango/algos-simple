/**
 * RECONSTRUCT BIN TREE
 * @see: bin-tree-traversal.ts gives an explanation of pre, in, and post-order traversal of a binary tree.
 *
 * CHALLENGE
 * Given the sequence of keys visited by a postorder traversal of a binary
 * search tree, reconstruct the tree. For example, given the sequence
 * 2, 4, 3, 8, 7, 5, you should construct the following tree:
 *
 *     5
 *    / \
 *   3   7
 *  / \   \
 * 2   4   8
 */

interface BinNode { val: number, left: BinNode | undefined, right: BinNode | undefined }

/**
 * Reconstructs a binary tree recursively given postOrder and inOrder nodes.
 * @returns The head node of the tree.
 */
const reconstruct = (postOrder: number[], inOrder: number[]) => {

    /**
     * Helper function for recursion. Intuition: Post Order's right-most is the root.
     * Going from right to left we traverse first the right and then the left subtrees.
     * Example: Given postOrder: 3, 7, 5 and inOrder: 3, 5, 7, we construct 3 nodes:
     *   5
     *  / \    
     * 3   7
     * global: poIdx = postOrder.len // post-order-index. Start from rightmost.
     *                                             // inOrder  : 3, 5, 7
     * postOder                                    // [3, 7, 5]
     *                                              
     * recon(                                    Iter 1            Iter 2 (L recur)       Iter 3 (R recur)
     * inOrder,                                  // [3, 5, 7]      // [3]                 // [7]
     * poIdx):                                   // 2              // 1                   // 1
     * 
     * node    = { val: postOrder[poIdx] }       // 5              // 7                   // 7
     * ioIdx   = inOrder.indexOf(node)           // 1              // -1                  // 0
     * ioLeft  = inOrder[0 to inOrderIdx - 1]    // [3]            // []                  // []
     * ioRight = inOrder[ioIdx + 1, inOrder.len] // [7]            // []                  // []
     * 
     * // Base case
     * return node if ioLeft && ioRight empty    //                                       // return { val: 7, left: right {}
     *
     * node.left  = recon(inOrderLeft),          // recon([3], 1) 
     * node.right = recon(inOrderRight),         // recon([7], 1)
     * return node
     */
    const reconHelper = (inOrderList: number[], postOrderIdx: number): BinNode => {
        console.log('inOrderList..............', inOrderList);
        const val = postOrder[postOrderIdx];
        const inOrderIdx = inOrderList.indexOf(val);
        const inOrderLeft = inOrderIdx > -1 ? inOrderList.slice(0, inOrderIdx) : [];
        const inOrderRight = inOrderIdx > -1 && inOrderIdx < inOrderList.length ? inOrderList.slice(inOrderIdx + 1) : [];
        console.log('....ioLeft, val, ioRight', inOrderLeft, val, inOrderRight);

        // Base case
        const node = (inOrderLeft.length === 0 && inOrderRight.length === 0)
            ? {
                val,
                left: undefined,
                right: undefined
            }
            : {
                val,
                left: reconHelper(inOrderLeft, postOrderIdx - 1),
                right: reconHelper(inOrderRight, postOrderIdx - 1)
            }

        console.log('....returning node', node);
        return node;

    }
    console.log('---Reconstructing ---', postOrder);
    reconHelper(inOrder, postOrder.length - 1);
}

/**
 * Test
 */
reconstruct([3, 7, 5], [3, 5, 7]);
