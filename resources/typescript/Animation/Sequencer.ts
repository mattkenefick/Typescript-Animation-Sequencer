

module Animation {

    export class Sequencer extends Backbone.EventDispatcher {

        protected items = [];
        protected index:number = 0;
        protected method:string;

        private _running:boolean = false;

        constructor(options?) {
            super(options);

            _.extend(this, options);
        }

        add(stepId:number, method:string, item, options?) {
            if (!options) {
                options = { };
            }

            this.items.push(_.extend({
                stepId: stepId,
                async: false,
                object: item,
                method: method,
                event: Animation.Events.DONE
            }, options));
        }

        start() {
            this.items.sort(function(a, b) {
                var x = a['stepId']; var y = b['stepId'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            this.index    = 0;
            this._running = true;

            this.fire(this.current);
        }

        advance(...vars) {
            if (this.next) {
                this.fire(this.current);

                this.trigger(Animation.Events.SEQUENCE_ADVANCE, {
                    sequencer: this
                });
            }
            else {
                this._running = false;

                this.trigger(Animation.Events.SEQUENCE_COMPLETE, {
                    sequencer: this
                });
            }
        }

        fire(stepObject): void {
            var object = stepObject.object,
                method = object[stepObject.method];

            // setup next
            if (stepObject.async) {
                this.advance();
            }
            else {
                object.off(stepObject.event);
                object.on(stepObject.event, () => {
                    this.advance();
                });
            }

            // execute
            if (stepObject.delay) {
                setTimeout( () => {
                    object[stepObject.method]();
                }, stepObject.delay);
            }
            else {
                object[stepObject.method]();
            }
        }


        // Getters / Setters
        // ------------------------------------------------------------------

        get current() {
            return this.items[this.index];
        }

        get next() {
            if (this.index == this.items.length - 1) {
                return false;
            }

            this.index++;

            return this.current;
        }

        get previous() {
            if (this.index == 0) {
                return false;
            }

            this.index--;

            return this.current;
        }

        get total() {
            return this.items.length;
        }

        get isRunning() {
            return this._running;
        }

    }

}
