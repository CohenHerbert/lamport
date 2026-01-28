type Id = [agent: string, seq: number]

type Task = {
    id: Id,
    timestamp: number | null,
    completed: boolean,
    previous: Id | null
}

class LogicalClock {
    private counter: number

    constructor(initialValue: number = 0) {
        this.counter = initialValue
    }

    public increment(): number {
        this.counter++
        return this.counter
    }

    public update(receivedTimestamp: number): number {
        this.counter = Math.max(this.counter, receivedTimestamp) + 1
        return this.counter
    }

    public getValue(): number {
        return this.counter
    }
}

class Server {
    get queue(): Task[] {
        return this._queue;
    }

    set queue(value: Task[]) {
        this._queue = value;
    }

    private _queue: Task[]
    private clock: LogicalClock

    constructor() {
        this.queue = []
        this.clock = new LogicalClock()
    }

    public createTask(id: Id, previous: Id | null = null): Task {
        console.log('Created task', id)
        return {
            id: id,
            timestamp: null,
            completed: false,
            previous: previous
        }
    }

    public addToQueue(task: Task) {
        if (!task.completed) {
            console.log( 'Added to queue', task.id)
            task.timestamp = this.clock.getValue()
            this.clock.increment()
            this.queue.push(task)
        }
    }

    public nextInQueue() {
        const tasks = this._queue.filter(task => task.completed == false)

        for (const task of tasks) {
            if ((this.searchId(task.previous) && this.searchId(task.previous).completed == true) || this.searchId(task.previous) == null) {
                console.log('Running task', task.id)
                task.completed = true
                return task
            }
        }
    }

    public searchId(id: Id): Task | null {
        if (id == null) {
            return null
        }
        for (const task of this.queue) {
            if ((task.id[0] == id[0] && task.id[1] == id[1]) || task.id == id) {
                return task
            }
        }
        return this.queue.filter(task => task.id == id)[0]
    }
}

const server1 = new Server()

server1.addToQueue(server1.createTask(["Cohen", 1], ["Cohen", 0]))
server1.addToQueue(server1.createTask(["Cohen", 0]))

server1.nextInQueue()
console.table(server1.queue)
server1.nextInQueue()
console.table(server1.queue)