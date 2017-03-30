$(window).ready(readyHandler);
function readyHandler() {
    (function(){

        var detailContent = $(".detail_content");
        var detailCover = $(".detail_cover");
        var bannerText = $(".header .home");
        var height;
        setTimeout(function () {
            height = bannerText.css("height");
            bannerText.css("margin-top",-parseInt(height)/2+"px");
        },0);

        var detail = $(".detail p");
        var nav = $(".nav");
        var body = $("body");
        // 手机端的适配
        var w = document.documentElement.clientWidth;
        var html = $("html");
        var fontSize = w/640*36;
        if(w<640){
            html.css("font-size",fontSize+"px");
        }

        //program详情中多余的文字省略
        var maxHeight = 0;
        var text0 = '';
        var text1 = '';
        var text2 = '';
        var text3 = '';
        detail.each(function(j){
            switch(j){
                case 0:text0 = detail.eq(0).text();break;
                case 1:text1 = detail.eq(1).text();break;
                case 2:text2 = detail.eq(2).text();break;
                case 3:text3 = detail.eq(3).text();break;
            }
            var text_str = $(this).text().substring(0,260);
            var arr = text_str.split("");
            var str = "";
            for(var i=0;i<arr.length-1;i++){
                str += arr[i];
            }
            var btn = $("<a href='javascript:;' class='detail_btn'>...&lt;detail&gt;</a>");
            $(this).html(str);
            $(this).append(btn);
            maxHeight = $(this).height()>maxHeight?$(this).height():maxHeight;
        });
        var k=0;
        changeHeight();
        function changeHeight(){
            detail.each(function(j){
              if($(this).height()<maxHeight){
                  var text;
                  switch(j){
                      case 0:text = text0;break;
                      case 1:text = text1;break;
                      case 2:text = text2;break;
                      case 3:text = text3;break;
                  }
                  var text_str = text.substring(0,260+k++);
                  var arr = text_str.split("");
                  var str = "";
                  for(var i=0;i<arr.length-1;i++){
                      str += arr[i];
                  } var btn = $("<a href='javascript:;' class='detail_btn'>...&lt;detail&gt;</a>");
                  $(this).html(str);
                  $(this).append(btn);
                  changeHeight();
              }
              else{
                  return;
              }
            })
        }


        //detail点击阻止页面滚动
        var detailBtn = $(".detail_btn");
        var scrollH;
        detailBtn.each(function(){
            if(!document.documentMode||document.documentMode>7) {
                $(this).on("click", function () {
                    scrollH = document.body.scrollTop || document.documentElement.scrollTop;
                    var h1 = document.body.clientHeight;
                    var h2 = document.body.scrollHeight;
                    var scrollBar = $("<div></div>");
                    var content = $("<div></div>");
                    if (navigator.userAgent.indexOf("Firefox") > -1) {
                        scrollBar.css({
                            'position': 'fixed',
                            'right': 0,
                            "width": '17px',
                            top: 0,
                            bottom: 0,
                            overflowY: 'scroll'
                        });
                    }
                    else {
                        scrollBar.css({
                            'position': 'fixed',
                            'right': 0,
                            "width": '17px',
                            top: 0,
                            bottom: '-17px',
                            overflowY: 'scroll'
                        });
                    }

                    content.css({"height": h1 + 'px', width: '17px'});
                    scrollBar.append(content);
                    body.append(scrollBar);
                    console.log(h1, h2);
                    $(this).parent().next().fadeIn();
                    body.css({"position": "fixed", left: 0, right: "17px", top: -scrollH + 'px'});
                    $(".nav").css("right", "17px");
                    detailCover.on("click", function () {
                        $(this).hide();
                        body.css({"position": "relative", top: 0});
                        $("html,body").animate({"scrollTop": scrollH + 'px'}, 0);
                        $(".nav").css("right", "0");
                        scrollBar.remove();
                    })


                });
            }
            else{
                $(this).on("click", function () {
                    $(this).parent().next().fadeIn();
                    $("body").on("mousewheel",function(e){
                        e.cancelBubble = true;
                        window.event.returnValue = false;
                    })
                });
                detailCover.on("click", function () {
                    $(this).hide();
                    $("body").on("mousewheel",function(e){
                        window.event.returnValue = true;
                    })
                });
            }
        });
        detailContent.on("click",function(e){
            if(e.stopPropagation)
                e.stopPropagation();
            else
                window.event.cancelBubble = true;
        })





























    })()
}