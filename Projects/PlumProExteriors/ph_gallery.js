var $phFolderIcon = $('.ph-folder-icon');
var $modal = $('#phfolder .modal-body');
var $modalMainWrapper = $('#phfolder');
var $carousel = $('#photoGalleryCarousel');
var $carouselInner = $carousel.find('.carousel-inner-wrapper');

setLogo();
setFolder();
closeSlideShow();

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

    $('.ph-icon-img').each(function (index) {
        $(this).click(function () {
            // alert(index);
            $carouselInner.html('');
            links.forEach(function (link) {
                $carouselInner.append('<div class="carousel-item text-center"><img href="#photoGalleryCarousel" role="button" data-slide="next" class="slideshow-img" src="' + link + '"></div>');
            });
            $carouselInner.children('.carousel-item').eq(index).addClass('active');
            var $carouselItem = $('.carousel-item');
            setCarouselHeight($carouselItem, $('.slideshow-img'));
            $carousel.css('display', 'block');

            $carouselItem.click(function (event) {
                if (event.target === this) {
                    hideCarousel();
                }
            });
        });
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

function setImgSize($wrapper, img) {
    var kW = +$wrapper.width() / +$wrapper.height();
    var kI = +img.width() / +img.height();
    if (kI > kW) {
        img.css({
            width: $wrapper.width(),
            height: 'auto'
        });
    } else {
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