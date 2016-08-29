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
        $('.nav-visible').addClass('nav-invisible').removeClass('nav-visible');
        nav.css({ transform: 'translateX(-305px)' });
    }
}

function animateChevron() {
    $('body').on('mouseover', 'span.animateHover', function(event) {
        event.preventDefault();
        $(this).prev().addClass('hvr-pulse');
    }).on('mouseleave', 'span.animateHover', function() {
        event.preventDefault();
        $(this).prev().removeClass('hvr-pulse');
    });
}

function loadGists(){
    var $gists = $('.blog-post').find('script[src^="https://gist.github.com/"]');

    // if gist embeds are found
    if( $gists.length ){

        // update each gist
        $gists.each(function(){

            // we need to store $this for the callback
            var $this = $(this);

            // load gist as json instead with a jsonp request
            $.getJSON( $this.attr('src') + 'on?callback=?', function( data ) {

                // replace script with gist html
                $this.replaceWith( $( data.div ) );

                // load the stylesheet, but only once…
                add_stylesheet_once( data.stylesheet )

            });

        });

    }
}

function add_stylesheet_once( url ){
    $head = $('head');
    if( $head.find('link[rel="stylesheet"][href="'+url+'"]').length < 1 )
        $head.append('<link rel="stylesheet" href="'+ url +'" type="text/css" />');
}

$(document).ready(function() {
    $('#main').smoothState({
        // prefetch: true,
        // cacheLength: 2,
        onAfter: function($container, $newContent) {
            // allows animation to work through previous links since smoothState 
            // prevents unneccessary page loads, i.e. "$(document).ready" does not trigger.
            loadGists();
            animateChevron();
            hideAndShowNav();
            $(function() {
                resizeFix($(this).width());
                $(window).resize(function() {
                    resizeFix($(this).width());
                });
            });
        },
        blacklist: ['.blog-post']
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
