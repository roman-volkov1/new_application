$(document).delegate('#offer, #view_offer, #edit_offer', 'pagebeforeshow', function () {
  $("#offer .offers_list").html("");
  $("#view_offer .voffer_ul").html("");
  $("#edit_offer .voffer_ul").html("");
  $("#view_offer .ui-title").html("");
  $('.load, .floatingBarsG').show(0);
});


//Offers info
$(document).delegate('#offer', 'pageshow', function () {
  $(".ui-title").html("Заказы");
  var token = $('#token').html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    async      : true,
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
	if(response.error == undefined){
      var user_sign_in_status = response.msg;
      if (user_sign_in_status!='false'){

	   $.ajax({
          type       : "GET",
          url        : "http://vsemoe.com.ua/api/listcarts?auth_token="+ token +"",
          crossDomain: true,
          dataType   : 'json',
          async      : true,
          beforeSend : function(){},
          complete   : function(){},
          success    : function(response) {
			
			$("#offer .offers_list").html("");
		    $("#offer .offers_list").append(response.carts); 
			/////////// перевірка на наявність заказів, треба порахувати блоки 
			var countoffers =  $("#offer .offers_list li").length;
			
			if (countoffers > 0) { 
			  $("#offer .offers_list li a").live("click", function() {
                $(".id-offer").html($(this).attr("data-id"));
              })
			} /////////////////////////
			else{
			$("#offer .offers_list").append('<li class="nobefore" style="border-bottom: 0;"><center class="orangetext" style="display:block; line-height:200px;">История заказов пуста</center></li>'); 
			}
			
          },
          error      : function() {
          }
        });
       } else {
         $.mobile.changePage('#login_page');
       }
      
      $("#offer").ajaxStop(function() {
        $('.load, .floatingBarsG').hide(0);
      });
	  }
	  else
	  {
		$.mobile.changePage('#login_page');
	  }
    },
    error      : function() {}
  });
});


// Offer item info
$(document).delegate('#view_offer', 'pageshow', function () {
  var token = $('#token').html();
  var idOfferItem = $(".id-offer").html();
  $(".ui-title").html("Заказ №"+idOfferItem);
  $("#view_offer").attr("data-id-offer",idOfferItem);
  
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    async      : true,
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {  
      $("#view_offer .voffer_ul").append("");
	  $("#view_offer .all_price").html("");
    
      var user_sign_in_status = response.msg;      
      if (user_sign_in_status!='false'){        
	   $.ajax({
          type       : "GET",
          url        : "http://vsemoe.com.ua/api/cart_show/"+idOfferItem,
          crossDomain: true,
          dataType   : 'json',
          async      : true,
          beforeSend : function(){},
          complete   : function(){},
          success    : function(response) {
            $("#view_offer .voffer_ul").append(response.cart_items);
            $(".all_price").html('<span class="name" style="margin-bottom: -15px;">Количество: </span><span class="price" style="margin-bottom: -15px;">'+response.cart_item_count+'</span><br><span class="name">Общая сумма: </span><span class="price">'+((response.total_price*100)/100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.',',')+' <span>$</span></span>');

      			if(response.status >1){
      			  $('#editofferbut').hide();
      			} else {
      			  $('#editofferbut').show();			
      			}
            $(".deleteOffer").live("click", function() {
              offerDelete2(response.total_price, idOfferItem);
            });


            $('#view_offer .voffer_ul li').delegate("a", 'click', function() {
              var id = $(this).parents('li').attr("data-id");
              $('#full_cart_description span.hidden').html(id);
            });


            $(".tomessages").attr("data-tomessages", idOfferItem)
            $(".tomessages").live("click", function() {
              $("#messages .messid").html($(this).attr("data-tomessages"))
              $.mobile.changePage('#messages');
            });
          },
          error      : function() {
          }
        });
      } else {
        $.mobile.changePage('#login_page');
      }
      $("#view_offer").ajaxStop(function() {
        $('.load, .floatingBarsG').hide(0);
      });
    },
    error      : function() {}
  });
});
$('.offer_trigger').live('click',function(){
  var version = $("#view_offer").attr("data-id-offer"); 
  $('.offers_status').html(version);
  $('.backet_hidden *').remove();
  $("ul.voffer_ul li").each(function(){
    $(".backet_hidden").append("<li><span>"+$(this).attr('data-id')+"</span><span>"+$(this).find('.cl').html()+"</span><span>"+$(this).find('.row.first .product_price').attr("data-price")+"</span></li>");
  })
  $.mobile.changePage('#backet');
})
function offerDelete2 (full_price, offstate) {
  if(offstate != '' && full_price != 0) {
    $.ajax({
      type       : "GET",
      url        : "http://vsemoe.com.ua/api/delete_cart/"+offstate+"?auth_token="+$('#token').html(),
      crossDomain: true,
      dataType   : 'json',
      async      : true,
      success    : function() {
        $(".popup_bg").fadeIn(100,function() {
          $(".popwrOfferCreate p").html("Заказ успешно удален!");
          $(".popwrOfferCreate").fadeIn(100);
          $(".popwrOfferCreate .toBack").css("display", "none");
          $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
          $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
        })
        setTimeout(function() {$.mobile.changePage('#offer');},2000);
      },
      error      : function() {
      }
    });
  };
};