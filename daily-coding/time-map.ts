/**
 *              097 - TIME MAP
 * 
 * This problem was asked by Stripe.
 * Write a map implementation with a get function that lets you retrieve the value of a
 * key at a particular time.
 * 
 * It should contain the following methods:
 * set(key, value, time): sets key to value for t = time.
 * get(key, time): gets the key at t = time.
 * 
 * The map should work like this. If we set a key at a particular time, it will maintain
 * that value forever or until it gets set at a later time. In other words, when we get 
 * a key at a time, it should return the value that was set for that key set at the most
 * recent time.
 * 
 * Consider the following examples:
 * d.set(1, 1, 0) # set key 1 to value 1 at time 0
 * d.set(1, 2, 2) # set key 1 to value 2 at time 2
 * d.get(1, 1) # get key 1 at time 1 should be 1
 * d.get(1, 3) # get key 1 at time 3 should be 2
 * 
 * d.set(1, 1, 5) # set key 1 to value 1 at time 5
 * d.get(1, 0) # get key 1 at time 0 should be null
 * d.get(1, 10) # get key 1 at time 10 should be 1
 * 
 * d.set(1, 1, 0) # set key 1 to value 1 at time 0
 * d.set(1, 2, 0) # set key 1 to value 2 at time 0
 * d.get(1, 0) # get key 1 at time 0 should be 2
 * 
 * SOLUTION
 * Uses a simple map of arrays. This sorting is crude, but works. Can be improved with a 
 * map of binary search trees (BSTs)
 *                              State of map
 *                 0---1---2---3---4---5------10--> Time
 * Example 1:
 * d.set(1, 1, 0): 1       
 * d.set(1, 2, 2): 1   _   2      
 * 
 * Example 2:    
 * d.set(1, 1, 5): 1   _   2   _   _   1
 * 
 * 
 * d.set(1, 1, 0): 1   _   2   _   _   1
 * d.set(1, 2, 0): 2   _   2   _   _   1
 */

interface Timestamped { time: number, value: number }

/**
 */
type TimeMapped = { [key: string]: Timestamped[] }

class ValueAtTime {
    timeMap: TimeMapped = {};

    /**
     * Sets the map
     */
    set(key: number, value: number, time: number) {
        if (!this.timeMap[key]) {
            this.timeMap[key] = [{ time, value }]
            return this;
        }

        // Linear search
        const found = this.timeMap[key].find(x => x.time === time);
        if (found) {
            found.value = value;
        } else {
            this.timeMap[key].push({ time, value });

            // This sorting is crude, but works. Can be improved with a BST
            this.timeMap[key] = this.timeMap[key].sort((a, b) => a.time - b.time)
        }
        return this;
    }


    /**
     * Returns the value corresponding to the max(timestamp where timestamp <= time)
     */
    get(key: number, time: number): number | null {
        const filtered = this.timeMap[key].filter(x => x.time <= time);
        return filtered?.length > 0 ? filtered[filtered.length - 1].value : null;
    }
}

/**
 * ASSERTIONS
 */
const d = new ValueAtTime();
d.set(1, 1, 0).set(1, 2, 2)
console.log('d', JSON.stringify(d));
console.log(d.get(1, 1) === 1);
console.log(d.get(1, 3) === 2);

const d2 = new ValueAtTime();
d2.set(1, 1, 5);
console.log(d2.get(1, 0) === null);
console.log(d2.get(1, 10) === 1);

const d3 = new ValueAtTime();
d3.set(1, 1, 0).set(1, 2, 0);
console.log(d3.get(1, 0) === 2));
