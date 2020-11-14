/**
 * RECONSTRUCT BIN TREE
 * @see: bin-tree-traversal.ts gives an explanation of pre, in, and post-order traversal of a binary tree.
 *
 * CHALLENGE Given the sequence of keys visited by a postorder traversal of a binary
 * search tree, reconstruct the tree. For example, given the sequence
 * 2, 4, 3, 8, 7, 5, you should construct the following tree:
 *
 *     5
 *    / \
 *   3   7
 *  / \   \
 * 2   4   8
 */

interface BinNode { val: number, left?: BinNode, right?: BinNode }

const prettyNode = (n: BinNode): string => {
    const rightEdge = n.right !== undefined ? '  \\' : '';
    const leftEdge = n.left !== undefined ? ' / ' : '   ';
    const edgeLine = `${leftEdge}${rightEdge}`;
    const leftStr = n.left !== undefined ? `${n.left.val}` : '   ';
    const rightStr = n.right !== undefined ? `${n.right.val}` : '';
    return `\n    ${n.val}\n ${edgeLine}\n${leftStr}      ${rightStr}`
}

const prettyHeader = (postSeq: number[], inSeq: number[]): string => {
    return `\n${'-'.repeat(55)} \nRECONONSTRUCT BINARY TREE\nPost Seq: ${postSeq.join(',')}\nIn Seq  : ${inSeq.join(',')}`;
}

/**
 * Reconstructs a binary tree recursively given postOrder and inOrder nodes.
 * @param postSeq Post-order sequence
 * @param inSeq In-order sequence
 * @returns The head node of the tree.
 */
const reconstruct = (postSeq: number[], inSeq: number[]) => {

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
     * 
     * @param inSeq In-order sequence
     * @param postIdx Post-order index
     * @param depth Recursion depth
     */
    const reconHelper = (inSeq: number[], postIdx: number, depth: number = 1): BinNode => {
        console.log(`[Depth ${depth}] inSeq...............`, inSeq);
        const val = postSeq[postIdx];
        const inIdx = inSeq.indexOf(val);
        const inLeft = inIdx > -1 ? inSeq.slice(0, inIdx) : [];
        const inRight = inIdx > -1 && inIdx < inSeq.length ? inSeq.slice(inIdx + 1) : [];
        console.log(`[Depth ${depth}] inLeft, val, inRight`, inLeft, val, inRight);

        // Base case
        const node = (inLeft.length === 0 && inRight.length === 0)
            ? {
                val,
                left: undefined,
                right: undefined
            }
            : {
                val,
                left: reconHelper(inLeft, postIdx - 1, depth + 1),
                right: reconHelper(inRight, postIdx - 1, depth + 1)
            }

        console.log(`[Depth ${depth}] returning node`, prettyNode(node));
        return node;

    }
    
    console.log(prettyHeader(postSeq, inSeq));
    reconHelper(inSeq, postSeq.length - 1);
}

/**
 * Test
 */
console.log('Test prettyNode 2 children', prettyNode({ val: 5, left: { val: 1 }, right: { val: 9 } }));
console.log('Test prettyNode right only', prettyNode({ val: 5, right: { val: 9 } }));
console.log('Test prettyNode left only', prettyNode({ val: 5, left: { val: 8} }));
reconstruct([3, 7, 5], [3, 5, 7]);
