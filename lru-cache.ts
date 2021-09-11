/**
 *          LEAST RECENTLY USED CACHE  *** Work in progress ***
 * 
 * To get O(1) performance for both lookups and insertions we use
 * 2 data structures, 
 * doubly-linked list: stored in access order
 * hashmap: For O(1) lookup to the list
 * 
 * LOOKUP (hashmap)                     RECENCY LIST (doubly-linked holds data)
 *  ------------                         ---------------------
 * | 'a': node  |  hashmap values       | 'h' <-> 'x' <-> 'a' |
 * | 'x': node  |  point recency  ==>    ---------------------
 * | 'h': node  |  nodes                   ^               ^
 *  ------------                           |               (Tail points to LRU) 
 *                                         |
 *                                         (Head points to most recent)
 */

type Key = string;
interface DLLNode<T> {
    prev: DLLNode<T> | undefined,
    data: T,
    key: Key,
    next: DLLNode<T> | undefined
}
type DLLNodeNullable<T> = DLLNode<T> | undefined;
type HashmapLookup<T> = Map<string, DLLNode<T>>;

class DLL<T> {
    head: DLLNodeNullable<T>;
    tail: DLLNodeNullable<T>;

    insertAtHead(node: DLLNodeNullable<T>) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
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

class LRUCache<T> {
    // For fast lookup of nodes by key
    hmapLookup: HashmapLookup<T> = new Map<string, DLLNode<T>>();

    // Stores nodes in most-recently-used to least-recently-used order.*/
    recencyList: DLL<T> = new DLL<T>();

    constructor(readonly capacity: number) { }

    /**
     * Sets key in cache and data in list
     * When n items reached, evicts the least recently used node.
     */
    setNew(key: string, data: T) {
        const newNode = this.recencyList.newNode(key, data);
        this.recencyList.insertAtHead(newNode);
        this.hmapLookup.set(key, newNode);
        this.trim();
        return this;
    }

    get(key: string) {
        const node = this.hmapLookup.get(key)
        console.log('get', node);
        if (node) {
            this.recencyList.insertAtHead(node);
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
            }
        }
    }

    hasKey(key: string): boolean {
        return this.hmapLookup.has(key)
    }


    pretty(): string {
        console.log('list', this.recencyList);
        let node = this.recencyList.head;
        const arr = []
        while (node) {
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
lru.setNew('a', 'data1').setNew('x', 'data2').setNew('h', 'data3');
console.log(lru.pretty() === 'h-x-a');
lru.get('a')
//console.log(lru.pretty() === 'a-h-x');
