$(window).ready(readyHandler);
function readyHandler() {
    (function () {
        var nav_a = $(".header .nav .nav_box .right a");
        var item = $(".item");
        var program = $(".program");
        var each_program = $(".all_programs .each");
        var timer;
        var login = $(".login .a1");
        var sign_up = $(".login .a2");
        var login_box = $(".login_box");
        var sign_box = $(".sign_box");
        var header = login_box.parent();
        var close1 = $(".header .login_box .close");
        var close2 = $(".header .sign_box .close");
        var login_form = $("#login_form");
        var sign_form = $("#sign_form");
        var reset_form = $("#reset_form");
        var l_userName = login_form.find('input[name="l_username"]');
        var l_password = login_form.find('input[name="l_password"]');
        var l_code = login_form.find('input[name="l_code"]');
        var r_email = reset_form.find('input[name="r_email"]');
        var r_code = reset_form.find('input[name="r_code"]');
        var r_password1 = reset_form.find('input[name="r_password"]');
        var r_password2 = reset_form.find('input[name="r_password_again"]');
        var s_userName = sign_form.find('input[name="s_username"]');
        var s_email = sign_form.find('input[name="s_email"]');
        var s_password1 = sign_form.find('input[name="s_password"]');
        var s_password2 = sign_form.find('input[name="s_password_again"]');
        var s_code = sign_form.find('input[name="s_code"]');
        var feedback = $(".login_box,.sign_box").find(".feedback");
        var input = feedback.prev().find("input[type='text'],input[type='password']");
        var message_form = $("#message_form");
        var m_name = message_form.find("input[name='name']");
        var m_lastname = message_form.find("input[name='lastName']");
        var m_interest = message_form.find("input[name='interest']");
        var m_location = message_form.find("input[name='location']");
        var m_email = message_form.find("input[name='email']");
        var m_message = message_form.find("textarea[name='message']");
        var return_info = message_form.find(".return_info");
        var getCode = $("#get_code,#get_code_reset");
        var signBtn = $(".sign_btn");
        var resetBtn = $(".reset_btn");
        var Login = $("#login");
        var Sign = $("#sign");
        var Reset = $("#reset_password");
        var serv = $(".service .content .box .serv");
        var faqContent = $(".FAQ .content");
        // 手机端的适配
        var w = document.documentElement.clientWidth;
        var html = $("html");
        var fontSize = w/640*36;
        if(w<640){
            html.css("font-size",fontSize+"px");
        }


        //----------------------------------------------------------

        //banner 中的文字居中

        //----------------------------------------------------------
        var bannerText = $(".header .home");
        var height = bannerText.css("height");
        bannerText.css("margin-top",-parseInt(height)/2);




        //----------------------------------------------------------

        // 页面滚动时banner图的动态以及导航栏的变化

        //----------------------------------------------------------
        $(window).on("scroll",function (event) {
            var h = $(window).scrollTop();
            $(".banner img").css("margin-top",h/2+"px");
            item.each(function (i) {
                if(h+400>$(this).position().top){
                    nav_a.each(function () {
                        $(this).removeClass("active");
                    });
                    nav_a.eq(i).addClass("active");
                }
            })
        });

        //----------------------------------------------------------

        //导航栏点击的动作

        //----------------------------------------------------------
        nav_a.each(function (i) {
            $(this).on("click",function () {
                nav_a.each(function () {
                    $(this).removeClass("active");
                });
                $(this).addClass("active");
                $("html,body").animate({"scrollTop":item.eq(i).position().top-79},1000) ;
            })
        });

        //----------------------------------------------------------

        //programs hover 的效果

        //----------------------------------------------------------
            each_program.each(function () {
                $(this).hover(
                    function () {
                        clearTimeout(timer);
                        var _this = $(this);
                        timer = setTimeout(function () {
                            _this.find(".detail").fadeIn();
                        },200)
                    },
                    function () {
                        clearTimeout(timer);
                        var _this = $(this);
                        setTimeout(function () {
                            _this.find(".detail").fadeOut();
                        },250)

                    }
                );
            });

        //----------------------------------------------------------

        //登陆时异步获取信息

        //----------------------------------------------------------
        l_userName.on("keyup",function(){
            // $.ajax({
            //     type:"post",
            //     url:"127.0.0.1:8888/login.html",
            //     data:l_userName.val(),
            //     success:function(data){
            //         console.log(data);
            //     }
            // })
            var xhr = new XMLHttpRequest();
            xhr.open("post","http://127.0.0.1:8888/public/login.html");
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4&&xhr.status==200){
                    console.log(xhr.responseText);
                }
            };
            xhr.send(l_userName.val());
        });




        //----------------------------------------------------------

        //点击登陆效果

        //----------------------------------------------------------
        login.on("click",function () {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                window.location = "login.html";
            }
            else{
                login_box.css("z-index",1000);
                if(parseInt(header.css('width'))<650){
                    login_box.animate({opacity:"0.96",width:"96%",height:'13.6rem',marginTop:"-6.8rem",marginLeft:"-48%"});
                }
                else{
                    login_box.animate({opacity:"0.96",width:"600px",height:'346px',marginTop:"-173px",marginLeft:"-300px"});
                }
                clickHandler2();
            }

        });
        sign_up.on("click",function () {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                window.location = "login.html#sign";
            }
            else{
                sign_box.css("z-index",1000);
                if(parseInt(header.css('width'))<650){
                    sign_box.animate({opacity:"0.96",width:"96%",height:'20rem',marginTop:"-9rem",marginLeft:"-48%"});
                }
                else{
                    sign_box.animate({opacity:"0.96",width:"600px",height:'450px',marginTop:"-225px",marginLeft:"-300px"});
                }
                clickHandler1();
            }

        });

        //----------------------------------------------------------

        //关闭登录注册框

        //----------------------------------------------------------
        close1.on("click",clickHandler1);
        close2.on("click",clickHandler2);
        function clickHandler1(){
            login_box.animate({opacity:"0",width:"100px",height:'100px',marginTop:"-50px",marginLeft:"-50px"},function(){
                $(this).css({"z-index":-99999});
            });
            feedback.each(function () {  // 关闭登录框后清空反馈信息
                $(this).html("");
            });
            input.each(function () {
                $(this).val("");
                if(!isPlaceholder()){
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    s.val(pValue).addClass("placeholder");
                }
            })
        }
        function clickHandler2(){
            sign_box.animate({opacity:"0",width:"100px",height:'100px',marginTop:"-50px",marginLeft:"-50px"},function(){
                $(this).css({"z-index":-99999});
            });
            feedback.each(function () {
                $(this).html("");
            });
            input.each(function () {
                $(this).val("");
                if(!isPlaceholder()){
                    var s = $(this);
                    var pValue = s.attr("placeholder");
                    var sValue = s.val();
                    s.val(pValue).addClass("placeholder");
                }
            })
        }
        //判断是否支持placeholder
        function isPlaceholder() {
            var input = document.createElement('input');
            return "placeholder" in input;
        }
        //---------------------------------------------------------

        //登陆、注册、修改密码客户端验证

        //---------------------------------------------------------
        login_form.submit(submitHandler1);
        sign_form.submit(submitHandler2);
        reset_form.submit(submitHandler4);


        function submitHandler1() {
            if(!$.trim(l_userName.val())||(l_userName.attr("class")&&l_userName.attr("class").indexOf('placeholder')!=-1)){
                l_userName.parent().next().html("Please input your name!");
                l_userName.focus();
                return false;
            }
            else{
                l_userName.parent().next().html("");
            }
            if(!$.trim(l_password.val())||(l_password.attr("class")&&l_password.attr("class").indexOf('placeholder')!=-1)){
                l_password.parent().next().html("Please input your password!");
                l_password.focus();
                return false;
            }
            else{
                l_password.parent().next().html("");
            }
            if(!$.trim(l_code.val())||(l_code.attr("class")&&l_code.attr("class").indexOf('placeholder')!=-1)){
                l_code.parent().next().html("Please input the verification code!");
                l_code.focus();
                return false;
            }
            else{
                l_code.parent().next().html("");
            }
        }
        function submitHandler2() {
            if(!$.trim(s_userName.val())||(s_userName.attr("class")&&s_userName.attr("class").indexOf('placeholder')!=-1)){
                s_userName.parent().next().html("Please input your name!");
                s_userName.focus();
                return false;
            }
            else{
                s_userName.parent().next().html("");
            }
            if(!$.trim(s_email.val())||(s_email.attr("class")&&s_email.attr("class").indexOf('placeholder')!=-1)){
                s_email.parent().next().html("Please input your Email!");
                s_email.focus();
                return false;
            }
            else{
                s_email.parent().next().html("");
            }
            if(!$.trim(s_code.val())||(s_code.attr("class")&&s_code.attr("class").indexOf('placeholder')!=-1)){
                s_code.parent().next().html("Please input the verification code!");
                s_code.focus();
                return false;
            }
            else{
                s_code.parent().next().html("");
            }
            if(!$.trim(s_password1.val())||(s_password1.attr("class")&&s_password1.attr("class").indexOf('placeholder')!=-1)){
                s_password1.parent().next().html("Please input your password!");
                s_password1.focus();
                return false;
            }
            else{
                s_password1.parent().next().html("");
            }
            if(!$.trim(s_password2.val())||(s_password2.attr("class")&&s_password2.attr("class").indexOf('placeholder')!=-1)){
                s_password2.parent().next().html("Please input your password again!");
                s_password2.focus();
                return false;
            }
            else{
                s_password2.parent().next().html("");
            }
            if(s_password1.val()!=s_password2.val()){
                s_password2.parent().next().html("Warning:two passwords are not the same!");
                s_password2.focus();
                return false;
            }
        }
        function submitHandler4() {
            if(!$.trim(r_email.val())||(r_email.attr("class")&&r_email.attr("class").indexOf('placeholder')!=-1)){
                r_email.parent().next().html("Please input your Email!");
                r_email.focus();
                return false;
            }
            else{
                r_email.parent().next().html("");
            }
            if(!$.trim(r_code.val())||(r_code.attr("class")&&l_password.attr("class").indexOf('placeholder')!=-1)){
                r_code.parent().next().html("Please input the verification code!");
                r_code.focus();
                return false;
            }
            else{
                r_code.parent().next().html("");
            }
            if(!$.trim(r_password1.val())||(r_password1.attr("class")&&r_password1.attr("class").indexOf('placeholder')!=-1)){
                r_password1.parent().next().html("Please input your password!");
                r_password1.focus();
                return false;
            }
            else{
                r_password1.parent().next().html("");
            }
            if(!$.trim(r_password2.val())||(r_password2.attr("class")&&r_password2.attr("class").indexOf('placeholder')!=-1)){
                r_password2.parent().next().html("Please input your password again!");
                r_password2.focus();
                return false;
            }
            else{
                r_password2.parent().next().html("");
            }
            if(r_password1.val()!=r_password2.val()){
                r_password2.parent().next().html("Warning:two passwords are not the same!");
                r_password2.focus();
                return false;
            }
        }

        // 点击获取邮箱验证码
        getCode.each(function(){
           $(this).click(function(){
               var email = $(this).parent().parent().prev().prev().find("input").val();
               if(reg(email)){
                   $(this).attr("disabled","disabled");
                   $(this).css("background","#ccc");
                   var that = this;
                   var i = 60;
                   var timer = setInterval(function(){
                       i--;
                       $(that).val("Try again in "+i+"s");
                       if(i==0){
                           clearInterval(timer);
                           $(that).removeAttr("disabled");
                           $(that).val("Get Verification Code");
                           $(that).css("background","#fff");
                       }
                   },1000);
               }
               else
                   alert("Please enter the correct email address!")
           })
        });

        //邮箱验证
        function reg(str){
            return (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str);
        }

        //点击注册切换到注册框
        signBtn.click(function(){
            Login.animate({"left":"-100%"});
            Sign.animate({"left":"0"},1000,'easeOutBounce');
        });
        //点击忘记密码切换
        resetBtn.click(function(){
            Login.animate({"top":"100%"});
            Reset.animate({"top":0},1000,'easeOutBounce');
        });






        //------------------------------------------------

        //contact us 表单的验证

        //------------------------------------------------
        message_form.submit(submitHandler3);
        function submitHandler3() {
            if(!$.trim(m_name.val())){
                return_info.html("Please input your name!");
                m_name.focus();
                return false;
            }
            else{
                return_info.html("");
            }
            if(!$.trim(m_lastname.val())){
                return_info.html("Please input your lastName!");
                m_lastname.focus();
                return false;
            }
            else{
                return_info.html("");
            }
            if(!$.trim(m_email.val())){
                return_info.html("Please input your Email!");
                m_email.focus();
                return false;
            }
            else{
                return_info.html("");
            }

            if(!$.trim(m_interest.val())){
                return_info.html("Please input your area of interest!");
                m_interest.focus();
                return false;
            }
            else{
                return_info.html("");
            }
            if(!$.trim(m_location.val())||(m_location.attr("class")&&m_location.attr("class").indexOf('placeholder')!=-1)){
                return_info.html("Please input your current location!");
                m_location.focus();
                return false;
            }
            else{
                return_info.html("");
            }
            if(!$.trim(m_message.val())||(m_message.attr("class")&&m_message.attr("class").indexOf('placeholder')!=-1)){
                return_info.html("Please input the message!");
                m_message.focus();
                return false;
            }
            else{
                return_info.html("");
                alert("OK");

            }
        }
        //---------------------------------------------------

        //首页的加载动画效果

        //---------------------------------------------------
        item.eq(0).find(".move").each(function(){
            $(this).hide();
        });
        changeHeight();
        function changeHeight(){
            setTimeout(function () {
                item.each(function(i){
                    if(i>0){
                        var start_height = $(this).height();
                        $(this).css("height",parseInt(start_height));
                        item.eq(i).find(".move").each(function(){
                            $(this).fadeOut();
                        });
                    }
                });
            },200);//safari下的兼容
        }

        moveTo(item.eq(0),1,0);
        $(window).on("scroll",function () {
            var h = $(window).scrollTop();
            var win_height = $(window).height();
            item.each(function() {
                moveTo($(this), h, win_height);
            });
        });
        function moveTo($this_,h1,h2){
            var item_top = $this_.offset().top;
            var item_move = $this_.find(".move");
            if(item_top-h1<2*h2/3){
                for(var i=0;i<item_move.length;i++){
                    (function(i){
                        setTimeout(function(){
                            $(item_move[i]).fadeIn();
                        },200+200*i)
                    })(i)
                }
            }
        }

        $(window).resize(function(){
            item.each(function(i){
                $(this).find(".move").each(function(){
                    $(this).show();
                });
                if(i>0){
                    $(this).css("height",'auto');
                }
                if(i==4){
                    $(this).css("height",faqContent.outerHeight());
                }

            })
        })


    })()
}