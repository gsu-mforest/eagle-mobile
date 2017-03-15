$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Events');
    var value = $.jStorage.get("calendar");
    if(!value){
        getData();
    }else{
        generatePage(value);
    }
    
});
function getData(){
    $.getJSON( 
        "https://my.georgiasouthern.edu/mobilegsu/calendar.php",
        function ( data ){
            $.jStorage.set("calendar",data);
            $.jStorage.setTTL("calendar", 600000);
            generatePage(data);
        }
    );
}

function generatePage(value) {
    var containerData = "";
    var count = 1;
    $.each( value, function( key, val ) {
        if(val.GetResponse.ResponseCode > 0){
            containerData += "<div class=\"row\">";
            containerData += "<div class=\"alert alert-danger\">Error Loading Content. Please try again later.</div>";
            containerData += "</div>";
            $.jStorage.delete("calendar");
            return false;
        }
        var summary = val.Summary;
        if(summary.length > 250){
            summary = summary.substring(0,250)+"...";
        }

        var titleDate = val.Title.replace('  ', ' ').split(' ');
        var i = 0;
        var eventDate = "";
        while (titleDate[i] != '-' && i <= titleDate.length) {
            eventDate += titleDate[i] + " ";
            i++;
        }

        var title = val.Title.split('-');
        title.splice(0, 1);
        
        containerData += "<div class=\"row\"><div class=\"col-xs-12 calendar-item\">";
        containerData += "<h3 class=\"goldText pull-left event-date\">" + eventDate + "</h3> <div class=\"clearfix\"></div>";
        containerData += "<h3 class=\"blueText event-title\">" + title.join('-') + "</h3>";
        containerData += "<p class=\"event-summary\">" + summary + "</p> <a href=\"" + val.Link + "\" onclick=\"inAppBrowserClick(this)\" class=\"more button pull-right\">More Info <span class=\"glyphicon glyphicon-chevron-right f11\"></span></a></p>";
        containerData += "</div></div>";
        if(count != value.length){
            containerData += "<hr />";
            count++;
        }
    });
    $("#containerInfo" ).html(containerData)
}