$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Athletics');
    var value = $.jStorage.get("sportsLanding");
    if(!value){
        getData();
    }else{
        generatePage(value);
    }
    
});
function getData(){
    $.getJSON( 
        "https://my.georgiasouthern.edu/mobilegsu/athletics/sportsLanding.php",
        function ( data ){
            $.jStorage.set("sportsLanding",data);
            $.jStorage.setTTL("sportsLanding", 600000);
            generatePage(data);
        }
    );
}


function generatePage(value) {
    var containerData = "";
    containerData += "<div class=\"row\"><div class=\"col-xs-12\">";

    $.each(value, function (gender, sport) {
        containerData += "<h3 class=\"goldText\">"+gender+"</h3>";
        $.each(sport, function (key, val) {
            containerData += "<p class=\"slightlyLarger indented\"><a href=\"athleticNews.html#" + key + "\">" + val.name + "  > </a></p>";
        });
    });

    
    $("#containerInfo" ).html(containerData)
}