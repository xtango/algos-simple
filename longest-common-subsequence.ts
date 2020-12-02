/**
 * LONGEST COMMON SUBSEQUENCE
 * 
 * a = 'xzdshaore', b = 'aldskhaxyre' -> 'share'
 */

const lcs = (A: string, B: string) => {
    const lcsHelper = (aIdx: number, bIdx: number, depth: number): number => {
        console.log(`[Depth ${depth}] lcs(${aIdx}, ${bIdx})`);
        let retVal = 0;
        if (aIdx === 0 || bIdx === 0) {
            retVal = 0;
        } else if (A[aIdx] === B[bIdx]) { // same last char
            retVal = 1 + lcsHelper(aIdx - 1, bIdx - 1, depth + 1);
        } else { // different last char
            const left = lcsHelper(aIdx - 1, bIdx, depth + 1);
            const right = lcsHelper(aIdx - 1, bIdx, depth + 1);
            retVal = Math.max(left, right);
        }
        console.log('--->', retVal);
        return retVal;
    }

    lcsHelper(A.length, B.length, 0);

}

lcs('xzdshaore', 'aldskhaxyre'); //  -> 'share')

