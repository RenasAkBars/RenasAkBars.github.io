
var $body = $('body');
var $navMenu = $('.top-nav-menu');

$('.sandwich').click(function () {
    $('.nav-menu ul').toggleClass('active');
    $(this).toggleClass('active');
}).mouseenter(function () {
    var $self = $(this);
    if (!$self.hasClass('active')) {
        $self.find('.sw').toggleClass('sw-topper').toggleClass('sw-footer');
    }
});

var $brandLogo = $('.brand-logo');

$brandLogo.click(function () {
    alert('Width: ' + window.innerWidth + '; Height: ' + $(window).height());
    return false;
});

$brandLogo.mouseenter(function () {
    $(this).animateCss('tada');
});

var $modal = $('.modal');
var $modalBody = $modal.find('.modal-body');


$('.portfolio-preview-thumbnail').click(function () {
    var scrollWidth = window.innerWidth - $body.get(0).clientWidth;
    $modal.css({'display': 'flex'}).animateCss('fadeIn', function () {
        $modalBody.css({'display': 'block'}).animateCss('slideInUp');
    });
    $body.css({'overflow': 'hidden', 'margin-right': scrollWidth + 'px'});
    $navMenu.css({'left': '-' + scrollWidth / 2 + 'px'});
});

$modal.click(function (e) {
    if (e.target === this) {
        closeModal();
    }
});

function closeModal() {
    $modal.animateCss('fadeOut', function () {
        $modalBody.css({'display': 'none'});
        $modal.css({'display': 'none'});
        $body.css({'overflow': 'auto', 'margin-right': 0});
        $navMenu.css({'left': 0});
    });
}