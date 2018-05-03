var $phFolderIcon = $('.ph-folder-icon');
var $modal = $('#phfolder .modal-body');
var $modalMainWrapper = $('#phfolder');
var $carousel = $('#photoGalleryCarousel');
var $carouselInner = $carousel.find('.carousel-inner-wrapper');

setLogo();
setFolder();
closeSlideShow();

<<<<<<< HEAD
$(document).ready(function(){

    // Находим блок карусели
    var carousel = $("#owlCarousel");

    // Запускаем плагин карусели
    carousel.owlCarousel({
        singleItem: true // Показывать только 1 блок на всю ширину
    });

    // Назад
// При клике на "Назад"
    $('#js-prev').click(function () {

        // Запускаем перемотку влево
        carousel.trigger('owl.prev');

        return false;
    });

// Вперед
// При клике на "Вперед"
    $('#js-next').click(function () {

        // Запускаем перемотку вправо
        carousel.trigger('owl.next');

        return false;
    });

});

function imgHoverZoom() {
    $('.ph-folder-icon-img').wrap('<div class="icon-img-wrapper"></div>').after('<div class="img-mask"><i class="far fa-folder-open img-mask-icon"></i></div>');
    $('.icon-img-wrapper').attr('data-toggle', dataToggle).attr('data-target', dataTarget);

    setMask($phFolderIcon);
}

function setMask($parent) {
    $parent.find('.img-mask').each(function () {
        var $img = $(this).prev('img');
        var imW = $img.width();
        console.log($img.outerWidth(true));
        $(this).css({
            'width': imW,
            'height': imW,
            'line-height': imW
        });
    });
    $parent.find('.icon-img-wrapper').hover(
        function () {
            $(this).find('.img-mask').css('display', 'block');
        },
        function () {
            $(this).find('.img-mask').css('display', 'none');
        }
    )
}


=======
>>>>>>> parent of 047a6a7... 3 May 2018
//задает события для закрытия слайдшоу (карусели) и модального окна (только ESC)
function closeSlideShow() {
    var $btn = $('.close-slideshow');
    $btn.click(function () {
        hideCarousel();
    });
    $(window).keydown(function (event) {
        if (event.which == 27 || event.keyCode == 27){
            if ($carousel.css('display') === 'block') {
                hideCarousel();
            } else {
                $modalMainWrapper.modal('hide');
            }
        }
    });
}

//прячет карусель
function hideCarousel() {
    $carousel.css('display', 'none');
}

//Строит показ слайдов фоток из папки
function setSlideShow($parent) {
    var links = getLinks($parent, 'data-pic-');

    $carouselInner.html('');
    links.forEach(function (link) {
        $carouselInner.append('<div class="carousel-element text-center"><img src="' + link + '"></div>');
        // href="#photoGalleryCarousel" role="button" data-slide="next" class="slideshow-img"
    });


    var $carouselItem = $('.carousel-element');

    $carouselItem.click(function (event) {
        if (event.target === this) {
            hideCarousel();
        }
    });

    $('.ph-icon-img').each(function (index) {
        $(this).click(function () {

            $carouselInner.children('.carousel-element').removeClass('active').eq(index).addClass('active');

            $carousel.css('display', 'block');

            setImg($carouselItem);
        });
    });
}

//настраивает изображение (более высокая функция)
function setImg($carouselItem) {
    $carouselItem.each(function () {
        var $self = $(this);
        var $img = $self.find('.slideshow-img');

        setCarouselHeight($self, $img);
    });
}

//строит папку в модальном окне
function setFolder() {
    $phFolderIcon.children('.ph-folder-icon-img').click(function () {
        var $self = $(this);
        $modal.html('<div class="row modal-inner"></div>');
        var links = getLinks($self.parent(), 'data-pic-mini-');
        var $modalInner = $('.modal-inner');
        links.forEach(function (link) {
            $modalInner.append('<div class="ph-icon col-6 col-sm-4 col-lg-3 my-3"><img class="card-img-top ph-icon-img" src="' + link + '"></div>');
        });
        setSlideShow($self.parent());
    });
}

//Устанавливает выбранную главную картинку на лого папки
function setLogo() {
    $phFolderIcon.each(function () {
        var $self = $(this);
        var logoNum = $self.attr('data-pic-main');
        var logo = $self.attr('data-pic-mini-' + logoNum);
        $self.children('.ph-folder-icon-img').attr('src', logo);
    });
}

//Возращает ссылки на фотографии
function getLinks($holder, prefix) {
    var result = [];
    var counter = 1;

    circle();
    function circle() {
        var link = $holder.attr(prefix + counter);
        result.push(link);
        counter++;
        if ($holder.attr(prefix + counter) && $holder.attr(prefix + counter) !== '') {
            circle();
        }
    }

    return result;
}

//настраивает размер изображения
function setImgSize($wrapper, img) {
    var kW = +$wrapper.width() / +$wrapper.height();
    var kI = +img.get(0).naturalWidth / +img.get(0).naturalHeight;
    if (kI > kW) {
        img.css({
            width: $wrapper.width(),
            height: 'auto'
        });

/*        if (+img.height() > 0) {
            console.log(+img.height());
            var n = (+$wrapper.height() - +img.height()) / 2;
            $('.carousel-inner').css('top', n);
            // $('.close-slideshow').css('top', 0 - n);
/!*            $('.carousel-controller').css('top', n + 'px');
            $('.carousel-controller').css('height', +$wrapper.height() + 'px');*!/
        }*/

    } else if (kI <= kW) {
        img.css({
            width: 'auto',
            height: $wrapper.height()
        });
    }
}

//---begin carousel set height code
function setCarouselHeight($wrapper, img) {

    setHeight($wrapper, 100);// устанавливаем высоту окна при первой загрузке страницы
    setImgSize($wrapper, img);
    $(window).resize( setCarItem ); // обновляем при изменении размеров окна

    function setCarItem() {
        setHeight($wrapper, 100);
        setImgSize($wrapper, img);
    }

    function setHeight($item, percentage) {
        var h = $(window).height() * percentage / 100 + 'px';
        $item.css({
            height: h
        });
    }
}
//---end carousel set height code