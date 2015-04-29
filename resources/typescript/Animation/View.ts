

module Animation {

    export class View extends Backbone.EventDispatcher {

        protected $el;
        protected _inSequence;
        protected _outSequence;

        private _state:string;


        constructor(options = {}) {
            super(options);

            _.extend(this, options);

            this._inSequence = new Animation.Sequencer;
            this._outSequence = new Animation.Sequencer;

            this._inSequence.on(Animation.Events.SEQUENCE_COMPLETE, () => this.onAnimateIn());
            this._outSequence.on(Animation.Events.SEQUENCE_COMPLETE, () => this.onAnimateOut());

            this.createInSequence();
            this.createOutSequence();
        }

        animateIn(): void {
            if (this.state == Animation.Events.IN) {
                throw new Error("Animation already animated in.");
            }

            if (this.state == Animation.Events.IN_START) {
                throw new Error("Currently animating in.");
            }

            // set state
            this.state = Animation.Events.IN_START;

            // start sequence
            this._inSequence.start();
        }

        animateOut(): void {
            if (this.state == Animation.Events.OUT) {
                throw new Error("Animation already animated out.");
            }

            if (this.state == Animation.Events.OUT_START) {
                throw new Error("Currently animating out.");
            }

            // set state
            this.state = Animation.Events.OUT_START;

            // start sequence
            this._outSequence.start();
        }

        createInSequence(steps?): void {
            steps.forEach( (step) => {
                this._inSequence.add(step.stepId, step.method, step.object, step.options || {});
            });
        }

        createOutSequence(steps?): void {
            steps.forEach( (step) => {
                this._outSequence.add(step.stepId, step.method, step.object, step.options || {});
            });
        }


        // Getters
        // ------------------------------------------------------------------

        get state(): string {
            return this._state;
        }

        set state(state: string) {
            this._state = state;
        }


        // Event Handlers
        // ------------------------------------------------------------------

        onAnimateIn(): void {
            this.state = Animation.Events.IN;

            console.log("Animated in.");

            this.trigger(Animation.Events.DONE);
            this.trigger(Animation.Events.IN);
        }

        onAnimateOut(): void {
            this.state = Animation.Events.OUT;

            console.log("Animated out.");

            this.trigger(Animation.Events.DONE);
            this.trigger(Animation.Events.OUT);
        }

    }

}