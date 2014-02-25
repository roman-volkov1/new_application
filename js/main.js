$(document).ready(function () {
    var token = localStorage.getItem('token');
    $('#token').html(token);

  $("[data-role=footer],[data-role=header]").fixedtoolbar({ hideDuringFocus: "input, select" });
  $(document).delegate('#[data-role=page]', 'pageshow', function () {
    if ($(this).attr("id") != "mainpage1") {
      $(this).find(".ui-content").addClass("hfpadding");
    };
  });
  // clak on main     
  calcWidth();
  function calcWidth() {
    var hMy = $(window).height();
    var wMy = $(window).width();
    var temp = wMy / 800;   
    var sliderH =  Math.floor(450 * temp);
    $(".swiper-container").height(sliderH);
    $(".swiper-slide").height(sliderH);
    var hMenu = hMy - 20 - sliderH;
    $(".menu-my").height(hMenu);
    $(".item").css("width","33.3%");
    var iHeight = Math.floor(hMenu/3);
    $(".item").height(iHeight);


    var img = $(".item").children(".img");
    var imgW = Math.floor(wMy/5);
    img.width(imgW);
    img.height(imgW);
    var imgH = img.height();
    var imgM = Math.floor((iHeight - imgH)/2 - 10);
    img.css("marginTop",imgM + "px");

    var itemW = $(".item").width();
    $(".img").children("span").width(itemW);
    var leftSpan =  Math.floor((itemW-imgW)/2);
    $(".img").children("span").css("left",-leftSpan + "px");
  }


 //popup

  $(".popwr .close, .popwr .toBack").live("click",function() {
    $(".popwr").fadeOut(100,function() {
      $(".popup_bg").fadeOut(100)
    });
  });
  $(".toBack").live("click",function() {
    if ($(this).html()=="Отмена") {
      $(".popwr").fadeOut(100,function() {
        $(".popup_bg").fadeOut(100)
      });    
    };
  });



     // loader height
  $(".load").height($(window).height()-99);

  $("[data-role=footer] a").live("click", function() {
    if ($(this).hasClass("item5")) {
      if($(this).hasClass("m2act"))
      {
        $(this).removeClass("m2act");
        $(".menu2").css("display","none");
      }

      else {
          event.preventDefault();
          $(this).addClass("m2act");
          $(".menu2").css("display","block");
      }
    } 
    else{
      $(".menu2").css("display","none");
      $("[data-role=footer] .item5").removeClass("m2act");
      $.mobile.changePage($(this).attr("href"));
    };
  });

  $(".menu2 li a").live("click", function() {
      $(".menu2").css("display","none");
      $("[data-role=footer] .item5").removeClass("m2act");
  });

  $("[data-role=header]").live("click", function() {
      $(".menu2").css("display","none");
      $("[data-role=footer] .item5").removeClass("m2act");
  });


  $("[data-role=content]").live("click", function() {
      $(".menu2").css("display","none");
      $("[data-role=footer] .item5").removeClass("m2act");
  });

  // $(".gocatalog").live("click", function (event) {
  //    event.preventDefault();
  //     $.mobile.changePage('#catalog_level1');
  // });

   $(".reloadapp").live("click", function() {
      event.preventDefault();
      location.reload();
  });

  $(document).delegate('[data-role=page]', 'pageshow', function () {
    var page = $(this).attr("id");
    if (page != 'login_page' && page != 'register_page' && page != 'forget_password') {
      $(".thisPage").html(page);
    };
  });


  
  setInterval(function() {backetReCount()}, 2000);
  function backetReCount () {
    if ($(".backet_hidden").find("li").length > 0) {
      if ($("[data-role=footer] .item3 .backetLength").length <= 0) {
        $("[data-role=footer] .item3, .mainpage .item:eq(3)").append("<i class='backetLength'></i>");
      };
    } else {
      $("[data-role=footer] .item3 .backetLength, .mainpage .item:eq(3) .backetLength").remove();
    };
    $(".item3 i.backetLength, .mainpage .item:eq(3) .backetLength").html($(".backet_hidden").find("li").length);
  };



  $("#login_page [data-rel=back]").live("click", function (event) {
    event.preventDefault();
    history.go(-2)
  })
  $("#catalog_level2, #catalog_level3").attr("data-offset-top",0)
  $(window).scroll(function() {
    if ($(".ui-page-active").attr("id") == "catalog_level2" || $(".ui-page-active").attr("id") == "catalog_level3") {
      $(".ui-page-active").attr("data-offset-top",$(window).scrollTop())
    };
  })
  $(window).on("navigate", function (event, data) {
    if (data.state.pageUrl == "catalog_level2" || data.state.pageUrl == "catalog_level3") {
      var topID = "#"+data.state.pageUrl;
      var topForInt = $(topID).attr("data-offset-top");
      var topadd = window.setInterval(function(){
        if ($(window).scrollTop()<topForInt) {
          $(window).scrollTop(topForInt);
        } else{
          $(topID).attr("data-offset-top","0")
          topForInt = 0;
          clearInterval(topadd);
        };
      }, 500);
    };
  });


  function mailChecker () {
    var token = $('#token').html();
    $.ajax({
      type       : "GET",
      url        : "http://vsemoe.com.ua/api/messages_uread_count?auth_token="+token,
      crossDomain: true,
      dataType   : 'json',
      beforeSend : function(){},
      complete   : function (xhr,response){
        if (response == "error") {
          $(".internetFalue2").css("display","block");
        } else if (response == "success") {
          $(".internetFalue2").css("display","none");
        };
      },
      success    : function(response) {
        if (response.count_unread_mess > 0) {
          if ($("[data-role=footer] .item4 .backetLength").length <= 0) {
            $("[data-role=footer] .item4, .mainpage .item:eq(5)").append("<i class='backetLength'></i>");
          };
        } else {
          $("[data-role=footer] .item4 .backetLength, .mainpage .item:eq(5) .backetLength").remove();
        };
        $(".item4 i.backetLength, .mainpage .item:eq(5) .backetLength").html(response.count_unread_mess);
        setTimeout(function() {mailChecker();},5000)
      },
      error      : function() {
        setTimeout(function() {mailChecker();},5000)
      }
    });

  }; 
  mailChecker();

    $("#catalog_level3 .k-widget,#catalog_level3 .k-icon, #catalog_level3 input").live("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
  });

  $("[data-role=footer],[data-role=header]").hide();
  $(document).delegate('[data-role=page]', 'pagebeforeshow', function () {
    if ($(this).attr("id") == "mainpage1") {
      $("[data-role=footer],[data-role=header]").hide();
    } else{
      $("[data-role=footer],[data-role=header]").show();
    };

    if ($(this).attr("id") == "catalog_level3") {
      if ($(window).width()>460) {
        $("#catalog_level3 ul.list-nav2").addClass("list-table");
      } else{
        $("[data-role=header] .changer").show();
      };
    } else{
      $("[data-role=header] .changer").hide();
    };
  });

/*  $("#delivery_page a, #pay_page a, #about_company a").live("click", "a", function (event) {
    event.preventDefault();
    var newa = $(this).attr("href");
    alert(newa);
    loadURL(newa);
  });

  function loadURL(url){
    navigator.app.loadUrl(url, { openExternal:true });
    return false;
  }*/

  $("#delivery_page a, #pay_page a, #about_company a").live("click", function (event) {
    event.preventDefault();
    var aa = $(this).attr("href");
    navigator.app.loadUrl(aa, { openExternal:true });
    return false;
  });
});//ready end