function hideAndShowNav() {
    var nav = $('nav');
    $('body').on('click', '.nav-invisible', function() {
        nav.css({ transform: 'translateX(0)' });
        $('.nav-invisible').addClass('nav-visible').removeClass('nav-invisible');
    }).on('click', '.nav-visible', function() {
        nav.css({ transform: 'translateX(-305px)' });
        $('.nav-visible').addClass('nav-invisible').removeClass('nav-visible');
    });
}

function resizeFix(width) {
    var nav = $('nav');
    width = parseInt(width);
    if (width >= 900) {
        nav.css({ transform: 'translateX(0)' });
    } else if (width < 900) {
        nav.css({ transform: 'translateX(-305px)' });
    }
}

function animateChevron() {
    $('main').on('mouseover', 'span.animateHover', function(event) {
        event.preventDefault();
        $(this).prev().addClass('hvr-pulse');
    }).on('mouseleave', 'span.animateHover', function() {
        event.preventDefault();
        $(this).prev().removeClass('hvr-pulse');
    });
}

$(document).ready(function() {
    $('#main').smoothState({
        onAfter: function($container, $newContent) {
            // allows animation to work through previous links since smoothState prevents unneccessary page loads, i.e. "$(document).ready" does not trigger.
            animateChevron();
            hideAndShowNav();
        }
    });
    animateChevron();
    hideAndShowNav();

    $(function() {
        resizeFix($(this).width());
        $(window).resize(function() {
            resizeFix($(this).width());
        });
    });
});
