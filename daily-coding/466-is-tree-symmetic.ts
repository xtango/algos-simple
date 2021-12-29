/**
 *              #466 [Easy] - IS TREE SYMMETRIC?
 * 
 * This problem was asked by Amazon.
 * 
 * A tree is symmetric if its data and shape remain unchanged when it is reflected about the root node.
 * The following tree is an example:
 *        4
 *      / | \
 *    3   5   3
 *  /           \
 * 9              9
 * Given a k-ary tree, determine whether it is symmetric.
*/

interface TreeNode { val: number, children?: TreeNode[] }

const numChildren = (node: TreeNode | undefined) => ((node && node.children) || []).length;

/**
 *  
 * APPROACH Check pair of nodes starting from the outside edges towards the center.
 *          The trick here is to start the recursive calls with isEqualPair(root, root).
 * 
 * Note: An m-ary tree (also known as k-ary or k-way tree) is a rooted tree in which
 *       each node has no more than m children. This implementation makes no assumptions
 *       on the num of children.
 */

const isSymmetric = (root: TreeNode): boolean => {
    /**
     * Recursive helper function
     */
    const isEqualPair = (
        node: TreeNode | undefined,
        reflectedNode: TreeNode | undefined
    ): boolean => {
        // console.log('isEqualPair', node && node.val, reflectedNode && reflectedNode.val);
        const [childrenCount, numReflectedChildren] = [numChildren(node), numChildren(reflectedNode)];

        if (!node
            || !reflectedNode
            || node.val !== reflectedNode.val
            || childrenCount !== numReflectedChildren) {
            return false;
        }

        // Recursively call isEqualPair for children, going from outer edges to middle
        // In the example above:
        // isEqualPair 4 4 -> isEqualPair 3 3 -> isEqualPair 9 9 -> isEqualPair 5 5
        let [i, j] = [0, numReflectedChildren - 1];
        while (i <= j) {
            if (!isEqualPair(node.children && node.children[i],
                reflectedNode.children && reflectedNode.children[j])
            ) {
                return false;
            }
            i++;
            j--;
        }

        return true;
    }

    return isEqualPair(root, root);
}

/**
 * ASSERTIONS
 */

//      Test 0 (Just root, no children)
//         4
console.log(isSymmetric({ val: 4 }));

//      Test 1
//         4
//       / | \
//     3   5   3
//   /           \
// 9              9
console.log(isSymmetric(
    {
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
) === true);

//      Test 2
//         4
//       / | \
//     3   5   3
//   /        /  \
// 9         9     1
console.log(isSymmetric({
    val: 4,
    children: [
        {
            val: 3, children: [{ val: 9 }]
        },
        { val: 5 },
        {
            val: 3, children: [{ val: 9 }, { val: 1 }]
        }
    ]
}) === false);

//      Test 3
//         4
//       / | \
//     3   5   3
//        / \
//       7   7
console.log(isSymmetric({
    val: 4,
    children: [
        {
            val: 3
        },
        { val: 5, children: [{ val: 7 }, { val: 7 }] },
        {
            val: 3
        }
    ]
}) === true);
