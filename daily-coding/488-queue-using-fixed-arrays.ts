/**
 *                      Problem #488 [Hard] - QUEUE USING FIXED-LENGTH ARRAYS
 * 
 * This problem was asked by Netflix.
 * 
 * Implement a queue using a set of fixed-length arrays.
 * The queue should support enqueue, dequeue, and get_size operations.
 */

/**
 * APPROACH: A pool of fixed-sized ring buffers. We start with 1 ring-buffer.
 *           Enqueue items at rear; dequeue at front.
 * 
 *                       Front
 *                         v       
 *      [0] RING BUFFER: [ 4 | 9 | 5 ]
 *                                 ^
 *                                Rear = (Front + size) % MAXSIZE
 * 
 *      When it fills up we create a new buffer
 *                         Front 
 *                          v
 *      [1] RING BUFFER:  [ 7 | 5 | _ ]
 *                              ^
 *                            Rear = (Front + size) % MAXSIZE
 */

/**
 * Circular queue
 */
class RingBuffer<T> {
    frontIdx: number = 0;
    size: number = 0;
    data: T[];

    constructor(readonly MAX_SIZE: number) {
        this.data = new Array<T>(MAX_SIZE);
    }

    /**
     * Sets the rear slot with elem. Does not check for size overflow.
     */
    push(elem: T): RingBuffer<T> {
        this.data[(this.frontIdx + this.size) % this.MAX_SIZE] = elem;
        this.size++;
        return this;
    }

    pop(): T | undefined {
        if (this.size === 0) {
            return undefined;
        }
        const elem = this.data[this.frontIdx];
        this.frontIdx = (this.frontIdx + 1) % this.MAX_SIZE
        this.size--;
        return elem;
    }

    isFull(): boolean {
        return this.size >= this.MAX_SIZE;
    }
}

/**
 * Implements a queue using a pool of fixed-sized ring buffers
 */
class Queue<T> {
    pool: RingBuffer<T>[];

    constructor(readonly N: number) {
        this.pool = [new RingBuffer(N)];
    }

    enqueue(elem: T): Queue<T> {
        let lastBuffer = this.pool[this.pool.length - 1];
        // Extend if full
        if (lastBuffer.isFull()) {
            const newBuffer = new RingBuffer<T>(this.N);
            this.pool.push(newBuffer);
            lastBuffer = newBuffer;
        }
        lastBuffer.push(elem);
        return this;
    }

    /**
     * Dequeues at head
     */
    dequeue(): T | undefined {
        const firstBuffer = this.pool[0];
        if (firstBuffer.size <= 0) {
            return undefined;
        }
        const elem = firstBuffer.pop();
        // Remove from pool when empty and there are other ringbuffers
        if (firstBuffer.size === 0 && this.pool.length > 1) {
            this.pool.splice(0, 1);
        }
        return elem;
    }

    /**
     * Returns the size of all active elements
     */
    getSize(): number {
        return this.pool.reduce((accum, x) => accum = accum + x.size, 0);
    }
}

/**
 * ASSERTIONS
 */
// Test Ring Buffer
const rb = new RingBuffer(3)
console.log((rb.push(4).push(9).push(5)).data.join(',') === '4,9,5');
console.log((rb.pop() === 4));
console.log((rb.pop() === 9));
console.log((rb.pop() === 5));
console.log((rb.pop() === undefined));
rb.push(7).push(3);
console.log((rb.pop() === 7));
console.log((rb.pop() === 3));
console.log((rb.pop() === undefined));

// Test Queue
const q = new Queue(3);
console.log((q.enqueue(2).enqueue(5).enqueue(3).enqueue(6)).getSize() === 4);
console.log(q.dequeue() === 2);
console.log(q.dequeue() === 5);
console.log(q.dequeue() === 3);
console.log(q.dequeue() === 6);
console.log(q.dequeue() === undefined)
console.log(q.getSize() == 0);
