$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('News');
    var value = $.jStorage.get("news");
    if(!value){
        getData();
    }else{
        generatePage(value);
    }
    
});

function getData(){
    $.getJSON( 
        "https://my.georgiasouthern.edu/mobilegsu/news.php", 
        function ( data ){
            $.jStorage.set("news",data);
            $.jStorage.setTTL("news", 600000);
            generatePage(data);
        }
    );
}


function generatePage(value) {
    var containerData = "";
    containerData += "<div class=\"row\">";
    containerData += "<div class=\"col-xs-12\">";
    var count = 1;
    $.each(value.posts, function (key, val) {
        if (val.thumbnail == undefined) {
            val.thumbnail = "http://news.georgiasouthern.edu/wp-content/themes/news/gs-274.jpg";
        }
        containerData += "<div class=\"news\"><div class=\"\"></div><div class=\"\"><h3 class=\"news-heading\">" + val.title + "</h3><p><img src=\"" + val.thumbnail + "\" class=\"news-thumb img-responsive alignleft\">" + val.excerpt + "<a href=\"" + val.url + "\"  onclick=\"inAppBrowserClick(this)\" class=\"more button pull-right\" role=\"button\" data-external-link=\"yes\" >Read Article <span class=\"glyphicon glyphicon-chevron-right f11\"></span></a></p></div><div class=\"clearfix\"></div>";
        containerData += "</div>";
        if (count != value.posts.length) {
            containerData += "<hr />";
            count++;
        }
        
            
    });
    containerData += "</div>";
    containerData += "</div>";
    $("#containerInfo" ).html(containerData)
}
