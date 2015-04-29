

module Animation.Type {

    export class Visibility extends Animation.Type.Base {

        animateIn(): void {
            this.$el.show();

            setTimeout( () => {
                super.onAnimateIn();
            }, 1000);
        }

        animateOut(): void {
            this.$el.hide();

            setTimeout( () => {
                super.onAnimateOut();
            }, 1000);
        }

    }

}
