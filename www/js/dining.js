$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Dining');
    var value = $.jStorage.get("diningLanding");
    if(!value){
        getData();
    }else{
        generatePage(value);
    }

});
function getData(){
    $.getJSON( 
        "https://my.georgiasouthern.edu/mobilegsu/dining/diningLanding.php",
        function ( data ){
            $.jStorage.set("diningLanding",data);
            $.jStorage.setTTL("diningLanding", 600000);
            generatePage(data);
        }
    );
}


function generatePage(value) {
    var keys = [];
    for(var k in value){
        keys.push(k);  
    }
    
    var tabContent = "<div class=\"row\"><div class=\"col-xs-12\"><div role=\"tabpanel\"><ul class=\"nav nav-tabs\" role=\"tablist\" id=\"diningTabs\">";
    var z = 0;
    $.each( keys, function( key, val ) {
        var activeClass = "";
        if(z == 0){
            activeClass = " active ";
            z++;
        }
        tabContent += "<li role=\"presentation\" class=\""+activeClass+"\"><a href=\"#"+val+"\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">"+val+"</a></li>";
    });
    tabContent += "</ul><div class=\"tab-content\">";
    var i = 0;

    $.each( value, function( key, val ) {
        var active = "";
        if(i == 0){
            i++;
            active = " active ";
        }
        tabContent += "<div role=\"tabpanel\" class=\"tab-pane "+active+"\" id=\""+key+"\">";
        tabContent += "<div class=\"row\"><div class=\"col-xs-12\">";
        tabContent += "<p class=\"pull-right blueText\"><small>Today's Hours</small></p>";
        tabContent += "<p class=\"clearfix\"></p>";
        
        $.each( val, function( key1, restaurant ) {
            tabContent += "<p class=\"pull-left slightlyLarger\">" + restaurant.Name + "</p><p class=\"pull-right goldText\">" + restaurant.hours.Today + "</p><span class=\"clearfix\"></span><p>" + restaurant.Address + "</p>";
        });
        tabContent += "</div></div></div>";
    });
    $( "#containerInfo" ).html(tabContent);
}