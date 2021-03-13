/**
 *                          #173 [Easy] - FLATTEN NESTED DICTIONARY
 * 
 * This problem was asked by Stripe.
 *
 * Write a function to flatten a nested dictionary. Namespace the keys with a period.
 *
 * For example, given the following dictionary:
 *
 * {
 *    "key": 3,
 *    "foo": {
 *        "a": 5,
 *        "bar": {
 *            "baz": 8
 *        }
 *    }
 * }
 * it should become:
 *
 * {
 *    "key": 3,
 *    "foo.a": 5,
 *    "foo.bar.baz": 8
 * }
 * You can assume keys do not contain dots in them, i.e. no clobbering will occur.
 */
type NestedDictionary = { [key: string]: any };

/**
 * Flattens a nested dictioanary recursively.
 */
const flatten = (dict: NestedDictionary) => {
    const accum: { [key: string]: number } = {}

    const flattenHelper = (node: NestedDictionary, path: string) => {
        const keys = Object.keys(node);
        keys.forEach(key => {
            const flatKey = path === '' ? key : path + '.' + key;
            if (typeof node[key] === 'number') {
                accum[flatKey] = node[key];
            } else {
                flattenHelper(node[key], flatKey);
            }
        });
    }

    flattenHelper(dict, '');
    return accum;
}

/**
 * ASSERTIONS
 */
const flattened = flatten(
    {
        "key": 3,
        "foo": {
            "a": 5,
            "bar": {
                "baz": 8
            }
        }
    });
console.log(flattened["key"] === 3);
console.log(flattened["foo.a"] === 5);
console.log(flattened["foo.bar.baz"] === 8);
