/**
 *          LEAST RECENTLY USED CACHE
 * 
 * To get O(1) performance for both lookups and insertions we use
 * 2 data structures, a hashmap and a doubly-linked list.
 * 
 * Cache(hashmap)           Recency (doubly-linked) list
 * 
 *                          (head points to most recent)
 *                          V     
 * 'h'----------------------|
 *                          'h' <-> 'x' <-> 'a'
 * 'x'-------------------------------|       |
 *                                           |
 * 'a'---------------------------------------
 * 
 */

interface LRUNode<T> { prev: LRUNode<T> | undefined, val: T, next: LRUNode<T> | undefined }
type LRUNodeNullable<T> = LRUNode<T> | undefined;
type HashMap<T> = { [key: string]: LRUNode<T> };

class DLL<T> {
    head: LRUNodeNullable<T>;
    tail: LRUNodeNullable<T>;
    size: number;

    insertAtHead(node: LRUNodeNullable<T>) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }
}

class LRUCache<T> {
    cache = new Map();
    recencyList: DLL<T> = new DLL<T>();

    constructor(readonly n: number) { }

    // /**
    //  * Sets key in cache. If cache-miss sets a new node.
    //  * When n items reached, evicts the least recently used node.
    //  */
    // set(key: string, value: T) {
    //         const newNode: LRUNode<T> = { prev: undefined, val: value, next: undefined};
    //         this.recencyList.insertAtHead(newNode);
    //         this.cache[key] = newNode;
        
    //     return this;
    // }

    get(key: string) {
        const found = this.cache.get(key);
        if (found) {
            this.recencyList.insertAtHead(found);
        }
    }

    pretty(): string {
        let node = this.recencyList.head;
        const arr = []
        while (node) {
            arr.push(node);
            node = node.next;
        }
        return arr.map(x => x.val).join('-')
    }


}

/**
 * ASSERTIONS
 */
const lru = new LRUCache<string>(3);
lru.set('a').set('x').set('h');
console.log(lru.pretty() === 'h-x-a');
