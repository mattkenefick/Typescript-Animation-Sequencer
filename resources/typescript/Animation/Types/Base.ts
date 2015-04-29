

module Animation.Type {

    export class Base extends Backbone.EventDispatcher {

        public $el;
        public duration;

        private _state:string;


        constructor(options?) {
            super();

            _.extend(this, options);
        }

        animateIn(): void {

        }

        animateOut(): void {

        }


        // Getters / Setters
        // ----------------------------------------------------

        get state(): string {
            return this._state;
        }

        set state(state: string) {
            this._state = state;
        }

        setTarget($el) {
            this.$el = $el;

            return this;
        }


        // Event Handlers
        // ----------------------------------------------------

        onAnimateIn(): void {
            this.state = Animation.Events.IN;

            this.trigger(Animation.Events.DONE);
        }

        onAnimateOut(): void {
            this.state = Animation.Events.OUT;

            this.trigger(Animation.Events.DONE);
        }

    }

}
