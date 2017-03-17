document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Home Screen');
    document.addEventListener("backbutton", onBackKeyDown, false);
    var connectionData = checkConnection();
    if (connectionData[0] == Connection.NONE || connectionData[0] == Connection.UNKNOWN) {
        bootbox.alert("Network Connection not detected or is currently in an unknown status. The app may not perform correctly.");
    }
    //loadLandingData("guests");
}


function loadLandingData(viewLayout) {
    $.getJSON("https://mydevl.georgiasouthern.edu:3000/mobilegsu/layout.php", function (data) {
        var landingData = data[viewLayout];
        var rowIndex = 1;
        var lengthOfLayout = Object.keys(landingData).length;
        var pageData = "";
        while (rowIndex <= lengthOfLayout) {
            pageData += "<div class=\"row noMargin text-center\">";
            $.each(landingData[rowIndex], function (index, value) {
                var linkClass = "";
                var imageClass = "";
                if (value.linkClass != undefined) {
                    linkClass = value.linkClass;
                }
                if (value.imageClass != undefined) {
                    imageClass = value.imageClass;
                }
                var onClickAction = "";
                if (!value.internal) {
                    onClickAction = " onclick=\"inAppBrowserClick(this)\" ";
                }

                pageData += "<div class=\"col-xs-4\">";
                pageData += "<a href=\"" + value.location + "\" "+onClickAction+" class=\"" + linkClass + "\"><img src=\""+value.image+"\" class=\"" + imageClass + "\"></a>";
                pageData += "</div>";

            });
            pageData += "</div>";
            rowIndex++;
        }
        $("#landingContainer").html(pageData);

    });
}


function onBackKeyDown() {
    bootbox.dialog({
        message: "Are you sure you want to exit EagleMobile?",
        title: "Exit EagleMobile",
        buttons: {
            success: {
                label: "Yes",
                className: "btn-success",
                callback: function () {
                    navigator.app.exitApp();
                }
            },
            danger: {
                label: "No",
                className: "btn-danger",
                callback: function () {
                    
                }
            }
        }
    });
}

