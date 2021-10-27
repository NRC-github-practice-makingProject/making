$(function(){
    var container = $('.full-bg');
    var container1 = $('.contact-form');

    $(window).resize(function(){
        var currentWindow = $(this),
            windowWidth = currentWindow.width(),
            windowHeight = currentWindow.height(),
            browserRatio = windowWidth / windowHeight,
            imageRatio = 2240/1260;
            if(imageRatio > browserRatio){
                container1.css({
                    height:'100%',
                    width:windowHeight*imageRatio,
                    left:(windowWidth-windowHeight*imageRatio)/2,
                    top:0,
                    
                });

                container.css({
                    height:'100%',
                    width:windowHeight*imageRatio,
                    left:(windowWidth-windowHeight*imageRatio)/2,
                    top:0,
                });
            }else{
                container1.css({
                    height:windowWidth/imageRatio,
                    width:'100%',
                    left:0,
                    top:(windowHeight-windowWidth/imageRatio)/2,

                });
                container.css({
                    height:windowWidth/imageRatio,
                    width:'100%',
                    left:0,
                    top:(windowHeight-windowWidth/imageRatio)/2,

                });
            }
    });

    $(window).trigger('resize');

});