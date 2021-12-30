/**
 *                  Problem #448 [Hard] - THREE-WAY PARTION

This problem was asked by Google.

Given an array of strictly the characters 'R', 'G', and 'B', segregate the values of the array
so that all the Rs come first, the Gs come second, and the Bs come last. You can only swap elements of the array.

Do this in linear time and in-place.

For example, given the array ['G', 'B', 'R', 'R', 'B', 'R', 'G'], it should become 
['R', 'R', 'R', 'G', 'G', 'B', 'B'].
*/

/**
 * APPROACH        This problem is no different from the Dutch National Flag problem
 *                 proposed by Edsger Dijkstra: https://en.wikipedia.org/wiki/Dutch_national_flag_problem
 * 
 *                  We keep 3 indices, i = current, rg, gb, creating 4 regions:
 *                  1. Rs region: 0..rg
 *                  2. Gs region: rg..i
 *                  3. Bs region: gb..len-1
 *                  4. Not processed yet region: i..gb
 *
 *                  rg   i        gb   
 *                   v   v        v        
 *              |RRRRGGGG?????????BBBBBBBB| 
 */
const partInto3 = (arr: string[]) => {
    let [i, rg, gb] = [
        0,
        -1, // one before leftmost
        arr.length // one past rightmost
    ];
    while (i < gb) {
        // Swap with R region, shifting rg 1 right
        if (arr[i] === 'R') {
            rg++;
            arr[i] = arr[rg];
            arr[rg] = 'R';
            i++;
        }
        // swap with B region, shifting gb 1 left
        // important don't increment i, since we've not
        // not processed the swapped elem
        else if (arr[i] === 'B') {
            gb--;
            arr[i] = arr[gb];
            arr[gb] = 'B';
        }   // In the proper region, do nothing 
        else {
            i++
        }
    }

    return arr;
}

/**
 * ASSERTIONS
 */
let x = ['G', 'B', 'R', 'R', 'B', 'R', 'G'];
partInto3(x)
console.log(x.join(',') === 'R,R,R,G,G,B,B')
