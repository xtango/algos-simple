/**
 *  #466 [Easy] - K-ARY TREE SYMMETRIC

This problem was asked by Amazon.
A tree is symmetric if its data and shape remain unchanged when it is reflected about the root node. The following tree is 
an example:
        4
      / | \
    3   5   3
  /           \
9              9
Given a k-ary tree, determine whether it is symmetric.
*/

interface TreeNode { val: number, children?: TreeNode[] }

const numChildren = (node: TreeNode) => (node.children || []).length

/**
 * An m-ary tree (also known as k-ary or k-way tree) is a rooted tree in which each node has no more than m children.
 *  
 * APPROACH Check a pair of nodes starting from the outside towards the center
 * 
 */

const isSymmetric = (head: TreeNode): boolean => {

    const isEqualPair = (node1: TreeNode, node2: TreeNode): boolean => {
        console.log('isEqualPair', node1.val, node2.val);
        const [childCount1, childCount2] = [numChildren(node1), numChildren(node2)];

        if (!node1
            || !node2
            || node1.val !== node2.val
            || childCount1  !== childCount2) {
            return false;
        }

        for (let i = 0; i < childCount1/2; i++) {
            if (!isEqualPair(node1.children[i], node2.children[childCount1 - i - 1]])} {
                return false;
            }
       
        }
        return true;
    }
}

const TERNARY_TREE: TreeNode = {
    val: 4,
    children: [
        {
            val: 3, children: [{ val: 9 }]
        },
        { val: 5 },
        {
            val: 3, children: [{ val: 9 }]
        }
    ]
}
