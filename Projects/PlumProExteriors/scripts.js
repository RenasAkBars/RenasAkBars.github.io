
$('.up-line').click(function () {
    alert($(document).width());
});

//---begin nav menu hover code
$('.dropdown-toggle').click(function(e) {
    if ($(document).width() > 992) {
/*        var url = $(this).attr('href');
        if (url !== '#') {
            window.location.href = url;
        }*/
        return location.href = $(this).attr('href');
        // return false;
    }
});
//---end nav menu hover code


//---begin carousel text vertical align code
$(document).ready(function () {
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
//---end carousel text vertical align code


//---begin our services add plums code
$('.sub-menu .nav-color, footer .services-link, .parallax-text h1').prepend('<span class="plumicon plum-plum"></span> ');
//---end our services add plums code


//---begin carousel set height code
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
//---end carousel set height code


//---begin animated sandwich code
$(".sandwich").click(function() {
    $(".sandwich").toggleClass("active");
});
//---end animated sandwich code