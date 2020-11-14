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

/**
 * recon(postOrder, inOrder)
 * Reconstructs a binary tree given postOrder and inOrder nodes.
 * 
 * Intuition: we know that the right-most is the root and going from 
 * right to left will 1st taverse the right subtree.
 * 
 * Given  postOrder: 3, 7 , 5 (and inOrder: 3, 5, 7) we construct 3 nodes:
 *     5 
 *    / \    
 *   3   7
 * 
 * global: poIdx = postOrder.len // post-order-index. Start from rightmost.
 * 
 *                                             // 
 *                                             // inOrder  : 3, 5, 7
 * postOder                                    // [3, 7, 5]
 *                                              
 * recon(                                      Iter 1            Iter 2 (left recur)    Iter 3 (right recur)
 *   inOrder,                                  // [3, 5, 7]      // [3]                 // [7]
 *   poIdx):                                   // 2              // 1                   // 1
 * 
 *   node    = postOrder[poIdx]                // 5              // 7                   // 7
 *   ioIdx   = inOrder.indexOf(node)           // 1              // -1                  // 0
 *   ioLeft  = inOrder[0 to inOrderIdx - 1]    // [3]            // []                  // []
 *   ioRight = inOrder[ioIdx+1, inOrder.len]   // [7]            // []                  // []
 * 
 *   // Base case
 *   return node if ioLeft && ioRight empty    //                                       // return 7
 *  
 *   stast = {                                   
 *      val:    postOrder[i],                  // val: 5        
 *      left:   recon(inOrderLeft),            // recon([3], 1) 
 *      right:  recon(inOrderRight),           // recon([7], 1)
 *   }
 *   return node                              
 */

const reconstruct = (postOrder: number[]) => {
    const reconHelper = (inOrderList: number[], postOrderIdx: number) => {
        console.log('inOrderList..............', inOrderList);
        const node = postOrder[postOrderIdx];
        const inOrderIdx = inOrderList.indexOf(node);
        const inOrderLeft = inOrderIdx > -1 ? inOrderList.slice(0, inOrderIdx) : [];
        const inOrderRight = inOrderIdx > -1 && inOrderIdx < inOrderList.length ? inOrderList.slice(inOrderIdx + 1) : [];
        console.log('....ioLeft, node, ioRight', inOrderLeft, node, inOrderRight);

        // Base case
        if (inOrderLeft.length === 0 && inOrderRight.length === 0) {
            return node;
        }

        const state = {
            val: node,
            left: reconHelper(inOrderLeft, postOrderIdx - 1),
            right: reconHelper(inOrderRight,  postOrderIdx - 1)
        }
        console.log('state...', state);
        return node;
    }

    const inOrder = [...postOrder];
    inOrder.sort();
    console.log('---Reconstructing ---', postOrder);
    reconHelper(inOrder, postOrder.length - 1);
}

/**
 * Test
 */
reconstruct([3, 7, 5]);
