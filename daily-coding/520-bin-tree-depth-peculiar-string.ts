/**
 *                              Problem #520 [Hard] - DEPTH OF BIN TREE PECULIAR STRING

    This problem was asked by LinkedIn.
    You are given a binary tree in a peculiar string representation. Each node is written in the form (lr),
    where l corresponds to the left child and r corresponds to the right child.
    If either l or r is null, it will be represented as a zero. Otherwise, it will be represented by a new (lr) pair.

    Here are a few examples:
        A root node with no children: (00)
        A root node with two children: ((00)(00))
        An unbalanced tree with three consecutive left children: ((((00)0)0)0)
    Given this representation, determine the depth of the tree.
*/

/**
 * Splits an expression enclosed in parentheses into left and right expressions.
 * 
 * @example splitLeftRight('(0(00))')) return {left:'0',right: '(00)'}
 */
const splitLeftRight = (lrExpression: string): { left: string, right: string } => {
    let [i, countOpen] = [1, 0];
    while (i < lrExpression.length - 1) { // skip first and last, ( and )
        const char = lrExpression[i];
        if (char === '(') {
            countOpen++;
        } else if (char === ')') {
            countOpen--;
        }

        i++;
        if (countOpen === 0) {
            break;
        }
    }
    return {
        left: lrExpression.substring(1, i),
        right: lrExpression.substring(i, lrExpression.length - 1)
    }
}


/**
 * Returns the depth of a Binary Tree.
 * @param lrExpression The left-right expression.
 * 
 * @example A root node with no children: (00). Depth = 0
 * 
 *                                  a
 * 
 * @example A root node with two children: ((00)(00)). Depth = 1
 *                                  a
 *                                 / \
 *                                b   c
 *     
 * @example An unbalanced tree with three consecutive left children: ((((00)0)0)0). Depth = 3
 *                                  a ((((00)0)0)0)
 *                                 /
 *                                b    (((00)0)0)
 *                               /
 *                              c       ((00)0)
 *                             /
 *                            d           (00)
*/
const binTreeDepth = (lrExpression: string): number => {
    //console.log('lrExpr', lrExpression);
    if (lrExpression === '(00)' || (lrExpression === '0')) {
        return 0;
    }
    const {left, right} = splitLeftRight(lrExpression);
    //console.log('\tleft, right', left, right);
    return 1 + Math.max(binTreeDepth(left), binTreeDepth(right));
}

/**
 * ASSERTIONS 
 */
// Test expression splitter
console.log(JSON.stringify(splitLeftRight('(0(00))')) === '{"left":"0","right":"(00)"}');
console.log(JSON.stringify(splitLeftRight('((00)0)')) === '{"left":"(00)","right":"0"}');
console.log(JSON.stringify(splitLeftRight('((00)(00))')) === '{"left":"(00)","right":"(00)"}');
console.log(JSON.stringify(splitLeftRight('((((00)0)0)0)')) === '{"left":"(((00)0)0)","right":"0"}');

// Test tree height
console.log(binTreeDepth('(0(00))') === 1)
console.log(binTreeDepth('(0(0(00)))') === 2)
console.log(binTreeDepth('((((00)0)0)0)') === 3);
