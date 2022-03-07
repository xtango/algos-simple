/**
 *                                  Problem #530 - EDIT DISTANCE [Easy]
 * 
 * This problem was asked by Google.
 * 
 * The edit distance between two strings refers to the minimum number of character insertions,
 * deletions, and substitutions required to change one string to the other. For example, the 
 * edit distance between “kitten” and “sitting” is three: substitute the “k” for “s”, substitute
 * the “e” for “i”, and append a “g”.
 * 
 * Given two strings, compute the edit distance between them.
 */

/**
 * Return a 2D matrix initialized to 0 except for the first row and first column.
 * Source = kitten, target = sitting
 * 
 * 	        k   i   t   t   e   n
 *      0	1	2	3	4	5	6
 * s	1	
 * i	2	
 * t	3	
 * t	4	
 * i	5	
 * n	6	
 * g	7	
 */
const newMemo = (m: number, n: number): number[][] => {
    const matrix = new Array(n + 1);
    // First row
    matrix[0] = new Array(m + 1);
    for (let col = 0; col <= m + 1; col++) {
        matrix[0][col] = col;
    }

    for (let row = 1; row < n + 1; row++) {
        matrix[row] = new Array(n + 1).fill(0, 1);
        // source prefixes can be transformed into empty string by
        // dropping all characters
        matrix[row][0] = row;
    }
    return matrix;
}

/**
 * Returns the edit distance using the LevenshteinDistance dynamic programming.
 * @see https://en.wikipedia.org/wiki/Levenshtein_distance
 *  
 *   Target
 *   / 
 *  /       k   i   t   t   e   n <---- Source
 * /    0	1	2	3	4	5	6 <---- See wikipedia for 1st row and 1st col
 * s	1	1	2	3	4	5	6
 * i	2	2	1	2	3	4	5
 * t	3	3	2	1	2	3	4
 * t	4	4	3	2	1	2	3
 * i	5	5	4	3	2	2	3
 * n	6	6	5	4	3	3	2
 * g	7	7	6	5	4	4	3 <---- Final edit distance
 */
const editDistance = (source: string, target: string): number => {
    const memo = newMemo(source.length, target.length);

    // Rows
    for (let j = 1; j <= target.length; j++) {
        // Columns
        for (let i = 1; i <= source.length; i++) {
            const isMatch = source[i - 1] === target[j - 1];

            const [deleteCost, insertCost, subsCost] = [
                memo[j][i - 1] + 1,                      // deletion
                memo[j - 1][i] + 1,                      // insertion
                memo[j - 1][i - 1] + (isMatch ? 0 : 1)]; // substitution
            //console.log(`[${j}][${i}] del, ins, sub, ${deleteCost}, ${insertCost}, ${subsCost}`);

            memo[j][i] = Math.min(deleteCost, insertCost, subsCost);
        }
    }

    return memo[target.length][source.length]
}

/**
 * ASSERTIONS
 */
console.log(newMemo('kitten'.length, 'sitting'.length).length === 8);
console.log(editDistance('kitten', 'sitting') === 3);
