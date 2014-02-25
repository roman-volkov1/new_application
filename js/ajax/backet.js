$(document).delegate('#backet, #make_offer', 'pagebeforeshow', function () {
  $("#backet .backet_ul").html("");
  $("#make_offer ul.makeofflist").html("");
  $("#backet .ui-title").html("Корзина");
  $("#make_offer .ui-title").html("Оформление заказа");
  $('.load, .floatingBarsG').show(0);
});
$(document).delegate('#backet', 'pagebeforeshow', function () {
  $("#box_id_adm *").remove();
  $("#box_id_adm").append('<option value="">Выберите упаковку</option>');
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/box",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      $.each(response,function() {
        var id = this.id;
        var name = this.name;
        $("#box_id_adm").append('<option value="'+id+'">'+name+'</option>');
      });
    },
    error      : function() {}
  }); 
});
// Backet
$(document).delegate('#backet', 'pageshow', function (){
  var offer_id = $(".offers_status").html();
  $('.ui-title').html("Корзина");
  var arrayOfBacket = new Array;
  var arrayOfLength = new Array;
  var arrayOfPrices = new Array;
  for (var i =$(".backet_hidden").find("li").length-1; i >= 0; i--) {
    arrayOfBacket[i] = $(".backet_hidden").find("li").eq(i).find("span").eq(0).html();
    arrayOfLength[i] = parseFloat($(".backet_hidden").find("li").eq(i).find("span").eq(1).html());
    arrayOfPrices[i] = parseFloat($(".backet_hidden").find("li").eq(i).find("span").eq(2).html());
  };

  if (arrayOfBacket.length != 0 && arrayOfLength.length != 0 && arrayOfPrices.length != 0) {
    $.ajax({
      type       : "GET",
      url        : "http://vsemoe.com.ua/api/my_busket",
      crossDomain: true,
      data: {arrayOfBacket: arrayOfBacket, arrayOfLength: arrayOfLength},
      dataType   : 'json',
      beforeSend : function(){},
      complete   : function(){},
      success    : function(response) {
        $(".backet_ul > *").remove();
        var full_price = response.suma;
        $(".fullprice").html(full_price);
        $("ul.backet_ul").prepend(response.catalog);
        $("[data-pbacket=1] .numeric, [data-type=1] .numeric").kendoNumericTextBox({ 
          format: "#",
          min: 1,
          change: kdChange1,
          spin: kdChange1
        });
        $("[data-pbacket=0][data-type=2] .numeric").kendoNumericTextBox({ 
          format: "#.0",
          change: kdChange,
          spin: kdChange
        });
        $(".backet_ul li").each(function() {
          $(this).find(".apllprices span").eq(0).html($(this).find(".apllprices span").eq(0).html().toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
          if ($(this).attr("data-pbacket") == 1 || $(this).attr("data-type") == 1) {
            
          } else{
            
          };
        })
        function kdChange() {
          var di = this.wrapper.parents("li").attr("data-id");
          for (var i = arrayOfBacket.length - 1; i >= 0; i--) {
            if (arrayOfBacket[i] == di) {
              di = i;
            };
          };
          var val = this.value();
          arrayOfLength[di] = val;
          // 
          arrayOfPrices[di] = parseFloat((val*(this.wrapper.parents("li").find(".just_price").attr("data-price")*100)/100).toFixed(2));
          // 
          this.wrapper.parents("li").find(".apllprices span").eq(0).html(((arrayOfPrices[di]*100)/100).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.',','));
          full_price = 0;
          for (var i = arrayOfPrices.length - 1; i >= 0; i--) {
            full_price = full_price + arrayOfPrices[i];
          };
          //
          full_price = ((full_price*100)/100).toFixed(2);
          change_price_backet(parseFloat(full_price).toFixed(2), arrayOfLength.length);
          $(".fullprice").html(parseFloat(full_price).toFixed(2).replace('.',','));
          for (var i = $(".backet_hidden li").length - 1; i >= 0; i--) {
            if (arrayOfBacket[di] == $(".backet_hidden li").eq(i).find("span").eq(0).html()) {
              $(".backet_hidden li").eq(i).find("span").eq(1).html(arrayOfLength[di]);
              $(".backet_hidden li").eq(i).find("span").eq(2).html(arrayOfPrices[di]);
            };
          };
          return false;
        }
        function kdChange1() {
          if (Math.round(this.value()) < 1) {
            this.value(1);
          } else{
            this.value(Math.round(this.value()));
          };
          var di = this.wrapper.parents("li").attr("data-id");
          for (var i = arrayOfBacket.length - 1; i >= 0; i--) {
            if (arrayOfBacket[i] == di) {
              di = i;
            };
          };
          var val = Math.round(this.value());
          
          arrayOfLength[di] = val;
          arrayOfPrices[di] = parseFloat((val*(this.wrapper.parents("li").find(".just_price").attr("data-price"))).toFixed(2));
          
          this.wrapper.parents("li").find(".apllprices span").eq(0).html(((arrayOfPrices[di])).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.',','));
          
          full_price = 0;
          for (var i = arrayOfPrices.length - 1; i >= 0; i--) {
            full_price = full_price + arrayOfPrices[i];
          };
          full_price = (full_price).toFixed(2);
          change_price_backet(parseFloat(full_price).toFixed(2), arrayOfLength.length);
          $(".fullprice").html(parseFloat(full_price).toFixed(2).replace('.',','));
          for (var i = $(".backet_hidden li").length - 1; i >= 0; i--) {
            if (arrayOfBacket[di] == $(".backet_hidden li").eq(i).find("span").eq(0).html()) {
              $(".backet_hidden li").eq(i).find("span").eq(1).html(arrayOfLength[di]);
              $(".backet_hidden li").eq(i).find("span").eq(2).html(arrayOfPrices[di]);
            };
          };
          return false;
        }
        change_price_backet(full_price, arrayOfLength.length);
        $(".product_href").live("click", function() {
          $('#full_cart_description span').html(parseFloat($(this).attr("data-id")));
          jQuery.mobile.changePage("#product_detailed");
        })
        $("ul.backet_ul").delegate(".delete_from_backet", "click", function(event) {
          var di = $(this).parents("li").attr("data-id");
          for (var i = arrayOfBacket.length - 1; i >= 0; i--) {
            if (arrayOfBacket[i] == di) {
              di = i;
            };
          };
          arrayOfLength[di] = $(this).siblings("input").attr("value");
          full_price = full_price - ((($(this).parents("li").find("input").attr("value")*$(this).parents("li").find(".just_price").attr("data-price"))*100)/100);
          full_price = (full_price*100)/100;
          $(".fullprice").html(full_price);
          for (var i = $(".backet_hidden li").length - 1; i >= 0; i--) {
            if (arrayOfBacket[di] == $(".backet_hidden li").eq(i).find("span").eq(0).html()) {
              $(".backet_hidden li").eq(i).remove();
            };
          };
          arrayOfLength.splice(di,1);
          arrayOfPrices.splice(di,1);
          arrayOfBacket.splice(di,1);
          $(this).parents("li").slideUp(100).remove();
          change_price_backet(full_price, arrayOfLength.length);
          offerDelete(full_price, offer_id);
          return false;
        });
        $("#backet  ul.backet_ul").ajaxStop(function() {
          $('.load, .floatingBarsG').hide(0);
        });
        $("#backet").delegate(".get_all", "click", function (event) {
          event.preventDefault();
          var pricef = parseFloat($('.fullprice').html());
          if(pricef >= 100){
            $.mobile.changePage('#make_offer');
          } else {
            $(".popup_bg").fadeIn(100,function() {
              $(".popwrOfferCreate p").html("Ваш заказ должен быть на сумму не менее, чем 100 $.");
              $(".popwrOfferCreate").fadeIn(100);
              $(".popwrOfferCreate .toBack").css("display", "none");
              $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
              $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
            }); 
          }
        });
      },
      error      : function() {}
    });
  } else{
    change_price_backet(0, 0);
  $('.load, .floatingBarsG').hide(0);
  };
});
// Make Offer
$(document).delegate('#make_offer', "pageshow", function() {
  var token = $('#token').html();
  $('.ui-title').html("Оформление заказа");
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      var user_sign_in_status = response.msg;
      if (user_sign_in_status!='false' && user_sign_in_status!='undefined' ){
        $.ajax({
          type       : "GET",
          url        : "http://vsemoe.com.ua/api/detail?auth_token="+ token +"",
          crossDomain: true,
          dataType   : 'json',
          beforeSend : function(){},
          complete   : function(){},
          success    : function(response) {
            var ttt = (JSON.stringify(response));
            var obj = jQuery.parseJSON(ttt);
            $.each(obj, function (){
              var user_options = this.retail_customer;
              var user_building = (user_options.building);
              var user_city = (user_options.city);
              var user_person = (user_options.name +" "+user_options.lastname);
              var user_street = (user_options.street);
              var user_mob_phone = (user_options.telephone);

              var user_porch = (user_options.porch);
              var user_flat = (user_options.flat);
              var user_corpus = (user_options.corpus);
              var user_code_intercom = (user_options.code_intercom);
              var user_floor = (user_options.floor);




              $("#o_person").attr({value: user_person, placeholder: user_person});
              $("#o_mob_phone").attr({value: user_mob_phone, placeholder: user_mob_phone});
              $("#o_city").attr({value: user_city, placeholder: user_city});
              $("#o_street").attr({value: user_street, placeholder: user_street});
              $("#o_building").attr({value: user_building, placeholder: user_building});

              $("#o_porch").attr({value: user_porch, placeholder: user_porch});
              $("#o_flat").attr({value: user_flat, placeholder: user_flat});
              $("#o_corpus").attr({value: user_corpus, placeholder: user_corpus});
              $("#o_code_intercom").attr({value: user_code_intercom, placeholder: user_code_intercom});
              $("#o_floor").attr({value: user_floor, placeholder: user_floor});





              $('#o_full').attr("value", $(".fullprice").html());
              
              $("#offer_id").attr("value", $(".offers_status").html());
            });
            var arrayOfBacket = new Array();
            var arrayOfLength = new Array();
            for (var i =$(".backet_hidden").find("li").length- 1; i >= 0; i--) {
              arrayOfBacket[i] = $(".backet_hidden").find("li").eq(i).find("span").eq(0).html();
              arrayOfLength[i] = $(".backet_hidden").find("li").eq(i).find("span").eq(1).html();
            };
            $.ajax({
              type       : "GET",
              url        : "http://vsemoe.com.ua/api/my_busket2",
              crossDomain: true,
              data: {arrayOfBacket: arrayOfBacket, arrayOfLength: arrayOfLength},
              dataType   : 'json',
              beforeSend : function(){},
              complete   : function(){},
              success    : function(response) {
                $("ul.makeofflist > *").remove();
                var arrayOfPrices = new Array();
                var full_price = null;
                $("ul.makeofflist").prepend(response.catalog);
                $("#make_offer .all_price").html('<span class="name" style="margin-bottom: -15px;">Количество: </span><span class="price" style="margin-bottom: -15px;">'+response.item_count+'</span><br><span class="name">Общая сумма: </span><span class="price">'+((response.suma*100)/100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' <span>$</span></span>');
                $("#make_offer a.get_all").show();
                $(".fullprice").html((response.suma*100)/100);
              },
              error      : function() {}
            }); 
          },
          error      : function() {
          }
        });
      } else {
        $.mobile.changePage('#login_page');
      }
      $("#make_offer").ajaxStop(function() {
        $('.load, .floatingBarsG').hide(0);
      });
    },
    error      : function() {}
  });         
})
$(function (){
  $('#createoffer').submit(function (event) {
  var offer_id = $("#offer_id").attr("value");
  var pricef = parseFloat($('#o_full').attr("value"));
  if(pricef >= 100){
    event.preventDefault();
    var token = $('#token').html();
    var postData = $(this).serialize();
    if (!$('#buttonoz').hasClass("buttonoz_inactive")) {
      if(offer_id == '') {
        $.ajax({
          type       : 'POST',
          url        : "http://vsemoe.com.ua/api/carts?auth_token="+ token +"",
          dataType   : 'json',
          beforeSend : function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'), $('#buttonoz').addClass('buttonoz_inactive').html('Отправка...'));
            $('#o_full').attr("value", (parseFloat($(".fullprice").html()).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
          },
          complete   : function(xhr){$('#buttonoz').removeClass('buttonoz_inactive').html('Оформить заказ')},
          data       : postData,
          success    : function(data) {

          if(data.error != undefined){
             var txt_err = '';
            jQuery.each(data.error, function(i, msg){
               txt_err += msg+',';                          
            });                
            txt_err = txt_err.substring(0, txt_err.length - 1)
              $(".popup_bg").fadeIn(100,function() {
              $(".popwrOfferCreate p").html(txt_err);
              $(".popwrOfferCreate").fadeIn(100);
              $(".popwrOfferCreate .toBack").css("display", "none");
              $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
              $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
              });           
          } else {
          $.mobile.changePage('#offer');
          $(".popup_bg").fadeIn(100,function() {
            $(".popwrOfferCreate p").html("Заказ успешно создан!");
            $(".popwrOfferCreate").fadeIn(100);
            $(".popwrOfferCreate .toBack").css("display", "none");
            $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
            $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
          }); 
          $('.backet_hidden *').remove();
          }
          },
        
        
          error      : function() {
          $(".popup_bg").fadeIn(100,function() {
            $(".popwrOfferCreate p").html("К сожалению, что-то пошло не так...")
            $(".popwrOfferCreate").fadeIn(100);
          })
          }
        });
      
    } else if(offer_id != '') {
      
        $.ajax({
          type       : 'PUT',
          url        : "http://vsemoe.com.ua/api/carts/"+offer_id+"?auth_token="+ token +"",
          dataType   : 'json',
          beforeSend : function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'), $('#buttonoz').addClass('buttonoz_inactive').html('Отправка...'))},
          complete   : function(xhr){$('#buttonoz').removeClass('buttonoz_inactive').html('Оформить заказ')},
          data       : postData,
          success    : function(data) {

          if(data.error != undefined){
             var txt_err = '';
            jQuery.each(data.error, function(i, msg){
               txt_err += msg+',';                          
            });                
            txt_err = txt_err.substring(0, txt_err.length - 1)
              $(".popup_bg").fadeIn(100,function() {
              $(".popwrOfferCreate p").html(txt_err);
              $(".popwrOfferCreate").fadeIn(100);
              $(".popwrOfferCreate .toBack").css("display", "none");
              $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
              $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
              });           
          }
          else
          {
          $.mobile.changePage('#offer');
          $(".popup_bg").fadeIn(100,function() {
            $(".popwrOfferCreate p").html("Заказ успешно отредактирован!");
            $(".popwrOfferCreate").fadeIn(100);
            $(".popwrOfferCreate .toBack").css("display", "none");
            $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
            $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
          });   
          }     
            
          $(".offers_status").html('');
          $('.backet_hidden *').remove();
          },
          error      : function() {
          $(".popup_bg").fadeIn(100,function() {
            $(".popwrOfferCreate p").html("К сожалению, что-то пошло не так...")
            $(".popwrOfferCreate").fadeIn(100);
          })
          }
        });
      }
    }
  } else {
    $(".popup_bg").fadeIn(100,function() {
      $(".popwrOfferCreate p").html("Ваш заказ должен быть на сумму не менее чем 100 $.");
      $(".popwrOfferCreate").fadeIn(100);
      $(".popwrOfferCreate .toBack").css("display", "none");
      $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
      $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
    }); 
    $.mobile.changePage('#backet');
  }
  return false;
  }); 
});
function change_price_backet(full_price, priceCount){
  //full_price = Math.round(full_price); 

  if(full_price != null && full_price != 0) {
    $("#backet .load").css('display','none');
    $("#backet .all_price").css('display','block');
    $("#backet .all_price").html('<span class="name" style="margin-bottom: -15px;">Количество: </span><span class="price" style="margin-bottom: -15px;">'+priceCount+'</span><br><span class="name">Общая сумма: </span><span class="price">'+(((full_price*100)/100).toFixed(2)).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.',',')+' <span>$</span></span>');
    $("#backet a.get_all").css('display','block');
  
  } else {
    $("#backet .load").css('display','none');
    $("#backet .all_price").css('display','block');
    $("#backet .all_price").html("<center>В Вашей корзине пока пусто…</center>");
    $("#backet a.get_all").css('display','none');
  }
} 
function change_price_offer(full_price, priceCount){
  //full_price = Math.round(full_price); 
  if(full_price != null && full_price != 0) {
    $("#make_offer .all_price").html('<span class="name" style="margin-bottom: -15px;">Количество: </span><span class="price" style="margin-bottom: -15px;">'+priceCount+'</span><br><span class="name">Общая сумма: </span><span class="price">'+((full_price*100)/100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' <span>$</span></span>');
    $("#make_offer a.get_all").show();
  } else {
    $("#make_offer .all_price").html("<center>К сожалению что-то пошло не так...</center>");
    $("#make_offer a.get_all").hide(); 
  }
} 
$(".add_to_backet").live("click",function (event) {
  var id = $(this).attr("data-id");
  event.stopPropagation();
  event.preventDefault();
  var length = $(this).parents("#product_detailed").find("#numeric").attr("value");
  var price = parseFloat(($(this).parents("#product_detailed").find(".pro-price .my-valute").text()).replace(",",".").replace(" ","")) * length;
  var trueb = 0;
  var name = $(this).parents("#product_detailed").find(".product-item h2").html();
  $(".backet_hidden li").each(function() {
    if (parseFloat($(this).find("span").eq(0).html()) == id) {
      trueb = 1;
    };
  })
  if (trueb == 1) {
    $(".popup_bg").fadeIn(100,function() {
      $(".popwrAddedToBacket p").html("Этот товар уже есть в корзине")
      $(".popwrAddedToBacket").fadeIn(100);
      $(".popwrAddedToBacket .left img").attr("src","images/ui/itb.png")
    })
  } else{
    $(".backet_hidden").append("<li><span>"+id+"</span><span>"+length+"</span><span>"+price+"</span></li>");
    $(".popup_bg").fadeIn(100,function() {
      $(".popwrAddedToBacket p").html("Товар:<br><span>"+name+"</span><br>добавлен в корзину")
      $(".popwrAddedToBacket").fadeIn(100);
    })
  };
});
function offerDelete (full_price, offstate) {
  if(offstate != '' && full_price == 0) {
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