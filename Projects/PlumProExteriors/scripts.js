
$('.up-line').click(function () {
    alert(window.innerWidth);
    // alert(document.documentElement.clientWidth);
});

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

dropdownAnimation();

carouselTextVerticalAlign();
addPlums();
carouselSetHeight();
animatedSandwich();

hideIcons('yelp-link');
hideIcons('google-link');


function hideIcons(className) {
    $('.' + className).addClass('item-disabled');
}

function dropdownAnimation() {
    activeLink();
    var $dropdownMenu = $('.dropdown-menu');
    $('.dropdown').hover(
        function () {
            if (isLgScreen()) {
                $dropdownMenu.removeClass('fadeOut').css('visibility', 'visible').animateCss('fadeIn');
            } else {
                $dropdownMenu.removeClass('fadeIn').removeClass('fadeOut').css('visibility', 'visible');
            }
        },
        function () {
            $dropdownMenu.animateCss('fadeOut', function() {
                $dropdownMenu.css('visibility', 'hidden');
            });
        });
}

//---begin nav menu hover code
function activeLink() {
    $('.dropdown-toggle').click(function() {
        if (isLgScreen()) {
            return location.href = $(this).attr('href');
        }
    });
}
//---end nav menu hover code

//---begin is Screen Large code
function isLgScreen() {
    return window.innerWidth /*$(document).width()*/ > 992;
}
//---end is Screen Large code

//---begin is Screen Small code
function isSmScreen() {
    return window.innerWidth /*$(document).width()*/ > 576;
}
//---end is Screen Small code

//---begin carousel text vertical align code
function carouselTextVerticalAlign() {$(document).ready(function () {
    var $carText = $('.carousel-text');
    var $carParent = $('section.slideshow');

    alignVertical($carText, $carParent);
    $(window).resize( setItem );

    function setItem() {
        alignVertical($carText, $carParent);
    }

    function alignVertical($item, $parent) {
        var mt = ($parent.height() - $item.height()) / 2;
        $item.css('top', mt);
    }
});
}
//---end carousel text vertical align code


//---begin our services add plums code
function addPlums() {
    $('.sub-menu .nav-color, footer .services-link, .parallax-text h1').prepend('<span class="plumicon plum-plum"></span> ');
}
//---end our services add plums code


//---begin carousel set height code
function carouselSetHeight() {
    var $carItem = $('.carousel-item');

    setHeight($carItem, 100);// устанавливаем высоту окна при первой загрузке страницы
    $(window).resize( setCarItem ); // обновляем при изменении размеров окна

    function setCarItem() {
        setHeight($carItem, 100);
    }

    function setHeight($item, percentage) {
        var h = $(window).height() * percentage / 100 + 'px';
        $item.css({
            height: h
        });
    }
}
//---end carousel set height code


//---begin animated sandwich code
function animatedSandwich() {
    $(".sandwich").click(function() {
        $(".sandwich").toggleClass("active");
    });
}
//---end animated sandwich code