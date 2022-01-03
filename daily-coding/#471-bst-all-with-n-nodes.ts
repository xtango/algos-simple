/**
 *              Problem #471 [Easy] - ALL POSSIBLE BSTs
 * 
 * This problem was asked by Amazon.
 * Given an integer N, construct all possible binary search trees with N nodes.
 */

/**
 * DEFINITION  a binary search tree (BST), also called an ordered or sorted 
 *             binary tree, is a rooted binary tree data structure whose
 *             internal nodes each store a key greater than all the keys
 *             in the node’s left subtree and less than those in its right subtree.
 */

/**
 * APPROACH 
 * Say N is 3, we have 5 possible BSTs:
 * 
 *      0     0            1          2        2
 *       \     \          / \        /        / 
 *        2      1       0   2      0        1 
 *       /        \                  \      /
 *      1          2                  1    0
 * 
 */
interface BSTNode { val: number, left?: BSTNode, right?: BSTNode }

const SENTINEL_NODE = {val: -1};

const allBSTs = (N: number): BSTNode[] => {
    /**
     * @param start The start index
     * @param end The end index
     */
    const helper = (start: number, end: number): BSTNode[] => {
        console.log(`[start: ${start}, end: ${end}]`);
        const possibleBSTs: BSTNode[] = [];
        // Base Case
        if (start > end) {
            return [SENTINEL_NODE];
        }
        for (let i = start; i <= end; i++) {
            // The ith elem is the root
            const [leftSubTree, rightSubTree] = [helper(start, i - 1), helper(i + 1, end)];

            // Iterate through left subtree. Connect the left and right sub trees to a new root node
            for (let l = 0; l < leftSubTree.length; l++) {
                const left = leftSubTree[l];
                for (let r = 0; r < rightSubTree.length; r++) {
                    const right = rightSubTree[r];
                    const newNode = { val: i, left, right };
                    possibleBSTs.push(newNode);
                }
            }
        }
        return possibleBSTs;
    }

    return helper(0, N - 1);
}

/**
 * ASSERTIONS
 */
console.log(allBSTs(3).length === 5);
