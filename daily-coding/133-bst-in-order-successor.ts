/**
 *                        Problem #133 [Medium] - BST IN-ORDER SUCCESSOR
 * 
 * This problem was asked by Amazon.
 * 
 * Given a node in a binary search tree, return the next bigger element, also known as the inorder successor.
 * For example, the inorder successor of 22 is 30.
 *
 *                 10
 *                /  \
 *               5    30
 *                   /  \
 *                 22    35
 * You can assume each node has a parent pointer.
 *
 * SOLUTION
 * The in-order-successor (IOS) lies either in the Right subtree or in the Anscestor sub-tree.
 * Case 1: Root R has a right node. Traverse downwards and choose the smallest value, minTree(node.right)
 *         How? If the right child has no left child, the right child is your inorder successor.
 *         IOS(8) is 10 in the BST below.
 * Case 2: Root R has no right node. IOS is in R's anscestors. 
 *         How? Traverse upwards using parent links until until node R is a left child of its parent.
 *         The parent P of such a node is the IOS.
 *         IOS(14) is 20 in the BST below
 * 
 *                   20
 *                  /  \
 *                 8    22
 *                /  \
 *               4    12
 *                   /  \
 *                 10    14
 */

interface BSTNode { val: number; parent?: BSTNode; left?: BSTNode; right?: BSTNode }

const minTree = (root: BSTNode): BSTNode | undefined => {
    // console.log('minTree: root val', root.val);
    if (!root.left && !root.right) {
        return root;
    } else if (!root.left) {
        return root.right;
    } else {
        return minTree(root.left);
    }
}
/**
 * Traverse upwards using parent links until until node R is a left child of its parent.
 * The parent P of such a node is the IOS.
 */
const findSuccInAncestors = (root: BSTNode): BSTNode => {
    let node = root;
    while (node.parent) {
        if (node.parent.left === node) {
            return node.parent;
        }
        node = node.parent;
    }
    return node;
}

const inOrderSucc = (root: BSTNode): BSTNode | undefined => {
    if (root.right) {
        return minTree(root.right);
    } else {
        return findSuccInAncestors(root);
    }
}

/**
 * ASSERTIONS
 */
const subtree1: BSTNode = {
    val: 12,
    left: { val: 10 },
    right: { val: 14 }
};

/**
 *                   20
 *                  /  \
 *                 8    22
 *                /  \
 *               4    12
 *                   /  \
 *                 10    14
 */
const n20: BSTNode = {val: 20};
const n8: BSTNode = {val: 8};
const n22: BSTNode = {val: 22};
const n4: BSTNode = {val: 4};
const n12: BSTNode = {val: 12};
const n10: BSTNode = {val: 10};
const n14: BSTNode = {val: 14};
n20.left = n8;
n20.right = n22;
n8.parent = n20;
n8.left = n4;
n8.right = n12;
n4.parent = n8;
n12.parent = n8;
n12.left = n10;
n12.right = n14;
n10.parent = n12;
n14.parent = n12;

console.log(minTree(n20)?.val === 4);
console.log(minTree(n12)?.val === 10);

