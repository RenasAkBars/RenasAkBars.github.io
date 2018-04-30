
//---begin nav menu hover code
$('.dropdown-toggle').click(function(e) {
    alert($(document).width());
    if ($(document).width() > 992) {
/*        var url = $(this).attr('href');
        if (url !== '#') {
            window.location.href = url;
        }*/
        return false;
    }
});
//---end nav menu hover code



//---begin our services add plums code
$('.sub-menu .nav-color, footer .services-link').prepend('<span class="plumicon plum-plum"></span> ');
//---end our services add plums code



//---begin carousel set height code
var $carItem = $('.carousel-item');

setHeight($carItem, 90);// устанавливаем высоту окна при первой загрузке страницы
$(window).resize( setCarItem ); // обновляем при изменении размеров окна

function setCarItem() {
    setHeight($carItem, 90);
}

function setHeight($item, percentage) {
    var h = $(window).height() * percentage / 100 + 'px';
    $item.css({
        height: h
    });
}
//---begin carousel set height code
