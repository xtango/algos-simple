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
 * Since, Preorder traverses Root, Left and Right and Inorder traverses Left, Root and Right,
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
 * 3. Recursively get the root and subtrees for the left subtree sas we did in Steps 1 and 2.
 *      3.1: Let's first take the left subtree: d b e. Root = 'b' // From the Preorder list
 *      3.2: Search for 'b' in Inorder list. Item to the left is 'd;' to the right are 'e'
 *                  b
 *                /  \
 *              d      e
 *      3.3 Do the same for the right subtree, f c g, to get:
 *                                c
 *                              /  \
 *                             f    g
 */

