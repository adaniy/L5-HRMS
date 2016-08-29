/**
 * Created by kanak on 1/6/16.
 */

$('#datepicker4').on('change', function () {
    var date_from = $('#datepicker1').val();
    var new_date_from = new Date(date_from);
    var date_to = $('#datepicker4').val();
    var new_date_to = new Date(date_to);
    if(date_from > date_to)
    {
        alert('From Date cannot be greater than To Date');
        $('#datepicker4').val('');
    }
    else {
        var timeDiff = Math.abs(new_date_to.getTime() - new_date_from.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


        if (diffDays == 0) {
            var time_from = date_from + ' ' + $('#timepicker1').val() + ':00';
            var time_to = date_to + ' ' + $('#timepicker4').val() + ':00';

            var diff = moment.duration(moment(time_to).diff(moment(time_from)));
            diff = diff / 3600 / 1000;
            if (diff <= 5) {
                $('#total_days').val('Half day leave');
            }
            else if (diff > 5) {
                $('#total_days').val('Full day leave');
            }
        }
        else {
            if (diffDays > 1) {
                $('#total_days').val(toWords(diffDays) + 'days leave');
            }
            else {
                $('#total_days').val(toWords(diffDays) + 'day leave');
            }
        }
    }
});

$('#datepicker1').on('change', function () {
    var date_from = $('#datepicker1').val();
    var new_date_from = new Date(date_from);
    var date_to = $('#datepicker4').val();
    var new_date_to = new Date(date_to);
    var timeDiff = Math.abs(new_date_to.getTime() - new_date_from.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    /*if(date_from > date_to)
     {
     alert('From Date cannot be greater than To Date');
     }

     else {*/
    if (diffDays == 0) {
        var time_from = date_from + ' ' + $('#timepicker1').val() + ':00';
        var time_to = date_to + ' ' + $('#timepicker4').val() + ':00';

        var diff = moment.duration(moment(time_to).diff(moment(time_from)));
        diff = diff / 3600 / 1000;
        if (diff <= 5) {
            $('#total_days').val('Half day leave');
        }
        else if (diff > 5) {
            $('#total_days').val('Full day leave');
        }
    }
    else {
        if (diffDays > 1) {
            $('#total_days').val(toWords(diffDays) + 'days leave');
        }
        else {
            $('#total_days').val(toWords(diffDays) + 'day leave');
        }
    }
    //}
});

$('#timepicker4').on('change', function () {
    var date_from = $('#datepicker1').val();
    var new_date_from = new Date(date_from);
    var date_to = $('#datepicker4').val();
    var new_date_to = new Date(date_to);
    var timeDiff = Math.abs(new_date_to.getTime() - new_date_from.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays == 0) {
        var time_from = date_from + ' ' + $('#timepicker1').val() + ':00';
        var time_to = date_to + ' ' + $('#timepicker4').val() + ':00';

        var diff = moment.duration(moment(time_to).diff(moment(time_from)));
        diff = diff / 3600 / 1000;
        if (diff <= 5) {
            $('#total_days').val('Half day leave');
        }
        else if (diff > 5) {
            $('#total_days').val('Full day leave');
        }
    }
    else {
        if (diffDays > 1) {
            $('#total_days').val(toWords(diffDays) + 'days leave');
        }
        else {
            $('#total_days').val(toWords(diffDays) + 'day leave');
        }
    }
});


// Convert numbers to words
// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code (including this copyright notice) is
// used exactly as shown (you can change the numbering system if you wish)

// American Numbering System
var th = ['', 'thousand', 'million', 'billion', 'trillion'];
// uncomment this line for English Number System
// var th = ['','thousand','million', 'milliard','billion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function toWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'Please select both days ';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}


$(document).on('change', '.leave_type', function()
{
    var leaveTypeId = $('.leave_type').val();
    var token = $('#token').val();
    var userId = $('#user_id').val();
        $.post('/get-leave-count', {'leaveTypeId': leaveTypeId, '_token' : token, 'userId': userId}, function(data)
        {
            parsed = JSON.parse(data);
            $('#show-leave-count').empty();
            var html = "<div class=' col-md-5 alert alert-dark center-block '>Leaves &nbsp Remaining : "+parsed+"</div>";
            $('#show-leave-count').append(html);

        });

});

$('#approveClick').click(function()
{
    var leaveId = $(this).data('id');
    console.log(leaveId);
    var token = $('#token').val();

    $.post('/approve-leave', {'leaveId': leaveId, '_token' : token}, function(data)
    {
        parsed = JSON.parse(data);
        if(parsed === 'success')
        {
            $('#modal-header').attr('class', 'modal-header modal-header-success');
            $('.modal-title').append('Success');
            $('.modal-body').append('Leave approved');
            $('#notification-modal').modal('show');
        }
    });

});

$('#disapproveClick').click(function()
{

    var leaveId = $(this).data('id');
    console.log(leaveId);
    var token =$('#token').val();

    $.post('/disapprove-leave', {'leaveId': leaveId, '_token' : token}, function(data)
    {

        parsed =JSON.parse(data);
        if(parsed === 'success')
        {
            $('#modal-header').attr('class', 'modal-header modal-header-success');
            $('.modal-title').append('Success');
            $('.modal-body').append('Leave disapproved');
            $('#notification-modal').modal('show');
        }
    });

});

$('#passwordForm').submit(function(event)
{
    event.preventDefault();
    var old_password = $('#old_password').val();
    var new_password = $('#new_password').val();
    var confirm_password = $('#confirm_password').val();

    if(new_password != confirm_password)
    {
        alert('New password and confirm password does not match');
        return false;
    }
    document.getElementById("passwordForm").submit();

});

$('#create-event').click(function()
{
    $('#status-section').removeClass('hidden');
    var name = $('#event_name').val();
    var coordinator = $('#event_cordinater').val();
    var attendees = $('#event_attendees').val();
    var date = $('#date_time').val();
    var message = $('#event_description').val();
    var token = $('#token').val();

    $.post('create-event', {'name' : name, 'coordinator' : coordinator, 'attendees' : attendees, 'date' : date, 'message' : message, '_token' : token}, function(data)
    {
        $('#status-section').addClass('hidden');
        $('#message-section').removeClass('hidden');
        var parsed = JSON.parse(data);

        if(parsed === 'success')
        {
            alert(parsed);
        }
    });

});

/*
var number = 10;

function doStuff() {
    number = number +10;
    $('.progress-bar').attr('aria-valuenow', number).css('width',number);
}*/
