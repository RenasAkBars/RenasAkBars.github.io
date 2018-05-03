
$('.up-line').click(function () {
    alert(window.innerWidth);
    // alert(document.documentElement.clientWidth);
});

dropdownAnimation();

carouselTextVerticalAlign();
addPlums();
carouselSetHeight();
animatedSandwich();

function dropdownAnimation() {
    activeLink();
    var $dropdownMenu = $('.dropdown-menu');
    $('.dropdown').hover(
        function () {
            if (isLgScreen()) {
                $dropdownMenu.css('visibility', 'visible').removeClass('fadeOut').addClass('fadeIn');
            } else {
                $dropdownMenu.removeClass('fadeIn');
            }
        },
        function () {
            $dropdownMenu.addClass('fadeOut');
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