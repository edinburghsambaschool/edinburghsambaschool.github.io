/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

window.onload = function() {
    newsInit();
};

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// News feed from GSheets


var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=1NXcyCNbpH2jMQF9orlS1xVlDg0cCC5Q4UUqriut_Uqc&output=html';

function newsInit() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true
    });
}

function showInfo(data, tabletop) {
    $.each(data, function(i, e) {
        newsObj = $('<li><article></article></li>');
        art = newsObj.find('article');
        if (e.URL) {
            art.append('<h5><a href="' + e.URL + '" target="_blank">' + e.Title + '</a> <i class="fa fa-external-link"></i></h5>');
        } else {
            art.append('<h5>' + e.Title + '</h5>');
        }
        art.append('<p>' + e.Description + '</p>');
        if (e.Date) {
            art.append('<date>' + e.Date + '</date>');
        }
        newsObj.append('<hr>');
        $('#news ul.news').addClass('loaded').append(newsObj);
    });
}
