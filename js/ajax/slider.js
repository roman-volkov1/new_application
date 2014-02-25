$(function (){
  $(".swiper-container").animate({opacity:1}, 0 );
/*  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/get_image_baner?type=1",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){
      $('.swiper-slide').first().children('a.slda').children('img').one('load', function() {
            $(".sw").fadeOut("200",function(){
              mySwiper.reInit();
              $(".swiper-container").animate({opacity:1}, 200 );
            });
      }).each(function() {
        if(this.complete) $(this).load();
      });
    },
    success    : function(response) {

      $.each(response,function(i) {
        var newSrc = 'http://www.fruity-mail.ru/system/dragonfly/production/'+this.banner_image_phone_uid;

        if (newSrc != 'http://www.fruity-mail.ru/system/dragonfly/production/null')
        {        
          $('.swiper-slide').eq(i).children('a.slda').attr('rel',this.url_adv);
          $('.swiper-slide').eq(i).children('a.slda').children('img').attr('src',newSrc);
        }

        else {
          $('.swiper-slide').eq(i).remove();
          mySwiper.reInit();
        }
      });     
    },
    error      : function() {}
  });*/

  $(".slda").live("click", "a", function (event) {
    event.preventDefault();
    var aaa = $(this).attr("rel");
    navigator.app.loadUrl(aaa, { openExternal:true });
    return false;
  });


          var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        loop: false,
        autoplay: 5000,
        speed: 300
      });

    $(".gohome2").live("click", "a", function (event) {
      event.preventDefault();
      $.mobile.changePage("#mainpage1");
    });

    $(document).delegate('#mainpage1', 'pageshow', function () {
      $(".sw").hide();
      mySwiper.reInit();
    }); 
});