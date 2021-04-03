/**
 *                              #196 [Easy] - MOST FREQUENT SUBTREE SUM
 * 
 * This problem was asked by Apple.
 * 
 * Given the root of a binary tree, find the most frequent subtree sum.
 * The subtree sum of a node is the sum of all values under a node, including the node itself.
 * 
 * For example, given the following tree:
 *   5
 *  / \
 * 2  -5
 * Return 2 as it occurs twice: once as the left leaf, and once as the sum of 2 + 5 - 5.
 */

interface BinTreeNode { val: number, left?: BinTreeNode, right?: BinTreeNode }

const mostFreq = (root: BinTreeNode): number => {
    const freq: { [key: number]: number } = {};

    const subtreeSum = (node: BinTreeNode): number => {
        console.log({ node: node.val });
        const sum = node.val
            + (node.left ? subtreeSum(node.left) : 0)
            + (node.right ? subtreeSum(node.right) : 0);

        // If not exists set to 1, else increment using bitwise NOT,
        // where ~undefined is -1, ~1 is -2, ~2 is 3 and so on.
        freq[sum] = -~freq[sum];
        return sum;
    }

    subtreeSum(root);
    const occurances = Object.entries(freq);
    occurances.sort((a, b) => b[1] - a[1]); // descending
    return parseInt(occurances[0][0]);
}

/**
 * ASSERTIONS
 */
console.log(mostFreq({
    val: 5,
    left: {
        val: 2,
    },
    right: {
        val: -5
    }
}) === 2);
