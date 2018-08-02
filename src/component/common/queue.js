
class StoreRecentQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 10;
        this.arr = new Array(maxSize);
        this.size = 0;
        this.front = -1;
        this.rear = -1;
    }

    offer(e) {
        if(this.size == this.maxSize) {
            if(++this.front == this.maxSize) {
                this.front = 0;
            }
        } else {
            ++this.size;
        }
        if(++this.rear == this.maxSize) {
            this.rear = 0;
        }
        this.arr[this.rear] = e;
    }

    poll() {
        if(this.size == 0) {
            return null;
        }
        if(++this.front == this.maxSize) {
            this.front = 0;
        }
        --this.size;
        return this.arr[this.front];
    }

    getSize() {
        return this.size;
    }
}

export default StoreRecentQueue;