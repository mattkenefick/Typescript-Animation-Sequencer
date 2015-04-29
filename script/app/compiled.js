var Animation;
(function (Animation) {
    var Const = (function () {
        function Const() {
        }
        return Const;
    })();
    Animation.Const = Const;
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var Events = (function () {
        function Events() {
        }
        Object.defineProperty(Events, "DONE", {
            get: function () { return "animation:done"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "SEQUENCE_ADVANCE", {
            get: function () { return "animation:sequence.advance"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "SEQUENCE_COMPLETE", {
            get: function () { return "animation:sequence.complete"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "IN", {
            get: function () { return "animation:in"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "OUT", {
            get: function () { return "animation:out"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "IN_START", {
            get: function () { return "animation:in.start"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Events, "OUT_START", {
            get: function () { return "animation:out.start"; },
            enumerable: true,
            configurable: true
        });
        return Events;
    })();
    Animation.Events = Events;
})(Animation || (Animation = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animation;
(function (Animation) {
    var Sequencer = (function (_super) {
        __extends(Sequencer, _super);
        function Sequencer(options) {
            _super.call(this, options);
            this.items = [];
            this.index = 0;
            this._running = false;
            _.extend(this, options);
        }
        Sequencer.prototype.add = function (stepId, method, item, options) {
            if (!options) {
                options = {};
            }
            this.items.push(_.extend({
                stepId: stepId,
                async: false,
                object: item,
                method: method,
                event: Animation.Events.DONE
            }, options));
        };
        Sequencer.prototype.start = function () {
            this.items.sort(function (a, b) {
                var x = a['stepId'];
                var y = b['stepId'];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            this.index = 0;
            this._running = true;
            this.fire(this.current);
        };
        Sequencer.prototype.advance = function () {
            var vars = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                vars[_i - 0] = arguments[_i];
            }
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
        };
        Sequencer.prototype.fire = function (stepObject) {
            var _this = this;
            var object = stepObject.object, method = object[stepObject.method];
            // setup next
            if (stepObject.async) {
                this.advance();
            }
            else {
                object.off(stepObject.event);
                object.on(stepObject.event, function () {
                    _this.advance();
                });
            }
            // execute
            if (stepObject.delay) {
                setTimeout(function () {
                    object[stepObject.method]();
                }, stepObject.delay);
            }
            else {
                object[stepObject.method]();
            }
        };
        Object.defineProperty(Sequencer.prototype, "current", {
            // Getters / Setters
            // ------------------------------------------------------------------
            get: function () {
                return this.items[this.index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sequencer.prototype, "next", {
            get: function () {
                if (this.index == this.items.length - 1) {
                    return false;
                }
                this.index++;
                return this.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sequencer.prototype, "previous", {
            get: function () {
                if (this.index == 0) {
                    return false;
                }
                this.index--;
                return this.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sequencer.prototype, "total", {
            get: function () {
                return this.items.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sequencer.prototype, "isRunning", {
            get: function () {
                return this._running;
            },
            enumerable: true,
            configurable: true
        });
        return Sequencer;
    })(Backbone.EventDispatcher);
    Animation.Sequencer = Sequencer;
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var Type;
    (function (Type) {
        var Base = (function (_super) {
            __extends(Base, _super);
            function Base(options) {
                _super.call(this);
                _.extend(this, options);
            }
            Base.prototype.animateIn = function () {
            };
            Base.prototype.animateOut = function () {
            };
            Object.defineProperty(Base.prototype, "state", {
                // Getters / Setters
                // ----------------------------------------------------
                get: function () {
                    return this._state;
                },
                set: function (state) {
                    this._state = state;
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.setTarget = function ($el) {
                this.$el = $el;
                return this;
            };
            // Event Handlers
            // ----------------------------------------------------
            Base.prototype.onAnimateIn = function () {
                this.state = Animation.Events.IN;
                this.trigger(Animation.Events.DONE);
            };
            Base.prototype.onAnimateOut = function () {
                this.state = Animation.Events.OUT;
                this.trigger(Animation.Events.DONE);
            };
            return Base;
        })(Backbone.EventDispatcher);
        Type.Base = Base;
    })(Type = Animation.Type || (Animation.Type = {}));
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var Type;
    (function (Type) {
        var Fade = (function (_super) {
            __extends(Fade, _super);
            function Fade() {
                _super.apply(this, arguments);
            }
            Fade.prototype.animateIn = function () {
                var _this = this;
                this.$el.animate({
                    opacity: 1
                }, {
                    duration: this.duration,
                    complete: function () {
                        _super.prototype.onAnimateIn.call(_this);
                    }
                }).dequeue();
            };
            Fade.prototype.animateOut = function () {
                var _this = this;
                this.$el.animate({
                    opacity: 0
                }, {
                    duration: this.duration,
                    complete: function () {
                        _super.prototype.onAnimateOut.call(_this);
                    }
                }).dequeue();
            };
            return Fade;
        })(Animation.Type.Base);
        Type.Fade = Fade;
    })(Type = Animation.Type || (Animation.Type = {}));
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var Type;
    (function (Type) {
        var Slide = (function (_super) {
            __extends(Slide, _super);
            function Slide() {
                _super.apply(this, arguments);
            }
            Slide.prototype.animateIn = function () {
                var _this = this;
                this.$el.slideDown({
                    duration: this.duration,
                    complete: function () {
                        _super.prototype.onAnimateIn.call(_this);
                    }
                }).dequeue();
            };
            Slide.prototype.animateOut = function () {
                var _this = this;
                this.$el.slideUp({
                    duration: this.duration,
                    complete: function () {
                        _super.prototype.onAnimateOut.call(_this);
                    }
                }).dequeue();
            };
            return Slide;
        })(Animation.Type.Base);
        Type.Slide = Slide;
    })(Type = Animation.Type || (Animation.Type = {}));
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var Type;
    (function (Type) {
        var Visibility = (function (_super) {
            __extends(Visibility, _super);
            function Visibility() {
                _super.apply(this, arguments);
            }
            Visibility.prototype.animateIn = function () {
                var _this = this;
                this.$el.show();
                setTimeout(function () {
                    _super.prototype.onAnimateIn.call(_this);
                }, 1000);
            };
            Visibility.prototype.animateOut = function () {
                var _this = this;
                this.$el.hide();
                setTimeout(function () {
                    _super.prototype.onAnimateOut.call(_this);
                }, 1000);
            };
            return Visibility;
        })(Animation.Type.Base);
        Type.Visibility = Visibility;
    })(Type = Animation.Type || (Animation.Type = {}));
})(Animation || (Animation = {}));
var Animation;
(function (Animation) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            _super.call(this, options);
            _.extend(this, options);
            this._inSequence = new Animation.Sequencer;
            this._outSequence = new Animation.Sequencer;
            this._inSequence.on(Animation.Events.SEQUENCE_COMPLETE, function () { return _this.onAnimateIn(); });
            this._outSequence.on(Animation.Events.SEQUENCE_COMPLETE, function () { return _this.onAnimateOut(); });
            this.createInSequence();
            this.createOutSequence();
        }
        View.prototype.animateIn = function () {
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
        };
        View.prototype.animateOut = function () {
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
        };
        View.prototype.createInSequence = function (steps) {
            var _this = this;
            steps.forEach(function (step) {
                _this._inSequence.add(step.stepId, step.method, step.object, step.options || {});
            });
        };
        View.prototype.createOutSequence = function (steps) {
            var _this = this;
            steps.forEach(function (step) {
                _this._outSequence.add(step.stepId, step.method, step.object, step.options || {});
            });
        };
        Object.defineProperty(View.prototype, "state", {
            // Getters
            // ------------------------------------------------------------------
            get: function () {
                return this._state;
            },
            set: function (state) {
                this._state = state;
            },
            enumerable: true,
            configurable: true
        });
        // Event Handlers
        // ------------------------------------------------------------------
        View.prototype.onAnimateIn = function () {
            this.state = Animation.Events.IN;
            console.log("Animated in.");
            this.trigger(Animation.Events.DONE);
            this.trigger(Animation.Events.IN);
        };
        View.prototype.onAnimateOut = function () {
            this.state = Animation.Events.OUT;
            console.log("Animated out.");
            this.trigger(Animation.Events.DONE);
            this.trigger(Animation.Events.OUT);
        };
        return View;
    })(Backbone.EventDispatcher);
    Animation.View = View;
})(Animation || (Animation = {}));
var App;
(function (App) {
    var TestAnimationView = (function (_super) {
        __extends(TestAnimationView, _super);
        function TestAnimationView(options) {
            if (options === void 0) { options = {}; }
            _super.call(this, options);
        }
        TestAnimationView.prototype.createInSequence = function () {
            _super.prototype.createInSequence.call(this, [
                {
                    stepId: 0,
                    method: 'animateIn',
                    object: new Animation.Type.Fade({
                        $el: this.$el,
                        duration: 1000
                    }),
                    options: { async: true }
                },
                {
                    stepId: 1,
                    method: 'animateIn',
                    object: new Animation.Type.Slide({
                        $el: this.$el,
                        duration: 1000
                    })
                }
            ]);
        };
        TestAnimationView.prototype.createOutSequence = function () {
            _super.prototype.createOutSequence.call(this, [
                {
                    stepId: 0,
                    method: 'animateOut',
                    object: new Animation.Type.Fade({
                        $el: this.$el,
                        duration: 1000
                    }),
                    options: { async: true }
                },
                {
                    stepId: 1,
                    method: 'animateOut',
                    object: new Animation.Type.Slide({
                        $el: this.$el,
                        duration: 1000
                    })
                }
            ]);
        };
        return TestAnimationView;
    })(Animation.View);
    App.TestAnimationView = TestAnimationView;
})(App || (App = {}));
