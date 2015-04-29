
# Typescript Animation Sequencer

HTML5 is now like Flash. Scenes exist. They need to animate in and animate out.
Most people sloppily throw the animation methods together, like:

    $('.whatever').animate({
        opacity: 1,
        marginRight: 20px
    }, 1000, function() {
        $(this).find('.element').hide();
        $(this).find('.element').fadeIn();

        $('.whatever').animate({
            opacity: 0,
            marginRight: 0px
        }, 1000, function() {
            $(this).find('.element').hide();
            $(this).find('.element').fadeIn();
            // ...
        });
    });

That is garbage. Animations for particular scenes should be broken out separately,
sort of like Transformers in PHP. You have a dog, give it a backyard. Don't try
to squeeze it into your apartment. You have unlimited space. Separate the animation
from your views and do it right/clean.