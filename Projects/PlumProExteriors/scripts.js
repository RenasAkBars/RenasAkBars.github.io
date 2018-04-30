
$('.dropdown-toggle').click(function(e) {
    if ($(document).width() > 992) {
/*        var url = $(this).attr('href');
        if (url !== '#') {
            window.location.href = url;
        }*/
        return false;
    }
});

$('.sub-menu .nav-color, footer .services-link').prepend('<span class="plumicon plum-plum"></span> ');

