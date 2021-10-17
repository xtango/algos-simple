/**
 *                  Problem #391 [Hard] - LONGEST COMMON CONTIGUOUS 
 * 
 * This problem was asked by Facebook.
 * 
 * We have some historical clickstream data gathered from our site anonymously using cookies.
 * The histories contain URLs that users have visited in chronological order.
 * 
 * Write a function that takes two users' browsing histories as input and returns the longest
 * contiguous sequence of URLs that appear in both.
 * 
 * For example, given the following two users' histories:
 *      user1 = ['/home', '/register', '/login', '/user', '/one', '/two']
 *      user2 = ['/home', '/red', '/login', '/user', '/one', '/pink']
 * You should return the following: ['/login', '/user', '/one']
 */

/**
 * APPROACH
 * This is similar to the Longest Common Substring problem, with words instead of characters.
 * @see         https://en.wikipedia.org/wiki/Longest_common_substring_problem
 * Time:        O(nr)
 * Important:   Substring vs subsequence: This problem is not the same as Longest Common ***Subsequence***, 
 *              which does not have to be contiguous. They require different solutions.
 */

type LongestMatrix = number[][];

/**
 * Finds the longest contiguous sequence of words that appear on both S and T with dynamic programming.
 * 
 * @see https://en.wikipedia.org/wiki/Longest_common_substring_problem
 */
const lcContigSeq = (S: string[], T: string[]): string[] => {
    /**
     *  Longest memo: longest common subsequence of the prefixes S[0..i] and T[0..j] 
     *  ending at position S[i], T[j], respectively.
     *  In other words, the length of the longest found until (i, j).
     * 
     *  For the given example:
     *         /home     /red      /login    /user     /one      /pink     
     * /home     1         0         0         0         0         0         
     * /register 0         0         0         0         0         0         
     * /login    0         0         1         0         0         0         
     * /user     0         0         0         2         0         0         
     * /one      0         0         0         0         3         0         
     * /two      0         0         0         0         0         0   
     */
    const L: LongestMatrix = [...Array(S.length)].map(r => Array(T.length).fill(''));

    // Length of the longest common substring found so far.
    let longestFound: number = 0;

    // TODO!
    // The set of strings which are of length z. 
    // The set ret can be saved efficiently by just storing the index i,
    // which is the last character of the longest common substring (of size z) 
    // instead of S[i-z+1..i].
    // Thus all the longest common substrings would be, for each i in ret,
    //  S[(ret[i]-z)..(ret[i])].
    const ret: string[] = [];

    for (let i = 0; i < S.length; i++) { //    iter 1->S[0]: home...
        for (let j = 0; j < T.length; j++) {//       iter 1 -> T[0]: home, T[1]: red...
            // When a match is found
            if (S[i] === T[j]) {
                if (i === 0 || j === 0) {
                    L[i][j] = 1;
                }
                else {
                    L[i][j] = L[i - 1][j - 1] + 1;
                    if (L[i][j] > longestFound) { // Found a longer sequence
                        longestFound = L[i][j];
                        // todoret := {S[i − z + 1..i]}
                    } else if (L[i][j] === longestFound) {
                        // todo ret := ret ∪ {S[i − z + 1..i]}
                    }
                }
            }
            else { // No match
                L[i][j] = 0;
            }
        }
    }

    console.log(pretty(S, T, L));

    return ret;
}

/**
 * Formats the longest matrix for debugging
 */
const pretty = (S: string[], T: string[], lm: LongestMatrix) =>
    // Col headings in the 1st row
    '\t'.repeat(2) + T.map(x => x.padEnd(10)).join('') + '\n'
    + lm.map((r, i) =>
        S[i].padEnd(10, ' ')
        + r.map(x => x.toString().padEnd(10, ' ')).join('')
    ).join('\n')


/**
 * ASSERTIONS
 */
console.log(JSON.stringify(
    lcContigSeq(
        ['/home', '/register', '/login', '/user', '/one', '/two'],
        ['/home', '/red', '/login', '/user', '/one', '/pink'])
) === `['/login', '/user', '/one']`);
