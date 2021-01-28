/**
 *                        Problem #133 [Medium] - BST IN-ORDER SUCCESSOR
 * 
 * This problem was asked by Amazon.
 * 
 * Given a node in a binary search tree, return the next bigger element, also known as the inorder successor.
 * For example, the inorder successor of 22 is 30.
 *
 *    10
 *   /  \
 *  5    30
 *      /  \
 *     22    35
 * You can assume each node has a parent pointer.
 *
 * SOLUTION
 * IOS = (in-order-successor) lies either in the Right subtree or the annscesor
 * Case 1: Root R has a right node. Traverse downwards and choose the smallest value, minTree(node.right)
 *         How? if the right child has no left child, the right child is your inorder successor.
 *         ios(8) -> 10 in the BST below.
 * Case 2: Root R has no right node. IOS is in anscestors. 
 *         How? Traverse upwards using parent links until until node R is a left child of its parent.
 *         The parent P of such a node is the IOS.
 *         ios(14) is 20 in the BST below
 * 
 *                    20
 *                  /    \
 *                 8      22
 *               /   \
 *              4     12
 *                   /  \
 *                 10    14
 */
