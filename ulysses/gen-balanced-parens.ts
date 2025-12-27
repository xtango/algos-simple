/**
 *              Leet Code:  Generate all possible balanced parentheses for n pairs
 */
const genBalancedParens = (n: number): string[] => {
    const res: string[] = [];

    const helper = (str: string, openCount: number, closeCount: number) => {
        // base case
        if (str.length === 2 * n) {
            res.push(str)
            return
        }

        // 2 Possibilies: A. Open a new parenthesis or B. close an existing open parenthesis. 
        // recurse to generate combinations by trying both options
        //          (
        //         /  \
        //       ((    ()
        //      / \     |  
        //    ((( (()  ()(  

        // A
        if (openCount < n) {
            helper(str + "(", openCount + 1, closeCount)
        }

        // B
        if (closeCount < openCount) {
            helper(str + ")", openCount, closeCount + 1)
        }
        return
    }

    helper("(", 1, 0)
    return res;
}

// Tests
console.log(JSON.stringify(genBalancedParens(2)) === '["(())","()()"]')
console.log(JSON.stringify(genBalancedParens(3)) === '["((()))","(()())","(())()","()(())","()()()"]')
