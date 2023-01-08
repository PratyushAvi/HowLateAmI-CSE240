const oneday_ms = 1000 * 3600 * 24;
const oneday_s = 3600 * 24;
const MST_OFFSET = -1 * 7 * 3600 * 1000;
let deadline;

let options = {
    // timeZone: 'America/Phoenix',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // timeZoneName: 'short'
},
    formatter = new Intl.DateTimeFormat([], options);



document.addEventListener('DOMContentLoaded', function () {
    // console.log(formatter.format(new Date()));
    let date = getURLTime();
    document.getElementById('date').value = date;
    deadline = new Date(date).getTime();    
    setInterval(
        function () { calculateLateValues(deadline) }, 1000);
});

function setDefault() {
    document.getElementById('due-calc-total').innerText = "😱"
    document.getElementById('due-calc-0').innerText = "😱"
    document.getElementById('due-calc-10').innerText = "😱"
    document.getElementById('due-calc-20').innerText = "😱"
    document.getElementById('due-calc-50').innerText = "😱"
    document.getElementById('due-calc-100').innerText = "😱"
}

function newDateTime() {
    // console.log(document.getElementById('date').value);
    document.getElementById('copy-button').innerHTML = 'Copy Link';
    var date = document.getElementById('date').value;
    if (date == "")
        deadline = -1;
    else
        deadline = new Date(date).getTime();
}

function calculateLateValues(duedate) {
    const dt = new Date();
    const mst_now = dt.getTime() + dt.getTimezoneOffset() * 60 * 1000 + MST_OFFSET;

    document.getElementById('local-time').innerText = formatter.format(new Date(mst_now));
    if (duedate == -1) {
        setDefault();
        return;
    }
    let delta = (duedate - mst_now) / 1000;
    let output_string = "";
    if (delta < 0) {
        output_string = "Due date passed."
    }

    else {
        let days = Math.floor(delta / oneday_s);
        delta -= days * oneday_s;
        let hours = Math.floor(delta / 3600);
        delta -= hours * 3600;
        let minutes = Math.floor(delta / 60);
        let seconds = Math.floor(delta - minutes * 60);
        if (days > 0)
            output_string += days + "d";
        if (days > 0 || hours > 0)
            output_string += " " + hours + "hr";
        if (hours > 0 || minutes > 0)
            output_string += " " + minutes + "min";
        if (minutes > 0 || seconds > 0)
            output_string += " " + seconds + "sec";
    }

    document.getElementById('due-calc-total').innerHTML = output_string;

    let loss_0 = duedate + oneday_ms;
    let loss_10 = duedate + oneday_ms * 4;
    let loss_20 = duedate + oneday_ms * 7;
    let loss_50 = duedate + oneday_ms * 10;
    let loss_100 = loss_50 + 1000;

    document.getElementById('due-calc-0').innerText = formatter.format(new Date(loss_0));
    document.getElementById('due-calc-10').innerText = formatter.format(new Date(loss_10));
    document.getElementById('due-calc-20').innerText = formatter.format(new Date(loss_20));
    document.getElementById('due-calc-50').innerText = formatter.format(new Date(loss_50));
    document.getElementById('due-calc-100').innerText = formatter.format(new Date(loss_100));

}

function getURLTime()
{
    const url = window.location.search;
    let date = "";
    if (url)
    {
        const params = new URLSearchParams(url);
        try {
            date = params.get('t');
            const test = new Date(date);
            console.log(test);
            return date;
        } catch (error) {
            console.log("Invalid url parameter", params.get('t'));
        }
    }
    return getDefaultTime();
}

function getDefaultTime(t)
{
    const x = new Date();
    const val = x.toISOString().split('T')[0];
    return val + 'T23:59:59';
}

function generateLink()
{
    let url = window.location.href.split("?")[0];
    if (deadline != -1)
    {
        const x = new Date(deadline);
        url += "?t=" + x.toISOString().split('.')[0];
    }
    navigator.clipboard.writeText(url);
    document.getElementById('copy-button').innerHTML = 'Copied!';
}