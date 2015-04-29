

module Animation.Type {

    export class Slide extends Animation.Type.Base {

        animateIn(): void {
            this.$el.slideDown({
                duration: this.duration,
                complete: () => {
                    super.onAnimateIn();
                }
            }).dequeue();
        }

        animateOut(): void {
            this.$el.slideUp({
                duration: this.duration,
                complete: () => {
                    super.onAnimateOut();
                }
            }).dequeue();
        }

    }

}
