$(function(){
    $('#feedbackDenybtn').on('click', function(event) {
        if(event.button == 0) {
            event.preventDefault();
            hideFeedback();
        }
    });
});

function showFeedback(message, type, duration = null) {
    let widget = $('#feedback');
    let messageElement = $('#feedbackMessage');

    widget.css('display', 'block');
    messageElement.text(message);

    widget.removeClass('alert-success alert-danger alert-info');
    if (type === 'success') {
        widget.addClass('alert-success');
    } else if (type === 'error') {
        widget.addClass('alert-danger');
    } else if (type === 'info') {
        widget.addClass('alert-info');
    }

    if (typeof duration === 'number' && duration > 0) {
        setTimeout(() => {
            widget.fadeOut();
        }, duration * 1000);
    }
}

function hideFeedback() {
    $('#feedback').css('display', 'none');
}