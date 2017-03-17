var hash = "";
var maxPages = 100; //gets updated after first load
var firstLoad = true;
var loading = false;

$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Videos');
    getData();
});

$(window).on('scroll', function () {
    if (!firstLoad) {
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var currentPosition = $(window).scrollTop();

        if (currentPosition > ((documentHeight - windowHeight) - 150)) {
            var innerHash = hash;
            if (!loading) {
                $("#containerInfo").append('<div class="row" id="hash_' + innerHash + '"><div class="col-xs-12 text-center"><i class="fa fa-spinner fa-spin" style="font-size:300%"></i> Loading...</div></div>');
            }
            window.analytics.trackEvent('Videos', 'Videos', 'Load More')
            getData();
        }
    }
}).scroll();


function getData() {
    if (!loading) {
        loading = true;
        var urlAddition = "";
        if (hash != "") {
            urlAddition = "?token=" + hash;
        }
        $.getJSON(
            "https://my.georgiasouthern.edu/mobilegsu/videos/youtube.php"+urlAddition,
            function (data) {
                $.jStorage.set("videos", data);
                $.jStorage.setTTL("videos", 600000);
                generatePage(data);
            }
        );
    }
}
function generatePage(value) {
    var containerData = "";

    containerData += "<div class=\"row\">";
    containerData += "<div class=\"col-xs-12\">";
    var count = 1;
    $.each(value.items, function (key, val) {

        containerData += "<div class=\"media\"><div class=\"media-left\"><a href=\"https://www.youtube.com/watch?v=" + val.snippet.resourceId.videoId + "\"  onclick=\"SysBrowserClick(this\"><img src=\"" + val.snippet.thumbnails.default.url + "\" class=\"media-object\"></a></div><div class=\"media-body\"><h3 class=\"meadia-heading\">" + val.snippet.title + "</h3><p>" + val.snippet.description + "</p><p><a href=\"https://www.youtube.com/watch?v=" + val.snippet.resourceId.videoId + "\"  onclick=\"SysBrowserClick(this)\" class=\"more button pull-right\" role=\"button\">Watch Video</a></p></div><div class=\"clearfix\"></div>";
        containerData += "</div>";
        //if (count != value.items.length) {
            containerData += "<hr />";
        //    count++;
        //}
        

    });
    containerData += "</div>";
    containerData += "</div>";

    if (firstLoad) {
        $("#containerInfo").html(containerData);
        firstLoad = false;
    } else {
        $("#hash_" + hash).addClass("hidden");
        $("#containerInfo").append(containerData);
    }
    hash = value.nextPageToken;
    loading = false;
}