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
 * @see https://en.wikipedia.org/wiki/Longest_common_substring_problem
 * Time: O(nr)
 * Important: The Longest Common ***Subsequence***, which does not have to be contiguous,
 *            requires a different solution.
 */

/**
 * Finds the longest contiguous sequence of words that appear on both S and T with dynamic programming.
 * @see https://en.wikipedia.org/wiki/Longest_common_substring_problem
 */
const lcContigSeq = (S: string[], T: string[]): string[] => {

    /**
     * Prints the longest matrix
     */
    const pretty = (L: number[][]) => L.map((r, i) => S[i].padEnd(10, ' ') + r.join(',')).join('\n')


    // Longest Matrix: longest common subsequence of the prefixes S[0..i] and T[0..j] 
    // ending at position S[i], T[j], respectively. 
    // In other words, the length of the longest found until (i, j).
    //              home    red     login   user    one
    // home         1       0       0       0       0
    // register     0       0       0       0       0
    // login        0       0       1
    // user ...
    const L: number[][] = [...Array(S.length)].map(r => Array(T.length).fill(''));

    // Length of the longest common substring found so far.
    let longestFound: number = 0;

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

    console.log(pretty(L));

    return ret;
}



/**
 * ASSERTIONS
 */
console.log(JSON.stringify(
    lcContigSeq(
        ['/home', '/register', '/login', '/user', '/one', '/two'],
        ['/home', '/red', '/login', '/user', '/one', '/pink'])
) === `['/login', '/user', '/one']`);

