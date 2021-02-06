/**
 *               #142 [Hard] - BALANCED PARENS WITH WILDCARD
 * This problem was asked by Google.
 * 
 * You're given a string consisting solely of (, ), and *. * can represent either 
 * a (, ), or an empty string. Determine whether the parentheses are balanced.
 * For example, (()* and (*) are balanced. )*( is not balanced.
 */
const OPAREN = '(';
const CPAREN = ')';
const STAR = '*';
const MAX_DEPTH = 10;

const isBalanced = (input: string): boolean => {
    /**
     * Helper function for recursion.
     */
    const helper = (
        str: string,
        stack: string[] = [],
        depth: number = 0): boolean => {

        const pop = () => stack.splice(stack.length - 1, 1);
        const push = (ch: string) => stack.push(ch);

        if (depth > MAX_DEPTH) {
            console.log('aborting');
            return false;
        }

        if (str.length === 0) {
            // console.log('-> balanced', stack.length === 0);
            return stack.length === 0; // It's balanced when empty
        }

        const ch = str[0];
        // console.log(`[depth ${depth}, char: ${ch}] str: ${str},  stack: ${stack}`);
        if (ch === STAR) {
            // Recurse 3 possibilities of *: (, ), and empty
            const str1 = OPAREN + str.substring(1);
            const str2 = CPAREN + str.substring(1);
            const str3 = str.substring(1);

            // Important: Make 3 copies of stack
            const [stack1, stack2, stack3] = [[...stack], [...stack], [...stack]];
            return helper(str1, stack1, depth + 1)
                || helper(str2, stack2, depth + 1)
                || helper(str3, stack3, depth + 1);
        } else {
            if (ch === OPAREN) {
                push(ch);
            } else if (ch === CPAREN) {
                pop();
            }
            return helper(str.substring(1), stack);
        }
    }

    // console.log('---Is Balanced?', input);
    return helper(input, [], 0);
}

/**
 * ASSERTIONS
 */
// Balanced
['()', '(*)', '()*', '*()'].forEach(s => console.log(isBalanced(s) === true));

// Unbalanced
['(', ')(', ')*('].forEach(s => console.log(isBalanced(s) === false));
