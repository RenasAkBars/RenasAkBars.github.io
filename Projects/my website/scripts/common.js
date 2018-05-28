
var $body = $('body');
var $navMenu = $('.top-nav-menu');
var $brandLogo = $('.brand-logo');
var $modal = $('.modal');
var $modalBodyContainer = $modal.find('.modal-body-container');
var $modalBody = $modal.find('.modal-body');

setSwitchMenu();
setBrandLogo();
setModal();

function setSwitchMenu() {
    $('.sandwich').click(function () {
        toggleMenu();
    }).mouseenter(function () {
        var $self = $(this);
        if (!$self.hasClass('active')) {
            $self.find('.sw').toggleClass('sw-topper').toggleClass('sw-footer');
        }
    });

    $body.click(function (e) {
        var target = $(e.target);
        if (target.parents('.nav-menu-list').length === 0
            && $('.nav-menu ul').hasClass('active')
            && !target.hasClass('sandwich')
            && target.parents('.sandwich').length === 0) {
            toggleMenu();
        }
    });

    function toggleMenu() {
        $('.nav-menu ul').toggleClass('active');
        $('.sandwich').toggleClass('active');
    }
}

function setBrandLogo() {
    $brandLogo.click(function () {
        alert('Width: ' + window.innerWidth + '; Height: ' + $(window).height());
        return false;
    });

    $brandLogo.mouseenter(function () {
        $(this).animateCss('tada');
    });
}


function setModal() {
    $('.portfolio-preview-thumbnail').click(function () {
        var scrollWidth = window.innerWidth - $body.get(0).clientWidth;
        $modal.css({'display': 'flex'}).animateCss('fadeIn', function () {
            $modalBody.css({'display': 'block'}).animateCss('slideInUp');
        });
        $body.css({'overflow': 'hidden', 'margin-right': scrollWidth + 'px'});
        $navMenu.css({'left': '-' + scrollWidth / 2 + 'px'});
    });

    $modalBodyContainer.click(function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    $modal.find('.close').click(function () {
       closeModal();
    });

    function closeModal() {
        $modal.animateCss('fadeOut', function () {
            $modalBody.css({'display': 'none'});
            $modal.css({'display': 'none'});
            $body.css({'overflow': 'auto', 'margin-right': 0});
            $navMenu.css({'left': 0});
        });
    }
}
