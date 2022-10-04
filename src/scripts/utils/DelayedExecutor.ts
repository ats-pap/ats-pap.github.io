// Lets the same operation bee queued a buch of times but only executes the given
// most current one with a fixed delay
// Used to executed heavy-duty code only a couple of times instead of every
// single time the instruction is run
export class ScheduledExecutor {

    // Next queued element
    private queued?: ()=>any;

    // If the queue is currently running
    private isRunning: boolean = false;

    // How long to wait between updates
    private readonly delay;

    constructor(delay: number = 200){
        this.delay = delay;
    }

    // Push an update
    public run(handler: ()=>any){
        // Updates the next queue
        this.queued = handler;

        // Starts the queue if it hasn't been run already
        if(!this.isRunning)
            this.startQueue();
    }

    // Starts the queue
    private startQueue(){
        // Starts the queue
        this.isRunning = true;
        setTimeout(()=>{
            // Checks if no more elements are queued
            if(this.queued === undefined){
                this.isRunning = false;
                return;
            }

            // Executes the callback
            this.queued!();
            this.queued = undefined;

            // Queues the next execution
            this.startQueue();
        }, this.delay);
    }

}