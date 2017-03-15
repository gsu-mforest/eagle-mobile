function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    
    return [networkState, states[networkState]];
}

function inAppBrowserClick(data) {

    
    var href = $(data).attr("href");
    if (window.analytics != undefined) {
        window.analytics.trackEvent('Outbound Link', 'Clicked', href);
    }
    event.preventDefault(); // don't open the link yet
    window.open(href,"_blank", "location=yes,toolbar=yes,closebuttoncaption=Back"); // ...and open the link as usual
    
}

function SysBrowserClick(data) {


    var href = $(data).attr("href");
    if (window.analytics != undefined) {
        window.analytics.trackEvent('Outbound Link', 'Clicked', href);
    }
    event.preventDefault(); // don't open the link yet
    window.open(href, "_system", "location=yes,toolbar=yes,closebuttoncaption=Back"); // ...and open the link as usual

}

//jQuery time
