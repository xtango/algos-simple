/**
 *                      #232 [Easy] - PREFIX MAP SUM
 *
 * This problem was asked by Google.
 * 
 * Implement a PrefixMapSum class with the following methods:
 *      insert(key: str, value: int): Set a given key's value in the map. 
 *              If the key already exists, overwrite the value.
 *      sum(prefix: str): Return the sum of all values of keys that begin with a given prefix.
 * 
 * For example, you should be able to run the following code:
 *      mapsum.insert("columnar", 3)
 *      assert mapsum.sum("col") == 3
 *      mapsum.insert("column", 2)
 *      assert mapsum.sum("col") == 5
 */

type TrieNode = { [char: string]: { sum: number, leaves?: TrieNode }

/**
 * Class using a TRIE.
 * @example after insert('co', 3)
 * { 'c': {
 *         sum: 3,
 *         leaves: {
 *               'o': {
 *                  sum: 3,                
 *                 leaves: {}
 *                 }
 *             }  
 *        }   
 * }    
 */
class PrefixMapSum {
    root: TrieNode = {};

    insert(key: string, value: number) {
        let node = this.root;
        [...key].forEach(char => {
            const found = node[char];
            if (found) {
                found.sum += value;
                node = found.leaves;
            } else {
                node[char] = { sum: value, leaves: {} };
                node = node[char].leaves;
            }
        });
    }

    sum(key: string): number {
        let node = this.root;
        let total = 0;
        for (let i = 0; i < key.length; i++) {
            const found = node[key[i]];
            if (!found) {
                return 0
            }
            total = found.sum;
            node = found.leaves;
            // console.log('i, node', i, key[i], node);
        }
        return total;
    }
}

/**
 * ASSERTIONS
 */
const mapsum = new PrefixMapSum()
mapsum.insert("columnar", 3)
console.log(mapsum.sum("col") == 3);
mapsum.insert("column", 2)
console.log(mapsum.sum("col") == 5);

const mapsum2 = new PrefixMapSum()
mapsum2.insert('co', 3);
mapsum2.insert('cot', 3);
mapsum2.insert('cox', 3);
console.log(mapsum2.sum('co') === 9);
