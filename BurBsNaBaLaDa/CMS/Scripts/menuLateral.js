

$(document).ready(function () {
    var currentMenu = null;
    $('#menuLateral>li').each(function () {
        if ($(this).find('li').length == 0) {
            $(this).addClass('noSubmenu');
        }
    })
    $('#menuLateral>li[class!="noSubmenu"]>a').each(function () {
        if (!$(this).parent().hasClass('menuAtual')) {
            $(this).parent().find('ul:first').hide();
        } else {
            currentMenu = $(this);
        }
        $(this).click(function () {
            $('#menuLateral>li.menuAtual').removeClass('menuAtual');
            if (currentMenu != null && currentMenu.text() != $(this).text()) {
                currentMenu.parent().find('ul:first').slideUp();
            }
            if (currentMenu != null && currentMenu.text() == $(this).text()) {
                currentMenu.parent().find('ul:first').slideUp();
                currentMenu = null;
            } else {
                currentMenu = $(this);
                currentMenu.parent().addClass('menuAtual');
                currentMenu.parent().find('ul:first').slideDown();
            }
            return false;
        });
    });
});
