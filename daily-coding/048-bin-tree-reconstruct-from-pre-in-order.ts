/**
 *                              Problem #48 [Medium]
 * 
 * This problem was asked by Google.
 * 
 * Given pre-order and in-order traversals of a binary tree,
 * write a function to reconstruct the tree.
 * 
 * For example, given the following preorder traversal:
 *      [a, b, d, e, c, f, g]
 * And the following inorder traversal:
 *      [d, b, e, a, f, c, g]
 * You should return the following tree:
 *     a
 *    / \
 *   b   c
 *  / \ / \
 * d  e f  g
 */

/**
 * Preorder traverses Root, Left and Right, while Inorder traverses Left, Root and Right.
 * 
 * 1. Determine root. We know that Root = 'a', as the first elem of Preorder
 * 2. Search for root=a in the inorder list: 
 *    [d, b, e, a, f, c, g]
 *              ^
 *            root
 *    We can conclude that items left of 'a' are in the Left Subtree
 *    and to right of 'a' are in the Right subtree.
 *                 a
 *               /  \
 *         d b e     f c g
 * 3. Recursively get the root and subtrees for the left and right subtree as we did in Steps 1 and 2.
 *    Left Subtree: d b e                                     Right Subtree: f c g
 *    Root = 'b' from Preorder list                           Root = 'c' from preorder list
 *    Search for 'b' in Inorder list.                         Search for 'c' in Inorder list
 *    Left of 'b' is 'd;' right is 'e'                        Left of 'c' is 'f'; right is 'g'
 *                  b                                           c
 *                /  \                                         /  \
 *              d      e                                     f     g
 */
