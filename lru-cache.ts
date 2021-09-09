/**
 *          LEAST RECENTLY USED CACHE
 * 
 * Approach for O(1) for both set() and get() we use 2 data 
 * structures, a hashmap and a doubly-linked list.
 * 
 * hmap  --points to-->        DLL (head is most recent, tail the oldest)
 * ------------------------    ----------------------------------------------
 * 'x'                         h <-> x <-> a
 * 'a'
 * 'h'
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
            node.next = this.dll.head;
            this.head = node;
        }
    }
}

class LRUCache<T> {
    hmap: HashMap<T> = {};
    dll: DLL<T> = new DLL<T>();

    constructor(readonly n: number) { }

    /**
     * Sets key in cache. If miss sets a new node.
     * When > n items the least recently used item is evicted.
     */
    set(key: string) {
        const found = this.get(key);
        if (found) {
            this.dll.insertAtHead(found);
        } else {
            const newNode: LRUNode<T> = { val: key }
            this.dll.insertAtHead(newNode);
            this.hmap[key] = newNode;
        }
        return this;
    }

    get(key: string) {
        return this.hmap[key];
    }

    
}

/**
 * ASSERTIONS
 */
const lru = new LRUCache<string>(3);
lru.set('x').set('a');
console.log(lru.dll);
