/**
 *                   #204 [Easy] - NUM NODES IN COMPLETE BINARY tree
 * 
 * This problem was asked by Amazon.
 * 
 * Given a complete binary tree, count the number of nodes in faster than O(n) time.
 * Recall that a complete binary tree has every level filled except the last, and
 * the nodes in the last level are filled starting from the left.
 */


/** 
 * From wikipedia: In a complete binary tree every level, except possibly the last,
 * is completely filled, and all nodes in the last level are as far left as possible.
 *
 * Max number of nodes of heigh h is 2h 
 * 
 *                   2       h=0
 *                  / \
 *                 7   5     h=1
 *                / \
 *               2   6
 *                  
 */
interface BinTreeNode { val: number, left?: BinTreeNode, right?: BinTreeNode }

const numNodes = (root: BinTreeNode): number => {
    let h = 0;
    let node = root;
    while (node) {
        node = node.left;
        h++;
    }
    return h;
}

const tree1 = {
    val: 2,
    left: {
        val: 7,
        left: { val: 2 },
        right: { val: 6 }
    },
    right: {
        val: 5
    }
}

console.log(numNodes(tree1));
