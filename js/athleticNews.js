$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-63721202-1');
    window.ga.trackView('Athletics Sport Specific');
    var hash = 0;
    if(!window.location.hash) {
        $( "#containerInfo" ).append("<div class=\"row\"><div class=\"col-xs-12\"><div class=\"alert alert-danger\">Missing Sport ID.</div></div></div>");
    } else {
        hash = window.location.hash.substring(1);
        var value = $.jStorage.get("athletic_"+hash);
        if(!value){
            getData(hash);
        }else{
            generatePage(value);
        }
    }

    
});

function getData(hash){
    if(hash === null || hash === undefined){
        hash = window.location.hash.substring(1);
    }
    
    var offset = new Date().getTimezoneOffset();
    
    $.getJSON( 
        "https://mydevl.georgiasouthern.edu/mobilegsu/athletics/sports.php?sportID=" + hash + "&offset=" + offset,
        function ( data ){
            $.jStorage.set("athletic_"+hash,data);
            $.jStorage.setTTL("athletic_"+hash, 600000);
            generatePage(data);
        }
    );
}


function generatePage(value) {
    var containerData = "<div class=\"container-fluid\" id=\"header\"><div class=\"row\"><div class=\"col-xs-12\"><h1 class=\"center-block\">"+value.title+"</h1></div></div>";
        
    if (window.analytics != undefined) {
        window.analytics.trackEvent('Athletics', 'View Sport', value.title);
    }
    count = 0;
    $.each(value.itemsData, function (key, val) {
        
        containerData += "<div class=\"row\"><div class=\"col-xs-12 calendar-item\">";
        containerData += "<h3 class=\"goldText pull-left event-date\">" + val.formattedDate + " @ " + val.time + "</h3> <div class=\"clearfix\"></div>";
        containerData += "<h3 class=\"blueText event-title\">" + val.title + "</h3>";
        containerData += "<p class=\"event-summary\">";
        if (val.links_livestats != "") {
            containerData += "<a href=\"" + val.links_livestats + "\" onclick=\"inAppBrowserClick(this)\" class=\"more button pull-left\" role=\"button\" data-external-link=\"yes\">View Livestats <span class=\"glyphicon glyphicon-chevron-right f11\"></span></a>";
        }
        containerData += " <a href=\"" + val.link + "\" onclick=\"inAppBrowserClick(this)\" class=\"more button pull-right\" role=\"button\" data-external-link=\"yes\">View Article <span class=\"glyphicon glyphicon-chevron-right f11\"></span></a></p>";
        containerData += "</div></div>";
        
        if (count != value.length) {
            containerData += "<hr />";
            count++;
        }
    });
    /*
        var showLogo = ((val.opponentLogo !== null && val.opponentLogo.length > 0));
        containerData += "<div class=\"row\">\n";
        containerData += "<div class=\"col-xs-12\">\n";
        containerData += "<table style=\"width:100%\"><tbody><tr>\n";
        var rowWidth = 1;
        if (showLogo) {
            rowWidth = 3;
        }
        if (showLogo && (val.outcome !== null && val.outcome != 'N')) {
            rowWidth = 2;
        }
        containerData += "<td><p class=\"blueText slightlyLarger\">" + val.date + "<br /><small>" + val.time + "<br /> " + val.location + "</small></p></td>";
        containerData += "<td colspan=\"" + rowWidth + "\"><h3 class=\"blueText\">" + val.title + "</h3></td>";
        if (val.outcome !== null && val.outcome != 'N') {
            val.outcome = (val.outcome == 'W') ? 'WIN' : 'LOSS';
            containerData += "<td><h4 class=\"goldText\">" + val.outcome + "</h4><span class=\"blueText\">"+val.score+ "</span></td>";
        }
        containerData += "</tr>\n";
        if(showLogo){
            containerData += "<tr><td></td><td><img src=\"" + val.teamLogo + "\" style=\"max-width:100px;\" class=\"img-responsive\" alt=\"Georgia Southern Logo\"></td><td><img src=\"" + val.opponentLogo + "\" style=\"max-width:100px;\" alt=\"Opponent Logo\" class=\"img-responsive\"></td><td></td></tr>\n";
        }
        
        containerData += "</tbody></table>\n";
        containerData += "</div>\n";
        containerData += "</div>\n";
        containerData += "<hr />";

    });
    */
     $("#containerInfo" ).html(containerData)
}