/**
 *                  #162 [Medium] - SHORTEST UNIQUE PREFIX OF WORD
 * 
 * This problem was asked by Square.
 *
 * Given a list of words, return the shortest unique prefix of each word. For example, given the list:
 * 
 * dog
 * cat
 * apple
 * apricot
 * fish
 * Return the list:
 * 
 * d
 * c
 * app
 * apr
 * f
 */
type PrefixToWords = { [prefix: string]: string[] };
type WordToPrefix = { [word: string]: string };

const bucket = (words: string[], prefixLen: number): PrefixToWords => {
    const buckets: PrefixToWords = {};
    words.forEach(w => {
        const prefix = w.substr(0, prefixLen);
        if (!buckets[prefix]) {
            buckets[prefix] = [];
        }
        buckets[prefix].push(w);
    })
    return buckets;
}

const shortestPrefix = (words: string[]): string[] => {
    const wordToPrefix: WordToPrefix = {};
    let prefixLen = 1;
    let wordQ = [...words];

    while (wordQ.length > 0) {
        console.log('wordQ', wordQ);
        const buckets = bucket(wordQ, prefixLen)
        console.log('buckets', buckets);
        wordQ = [];

        // Push into either wordToPrefix dicitionay (for uniq items) or wordQ (for non uniq)
        Object.entries(buckets)
            .forEach(([prefix, bucketWords]) => {
                if (bucketWords.length == 1) {
                    wordToPrefix[bucketWords[0]] = prefix;
                } else {
                    bucketWords.forEach(w => wordQ.push(w));
                }
            })
        prefixLen++;
    }
    return words.map(w => wordToPrefix[w]);
}

/**
 * ASSERTIONS
 */
console.log(JSON.stringify(
    shortestPrefix(['dog', 'cat', 'apple', 'apricot', 'fish'])) === '["d","c","app","apr","f"]'
);
