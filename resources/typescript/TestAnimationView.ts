

module App {

    export class TestAnimationView extends Animation.View {

        constructor(options = {}) {
            super(options);
        }

        createInSequence(): void {
            super.createInSequence([
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
        }

        createOutSequence(): void {
            super.createOutSequence([
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
        }

    }

}