/**
 * LONGEST COMMON SUBSEQUENCE
 * 
 * LCS('xzdshaore', 'aldskhaxyre') => 5 // Common = 'share'
 */
const lcs = (A: string, B: string) => {

    // 2D memoization of LCS at (aIdx, bIdx)
    let memo: number[][]; /

    /**
     * Return the lenght of the longest subsequence at location (aIdx, bIdx)
     * the indices into strings A and B respectively.
     */ 
    const lcsHelper = (aIdx: number, bIdx: number, depth: number): number => {
        console.log(pretty(depth, aIdx, bIdx));
        let retVal = 0;
        if (memo[aIdx][bIdx] > -1) {
            return memo[aIdx][bIdx];
        }

        if (aIdx === 0 || bIdx === 0) {
            retVal = 0;
        } else if (A[aIdx] === B[bIdx]) { // Same last char
            // Hit a match, so 1 + rest
            retVal = 1 + lcsHelper(aIdx - 1, bIdx - 1, depth + 1);
        } else { // Different last char
            const left = lcsHelper(aIdx - 1, bIdx, depth + 1);
            const right = lcsHelper(aIdx, bIdx - 1, depth + 1);
            retVal = Math.max(left, right);
        }
        console.log('--->', retVal);
        memo[aIdx][bIdx] = retVal;
        return retVal;
    }

    const pretty = (depth: number, aIdx: number, bIdx: number): string => {
        const lastChar = A[aIdx] === B[bIdx] ? ' -> Last char same!' : '';
        const funcSignature = `LCS(${aIdx}, ${bIdx}): ${A.substring(0, aIdx + 1)}, ${B.substring(0, bIdx + 1)}`;
        return `[Depth ${depth}] ${funcSignature}${lastChar}`;
    }

    /**
     * Initializes memo to -1
     */
    const newMemo = () => {
        const mem = new Array(A.length);
        for (let i = 0; i < A.length; i++) {
            mem[i] = new Array(B.length).fill(-1);
        }
        return mem;
    }

    memo = newMemo();
    console.log(`--- LCS("${A}", "${B}") ---`)
    return lcsHelper(A.length - 1, B.length - 1, 0);

}

/**
 * TEST
 */
console.log('LCS -> ', lcs('shaore', 'skhare')); //  -> 'share')
