(function($) {
$.fn.onEnter = function(func) {
  this.bind('keypress', function(e) {
    if (e.keyCode == 13) func.apply(this, [e]);    
  });               
  return this; 
};
})(jQuery);

$(document).delegate('#search', 'pageshow', function () {
  $('.ui-title').html("Поиск");
});

$(document).ready(function() {
  $("#dosearch").onEnter( function() {
    var find = $(this).attr("value").toLowerCase();
    var i2 = 0;
    var reg_pusto = $(this).attr("value").replace(/\s+/,'');
    if ($(this).attr("value") == "" || reg_pusto.length < 3 ) {
      $(".popup_bg").fadeIn(100,function() {
        $(".popwrOfferCreate p").html("Запрос введен не корректно");
        $(".popwrOfferCreate").fadeIn(100);
        $(".popwrOfferCreate .toBack").css("display", "none");
        $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
        $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
      });
    }
    else {
      $.mobile.changePage( "#search");
      $.ajax({
        type       : "GET",
        url        : "http://vsemoe.com.ua/api/searchable2?search="+find,
        crossDomain: true,
        dataType   : 'json',
        beforeSend : function(){},
        complete   : function(){},
        success    : function(response) {
          var searchResult = response;
          $("#search .products_list_search").html('');
          if(response.items_count>0){
           $("#search .founded_cnt").css("display","block").html("Найдено: "+response.items_count+" товаров");
           $("#search .products_list_search").append(response.result);
          $("#search .products_list_search li").each(function() {
            if ($(this).find(".havenot").length<1) {
              $(this).find(".product_price.orangetext").after('<button class="button_buy" style="margin-left: 40%;">Купить</button>');
            };
          })
          } else {
           $("#search .founded_cnt").css("display","block").html("По вашему запросу ничего не найдено");
          }
          $('#search .products_list_search li a').bind('click', function() {
           var id = $(this).find('span.id').html();
            $('#full_cart_description span.hidden').html(id);
            $(".product-item").html("&nbsp;");
          });
          $(".list-nav2 li .product_name").dotdotdot();
        },
        error      : function() {}
      });
    }
  });
});
$("#search .search_btn").live("click", function (event) {
  event.preventDefault();
  var find = $(this).siblings("input").attr("value").toLowerCase();
  var i2 = 0;
  var reg_pusto = $(this).siblings("input").attr("value").replace(/\s+/,'');

  if ($(this).siblings("input").attr("value") == "" || reg_pusto.length < 3 ) {
    $(".popup_bg").fadeIn(100,function() {
      $(".popwrOfferCreate p").html("Запрос введен не корректно");
      $(".popwrOfferCreate").fadeIn(100);
      $(".popwrOfferCreate .toBack").css("display", "none");
      $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
      $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
    })
  } else{
    $.mobile.changePage( "#search");
    $.ajax({
      type       : "GET",
      url        : "http://vsemoe.com.ua/api/searchable2?search="+find,
      crossDomain: true,
      dataType   : 'json',
      beforeSend : function(){},
      complete   : function(){},
      success    : function(response) {
        var searchResult = response;
    		$("#search .products_list_search").html('');
    		if(response.items_count>0){
      		$("#search .founded_cnt").css("display","block").html("Найдено: "+response.items_count+" товаров")
      		$("#search .products_list_search").append(response.result);
          $("#search .products_list_search li").each(function() {
            if ($(this).find(".havenot").length<1) {
              $(this).find(".product_price.orangetext").after('<button class="button_buy" style="margin-left: 40%;">Купить</button>');
            };
          })
    		} else {
    		 $("#search .founded_cnt").css("display","block").html("По вашему запросу ничего не найдено")
    		}
        $('#search .products_list_search li a').bind('click', function() {
          var id = $(this).find('span.id').html();
          $('#full_cart_description span.hidden').html(id);
          $(".product-item").html("&nbsp;");
        });
        $(".list-nav2 li .product_name").dotdotdot();
      },
      error      : function() {}
    });
  };
})