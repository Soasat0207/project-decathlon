function showMenuLanguages() {
    document.querySelector('.nav-changelanguages-dropdown-menu').setAttribute("style", "display:flex");
}

function disableMenuLanguages() {
    document.querySelector('.nav-changelanguages-dropdown-menu').setAttribute("style", "display:none");
}
document.querySelector('.nav-changelanguages-dropdown-toggle').addEventListener('click', () => {
    //  check style
    if (document.querySelector('.nav-changelanguages-dropdown-menu').style.display == "" || document.querySelector('.nav-changelanguages-dropdown-menu').style.display == "none") {
        showMenuLanguages();
    } else {
        disableMenuLanguages();
    }
})

$(function () {
    // Configuration
    // Add options
    i18n.init({
        resGetPath: 'js/languages/__lng__.json',
        debug: true,
        fallbackLng: false,
        load: 'unspecific'
    }, function () {
        $('body').i18n();
    });
    // English
    if (i18n.lng() === "en") {
        // Set active class
        $('.language-switch .nav-changelanguages-dropdown-menu li').removeClass('active');
        $('.english').parent().addClass('active');
        // Change language in dropdown
        $('.language-switch-current').html("English ");
    }
    // Vietnam
    if (i18n.lng() === "vi") {
        // Set active class
        $('.language-switch .nav-changelanguages-dropdown-menu li').removeClass('active');
        $('.vietnam').parent().addClass('active');
        // Change language in dropdown
        $('.language-switch-current').html("Việt Nam ");
    }

    // Change languages when click
    // English
    $('.english').on('click', function () {
        // Set language
        $.i18n.setLng('en', function () {
            $('body').i18n();
        });
        // Set active class
        $('.language-switch .nav-changelanguages-dropdown-menu li').removeClass('active');
        $('.english').parent().addClass('active');
        // Change name language in dropdown
        $('.language-switch-current').html("English");
        disableMenuLanguages();
    });
    // Vietnam
    $('.vietnam').on('click', function () {
        // Set language
        $.i18n.setLng('vi', function () {
            $('body').i18n();
        });
        // Set active class
        $('.language-switch .nav-changelanguages-dropdown-menu li').removeClass('active');
        $('.vietnam').parent().addClass('active');
        // Change name language in dropdown
        $('.language-switch-current').html("Việt Nam");
        disableMenuLanguages();
    });
});