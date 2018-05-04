
setTabs0rPills($('#reviewTab'));

//---begin is Screen Small code
function isSmScreen() {
    return window.innerWidth /*$(document).width()*/ > 768;
}
//---end is Screen Small code

function setTabs0rPills($element) {
    setType();
    $(window).resize( setCarItem ); // обновляем при изменении размеров окна

    function setCarItem() {
        setType();
    }
    function setType() {
        if (!isSmScreen()) {
            $element.removeClass('nav-tabs').addClass('nav-pills');
        } else {

            $element.removeClass('nav-pills').addClass('nav-tabs');
        }
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

