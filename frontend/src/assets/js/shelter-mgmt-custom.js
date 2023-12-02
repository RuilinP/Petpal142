// Custom Script for datepicker & selectpicker

$('input[name="datepicker"]').daterangepicker(
    {
        format: 'YYYY-MM-DD',
        startDate: '2013-01-01',
        endDate: '2013-12-31'
    },
);

$('input[name="adopt-datepicker"]').daterangepicker(
    {
        format: 'YYYY-MM-DD',
        startDate: '2013-01-01',
        endDate: '2013-12-31'
    },
);

$(document).ready(function(){
    $('.selectpicker').selectpicker();
});



// Pagination Script 

var currentPage = 1;
var totalPages = 3;

function changePage(page) {
    if (page === 'prev') {
        currentPage = Math.max(1, currentPage - 1);
    } else if (page === 'next') {
        currentPage = Math.min(totalPages, currentPage + 1);
    } else {
        currentPage = page;
    }
    $('.animal-page').hide();
    $('.animal-page[data-page="' + currentPage + '"]').show();
    
    // Update pagination controls
    $('#previous-page').toggleClass('disabled', currentPage === 1);
    $('#next-page').toggleClass('disabled', currentPage === totalPages);
    $('.pagination .page-item').removeClass('active');
    $('.pagination .page-item a').filter(function() {
        return $(this).text() == currentPage;
    }).parent().addClass('active');
}


