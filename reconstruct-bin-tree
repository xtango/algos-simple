/**
 * RECONSTRUCT BIN TREE
 * 
 * Background: Order of traversal
 * Remember Pre, In, and Post with respect to to A, the ROOT node.
 *      A          Pre  : ABC         ROOT Left Right. This is a depth-first-traversal
 *    /   \        In   : BAC         Left ROOT Right
 *   B     C       Post : BCA         Left Right ROOT
 *
 * For implementation, we can count how many times visited:
 *                                       Print when:
 *            A       Pre  : ABDGHEICFJ  1st time/leaf (Depth-first-traversal)
 *         /    \     In   : GDHBIEACJF  2nd time/leaf
 *        B      C    Post : GHDIEBJFCA  3rd time/leaf
 *      /   \      \
 *     D     E      F
 *    / \   /      /
 *   G  H  I      J
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
 * global: poIdx = postOrder.len // post-order-index
 * 
 * recon(postOder, inOrder):     
 *   node           = postOrder[postOrderIdx]
 *   inOrderIdx     = inOrder.indexOf(node)
 *   inOrderLeft    = inOrder[0 to inOrderIdx]
 *   inOrderRight   = inOrder[inOrderIdx + 1, inOrder.len]
 * 
 *   // Base case
 *   return node when inOrderLeft and inORderRight are both empty
 * 
 *   node = {                                   // i: 2   
 *      val:    postOrder[i],                  // 5
 *      left:   recon(postorder, inOrderLeft),  // recon([3,7,5], [3])
 *      right:  recon(postorder, inOrderRight), // recon([3,7,5], [7])
 *   }
 *   return node
 */
