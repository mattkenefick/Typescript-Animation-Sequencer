

module Animation.Type {

    export class Fade extends Animation.Type.Base {

        animateIn(): void {
            this.$el.animate({
                opacity: 1
            }, {
                duration: this.duration,
                complete: () => {
                    super.onAnimateIn();
                }
            }).dequeue();
        }

        animateOut(): void {
            this.$el.animate({
                opacity: 0
            }, {
                duration: this.duration,
                complete: () => {
                    super.onAnimateOut();
                }
            }).dequeue();
        }

    }

}
