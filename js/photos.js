var hash = 0;
var maxPages = 100; //gets updated after first load
var firstLoad = true;
var loading = false;
$(document).on('deviceready', function () {
    window.ga.startTrackerWithId('UA-13220452-37');
    window.ga.trackView('Photos');
    getData();
});

$(window).on('scroll', function () {
    if (!firstLoad) {
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var currentPosition = $(window).scrollTop();
        
        if (currentPosition > ((documentHeight - windowHeight) - 150)) {
            var innerHash = hash + 1;
            if (!loading) {
                $("#containerInfo").append('<div class="row" id="hash_' + innerHash + '"><div class="col-xs-12 text-center"><i class="fa fa-spinner fa-spin" style="font-size:300%"></i> Loading...</div></div>');
            }
            getData();
        }
    }
}).scroll();


function getData() {
    if (!loading) {
        loading = true;
        hash++;
        $.getJSON(
            "https://my.georgiasouthern.edu/mobilegsu/photos/photos.php?update&page=" + hash,
            function (data) {
                generatePage(data);
            }
        );
    }
    
}


function generatePage(value) {
    var containerData = "";
    if(firstLoad){
        containerData = "<div class=\"row\"><div class=\"col-xs-12 text-center\"><h3 class=\"text-center blueText\">Photo Gallery</h3></div></div>";
    }
    
    maxPages = value.settings.pages;
    var i = 1;
    containerData += "<div class=\"row\">";
    $.each(value.photos, function (key, val) {
        containerData += "<div class=\"col-xs-4 smallPadding\">";
            containerData += "<a onclick=\"openImage('" + val.modal + "')\"><img src=\"" + val.thumbnail + "\" style=\"width:100%;\"></a>";
        containerData += "</div>";

        if (i == 3) {
            containerData += "</div>";
            containerData += "<div class=\"row\">";
            i = 1;
        }
              

    });
    containerData += "</div>";
    if (firstLoad) {
        $("#containerInfo").html(containerData);
        firstLoad = false;
    } else {
        $("#hash_"+hash).addClass("hidden");
        $("#containerInfo").append(containerData);
    }
    loading = false;
}

function openImage(url) {
    
    bootbox.dialog({
        title: "Preview Image",
        message: '<img src="'+url+'" width="100%"/>'
    });

}