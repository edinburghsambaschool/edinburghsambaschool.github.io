
var clientId = '276818858717-02uamao72okroji8p967b9gce8ldeuol.apps.googleusercontent.com'; //choose web app client Id, redirect URI and Javascript origin set to http://localhost
var apiKey = 'AIzaSyAg-HKJJYoF-BRbaCjdI63JsQbG5VA-JW4';
var userEmail = "c43urrkppf83iuu1at3la970ag@group.calendar.google.com";
var userTimeZone = "London";
var maxRows = 6;

var scopes = 'https://www.googleapis.com/auth/calendar';

function padNum(num) {
    if (num <= 9) {
        return "0" + num;
    }
    return num;
}

function monthString(num) {
    if (num === "01") {
        return "Jan";
    } else if (num === "02") {
        return "Feb";
    } else if (num === "03") {
        return "Mar";
    } else if (num === "04") {
        return "Apr";
    } else if (num === "05") {
        return "May";
    } else if (num === "06") {
        return "Jun";
    } else if (num === "07") {
        return "Jul";
    } else if (num === "08") {
        return "Aug";
    } else if (num === "09") {
        return "Sep";
    } else if (num === "10") {
        return "Oct";
    } else if (num === "11") {
        return "Nov";
    } else if (num === "12") {
        return "Dec";
    }
}

function dayString(num) {
    if (num == "1") {
        return "Mon";
    } else if (num == "2") {
        return "Tues";
    } else if (num == "3") {
        return "Wed";
    } else if (num == "4") {
        return "Thu";
    } else if (num == "5") {
        return "Fri";
    } else if (num == "6") {
        return "Sat";
    } else if (num == "0") {
        return "Sun";
    }
}

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    checkAuth();
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if (authResult) {
        makeApiCall();
    }
}

function makeApiCall() {
    var today = new Date(); //today date
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': userEmail,
            'timeZone': userTimeZone,
            'singleEvents': true,
            'timeMin': today.toISOString(), //gathers only events not happened yet
            'maxResults': maxRows,
            'orderBy': 'startTime'
        });
        request.execute(function(resp) {
            for (var i = 0; i < resp.items.length; i++) {
                var li = document.createElement('li');
                var item = resp.items[i];
                var classes = [];
                var allDay = item.start.date ? true : false;
                var startDT = allDay ? item.start.date : item.start.dateTime;
                var dateTime = startDT.split("T"); //split date from time
                var date = dateTime[0].split("-"); //split yyyy mm dd
                var startYear = date[0];
                var startMonth = monthString(date[1]);
                var startDay = date[2];
                var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
                var startDayWeek = dayString(startDateISO.getDay());
                if (allDay === true) { //change this to match your needs
                    var str = [
                        '<h5>',
                        startMonth, ' ',
                        startDay, ' ',
                        startYear, ' (',
                        startDayWeek, '): ', item.summary, '</h5><hr>'
                    ];
                } else {
                    var time = dateTime[1].split(":"); //split hh ss etc...
                    var startHour = time[0];
                    var startMin = time[1];
                    var str = [
                        '<h5>',
                        startMonth, ' ',
                        startDay, ' ',
                        startYear, ' (',
                        startDayWeek, ') ',
                        startHour, ':', startMin, ': <span>'+item.summary+'</span>', '</h5><hr>'
                    ];
                }
                li.innerHTML = str.join('');
                li.setAttribute('class', classes.join(' '));
                document.getElementById('eventlist').appendChild(li);
            }
            document.getElementById('eventlist').className = 'loaded';
        });
    });
}
