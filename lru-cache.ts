/**
 *                          LEAST RECENTLY USED (LRU) CACHE
 * 
 * To get O(1) performance for both lookups and insertions we use 2 data structures:
 * 1. A doubly-linked list with nodes stored in access order
 *
 * 2. A Map for O(1) lookup into the list (rather than traversing the list)
 *    @see https://v8.dev/blog/hash-code 
 * 
 * LOOKUP (Map)                         RECENCY LIST (doubly-linked-list with data, in access order)
 *  ------------                         ---------------------
 * | 'a': node  |  hashmap values       | 'h' <-> 'x' <-> 'a' |
 * | 'x': node  |  point to the ==>      ---------------------
 * | 'h': node  |  DLL nodes               ^               ^
 *  ------------                           |               |
 *                                         |               Tail points to LRU
 *                                         Head points to most recent
 * 
 * THE USE OF MAP AND SOME POSSIBLE REFINEMENTS
 * Typically, hash tables do not provide any order guarantees for iteration, 
 * while ES6 spec requires implementations to keep the insertion order while iterating over a Map.
 * V8 uses the so-called deterministic hash tables algorithm. The bottom line is that it approximates O(1).
 * 
 * Given that the order is preserved (as mandated by the ES6 spec), we could simplify the below implementation
 * by getting rid of the Doubly-Linked list: when we do a GET operation simply delete from the map and insert.
 */
type Key = string;
interface DLLNode<T> {
    prev: DLLNode<T> | undefined,
    data: T,
    key: Key,
    next: DLLNode<T> | undefined
}
type DLLNodeNullable<T> = DLLNode<T> | undefined;
type HashmapLookup<T> = Map<Key, DLLNode<T>>;

/**
 * Doubly Linked List
 */
class DLL<T> {
    head: DLLNodeNullable<T>;
    tail: DLLNodeNullable<T>;

    moveToHead(node: DLLNodeNullable<T>) {
        if (!this.head) { // Empty list
            this.head = node;
            this.tail = node;
        } if (this.head !== node) {
            if (node.prev) {
                node.prev.next = undefined;
            }
            if (node.next) {
                node.next.prev = node.prev;
            }
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.head.prev = undefined;
        }
        return this;
    }

    newNode(key: Key, data: T): DLLNode<T> {
        return { prev: undefined, key, data, next: undefined }
    }

    removeTail() {
        if (this.tail) {
            this.tail = this.tail.prev;
        }
        return this;
    }
}

/**
 * Least Recently Used cache
 */
class LRUCache<T> {
    // Map for fast lookup of nodes by key. See above discussion.
    hmapLookup: HashmapLookup<T> = new Map<string, DLLNode<T>>();

    // Stores nodes in most-recently-used to least-recently-used order.
    recencyList: DLL<T> = new DLL<T>();

    constructor(readonly capacity: number) { }

    /**
     * Sets key in cache and data in list.
     * When n items reached, evicts the least recently used node.
     */
    setKeyValue(key: string, data: T) {
        const newNode = this.recencyList.newNode(key, data);
        return this.setNode(newNode);
    }

    /**
     * Sets node at head and trims
     */
    setNode(newNode: DLLNode<T>) {
        this.recencyList.moveToHead(newNode);
        console.log('after move', this.pretty());
        this.hmapLookup.set(newNode.key, newNode);
        return this.trim();
    }

    get(key: Key): DLLNode<T> | undefined {
        const node = this.hmapLookup.get(key)
        if (node) {
            this.setNode(node);
        }
        return node;
    }

    /**
     * Trims the hmap and recencyList when capicity is exceeded
     */
    trim() {
        if (this.hmapLookup.size > this.capacity) {
            const last = this.recencyList.tail;
            if (last) {
                this.hmapLookup.delete(last.key);
                this.recencyList.removeTail();
            }
        }
        return this;
    }

    hasKey(key: string): boolean {
        return this.hmapLookup.has(key)
    }

    pretty(): string {
        let node = this.recencyList.head;
        const arr = []
        while (node && arr.length < this.capacity) {
            arr.push(node);
            node = node.next;
        }
        return arr.map(x => x.key).join('-')
    }
}

/**
 * ASSERTIONS
 */
const lru = new LRUCache<string>(3);
// Test SET
lru.setKeyValue('a', 'data1').setKeyValue('x', 'data2').setKeyValue('h', 'data3');
console.log(lru.pretty() === 'h-x-a');

// Test GET
lru.get('a')
console.log(lru.pretty() === 'a-h-x');

// Test EVICTION
lru.setKeyValue('c', 'data4');
lru.get('c');
console.log(lru.pretty() === 'c-a-h');
