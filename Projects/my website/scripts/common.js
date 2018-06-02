class Modal {
    constructor(modalSelector,) {
        this.$modal = $(modalSelector);
        this.idSelector = '#' + this.$modal.attr('id');
        this.activity = false;
        this.$modalBodyContainer = this.$modal.find('.modal-body-container');
        this.$modalBody = this.$modal.find('.modal-body');
        this.$modalContentContainer = this.$modal.find('.modal-content-container');
        this.$close = this.$modal.find('.close');
        this.$btn = this.$modal.find('.btn');
        this.$btnBack = this.$modal.find('.btn-back');
        this.$btnForward = this.$modal.find('.btn-forward');
        this.$navMenu = $('.top-nav-menu');
        this.$body = $('body');
        this.scrollWidth = window.innerWidth - this.$body.get(0).clientWidth;
        this.$btnForward.css('right', this.scrollWidth + 'px');
    }
    activateStandartEvents() {
        this.closeModal();
    }
    deactivateModal() {
        var self = this;
        this.$modal.animateCss('fadeOut', function () {
            self.$modalBody.removeClass('active');
            self.$modal.removeClass('active');
            self.$body.removeClass('modal-open').css({'margin-right': 0});
            self.$navMenu.css({'left': 0});
        });
    }
    closeModal() {
        var self = this;
        this.$modalBodyContainer.click(function (e) {
            if (e.target === this) {
                self.deactivateModal();
                self.historyBack();
            }
        });
        this.$modal.click(function (e) {
            if (e.target === this) {
                self.deactivateModal();
                self.historyBack();
            }
        });
        this.$close.click(function () {
            self.deactivateModal();
            self.historyBack();
        });
        $(window).keydown(function (e) {
            if (e.which == 27 || e.keyCode == 27){
                if (self.$modal.hasClass('active')) {
                    self.deactivateModal();
                    self.historyBack();
                }
            }
        });
        $(window).on('hashchange', function () {
            if (self.$modal.hasClass('active') && location.hash !== self.idSelector) {
                self.deactivateModal();
            }
        });
    }
    historyBack() {
        // history.pushState('', null, 'http://localhost:63342/RenasAkBars.github.io/Projects/my%20website/index.html?_ijt=uo73jqpsk7l2c6mjhtqprb00t6');

        // console.log(history.state);
        history.back();
    }
    setContent(content) {
        this.$modalContentContainer.html(content);
    }
    openAnimation() {
        var self = this;
        this.$modal.addClass('active').animateCss('fadeIn', function () {
            self.$modalBody.addClass('active').animateCss('slideInUp');
        });
        this.$body.addClass('modal-open').css({'margin-right': this.scrollWidth + 'px'});
        this.$navMenu.css({'left': '-' + this.scrollWidth / 2 + 'px'});
        this.activity = true;
    }
}
class ModalPortfolioPreview extends Modal {
    constructor (modalSelector, launchersSelector) {
        super(modalSelector);
        this.launchersSelector = launchersSelector;
        this.$launchers = $(launchersSelector);
        this.launchersLength = this.$launchers.length;
        this.number = 0;

    }
    activate() {
        this.activateStandartEvents();
        this.openFromLauncher();
        this.activateButtons();
    }
    openFromLauncher() {
        var self = this;
        this.$launchers.click(function () {
            self.setSpecialContent($(this));
            self.openAnimation();
            location.hash = self.idSelector;
        });
    }
    activateButtons() {
        var self = this;
        this.$btn.click(function () {
            var $self = $(this);
            var boolean = $self.hasClass('btn-back');
            self.modalChanger(boolean);
        });
        $(window).keydown(function (e) {
            if (e.which == 37 || e.keyCode == 37){
                self.modalChanger(true);
            } else if (e.which == 39 || e.keyCode == 39){
                self.modalChanger(false);
            } else if (e.which == 40 || e.keyCode == 40){
                self.$modal.get(0).scrollTop += 60;
            } else if (e.which == 38 || e.keyCode == 38){
                self.$modal.get(0).scrollTop -= 60;
            }
        });
    }
    activateSwipe(pixels) {
        var self = this;

        self.$modalBody.on('touchstart', function (e) {
            var shiftX = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
            var shiftY = e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
            var zeroLeft = 0;
            var newLeft;
            var direction;

            $(document).on('touchmove', function (e) {
                var x = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
                var y = e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
                direction = Math.abs(shiftX - x) >= Math.abs(shiftY - y);

                if (direction) {
                    newLeft = x - shiftX;
                    self.$modalBody.css('left', newLeft + 'px');
                }
            }).on('touchend', function () {
                if (direction) {
                    if (newLeft > pixels) {
                        self.modalChanger(true);
                    } else if (newLeft < -pixels) {
                        self.modalChanger(false);
                    } else {
                        self.$modalBody.css('left', zeroLeft + 'px');
                    }
                } else {
                    self.$modalBody.css('left', zeroLeft + 'px');
                }
                $(this).off('touchmove touchend');
            });
        }).on('dragstart', function() {return false;});
    }
    modalChanger(boolean) {
        var self = this;
        var anim = 'fade';
        var animOut, animIn;

        var num = self.number;

        if (boolean) {
            num--;
            animOut = anim + 'OutRight';
            animIn = anim + 'InLeft';
            if (num <= 0) {
                num = self.launchersLength;
            }
        } else if (!boolean) {
            num++;
            animOut = anim + 'OutLeft';
            animIn = anim + 'InRight';
            if (num >= self.launchersLength + 1) {
                num = 1;
            }
        }
        if (num < 1 || num > self.launchersLength) {
            return false;
        }
        self.$modalBody.animateCss(animOut, function () {
            self.setSpecialContent(self.$launchers.filter(self.launchersSelector + '[data-number="' + num + '"]'));
            self.$modalBody.css('left', '0').animateCss(animIn);
        });
    }
    setSpecialContent($launcher) {

        var img = $launcher.attr('data-img');
        var category = $launcher.attr('data-category');
        var linkInner = $launcher.attr('data-link-inner');
        var name = $launcher.attr('data-name');
        var caption = $launcher.attr('data-caption');
        var text = $launcher.attr('data-text');
        var linkOuter = $launcher.attr('data-link-outer');
        var linkOuterName = $launcher.attr('data-link-outer-name');
        var date = $launcher.attr('data-date');
        var number = $launcher.attr('data-number');

        var content = '<img src="' + img + '">' +
            '<div class="modal-content">' +
            '<h6>' + category + '</h6>' +
            '<a class="title-link link link-inner" href="' + linkInner + '">' +
            '<h4>' + name + '</h4></a>' +
            '<h5>' + caption + '</h5>' +
            '<div class="text">' + text + '</div>' +
            '<a class="link td-none link-outer" target="_blank" href="' + linkOuter + '">' + linkOuterName + '</a>' +
            '<div class="modal-footer"><span class="time">' + date + '</span>' +
            '<a class="link link-inner" href="' + linkInner + '">Подробнее</a></div></div>';

        this.$modalBody.attr('data-number', number);
        this.number = number;
        this.setContent(content);
    }
}
class Menu {
    constructor(selector) {
        this.$topNavMenu = $(selector);
        this.$brandLogo = this.$topNavMenu.find('.brand-logo');
        this.$navMenuUl = this.$topNavMenu.find('.nav-menu ul');
        this.$sandwich = this.$topNavMenu.find('.sandwich');
        this.$body = $('body');
    }
    toggleMenu() {
        this.$navMenuUl.toggleClass('active');
        this.$sandwich.toggleClass('active');
    }
    activateToggler() {
        var self = this;
        this.$sandwich.click(function () {
            self.toggleMenu();
        }).mouseenter(function () {
            var $self = $(this);
            if (!$self.hasClass('active')) {
                $self.find('.sw').toggleClass('sw-topper').toggleClass('sw-footer');
            }
        });
    }
    activateBodyOff() {
        var self = this;
        this.$body.click(function (e) {
            var target = $(e.target);
            if (target.parents('.nav-menu-list').length === 0
                && self.$navMenuUl.hasClass('active')
                && !target.hasClass('sandwich')
                && target.parents('.sandwich').length === 0) {
                self.toggleMenu();
            }
        });
    }
    brandLogoAnimation() {
        this.$brandLogo.mouseenter(function () {
            $(this).animateCss('tada');
        });
    }
    test() {
        this.$brandLogo.click(function () {
            alert('Width: ' + window.innerWidth + '; Height: ' + $(window).height());
            return false;
        });
    }
    activate() {
        this.activateToggler();
        this.activateBodyOff();
        this.brandLogoAnimation();
    }
}


var $body = $('body');
var modalPortfolioPreview = new ModalPortfolioPreview('.modal', '.portfolio-preview-thumbnail');
var topNavMenu = new Menu('.top-nav-menu');

modalPortfolioPreview.activate();
modalPortfolioPreview.activateSwipe(60);
topNavMenu.activate();
topNavMenu.test();

/*
$(window).on('popstate', function () {
    alert('history!');
});
*/

