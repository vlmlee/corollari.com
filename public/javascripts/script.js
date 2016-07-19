$(document).ready(function() {
    $('#main').smoothState({
        onAfter: function($container, $newContent) {
            // allows animation to work through previous links since smoothState prevents unneccessary page loads.
            $('span.animateHover').mouseover(function(event) {
                event.preventDefault();
                $(this).prev().addClass('hvr-pulse');
            }).mouseleave(function() {
                event.preventDefault();
                $(this).prev().removeClass('hvr-pulse');
            });
        }
    });

    // loads AJAX events on refresh
    $('span.animateHover').mouseover(function(event) {
        event.preventDefault();
        $(this).prev().addClass('hvr-pulse');
    }).mouseleave(function() {
        event.preventDefault();
        $(this).prev().removeClass('hvr-pulse');
    });
});
