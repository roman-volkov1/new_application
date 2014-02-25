$(document).delegate('#catalog_level1, #catalog_level2, #catalog_level3', 'pagebeforeshow', function () {
  $('#catalog_level1 .list-nav').html(" ");
  $('#catalog_level2 .list-nav').html(" ");
  $('#catalog_level3 .list-nav2').html(" ");
  $('#catalog_level2 .ui-title').html(" ");
  //$('#catalog_level3 h1').html(" ");
  $('.load, .floatingBarsG').show();
});


$(document).delegate('#catalog_level1', 'pageshow', function () { 
  $('.ui-title').html("Каталог");
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/maincategory",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
  	  var level1_item = (response.catalog);
  	  $('#catalog_level1 .list-nav').append(level1_item);
      $("#catalog_level1 .imgwr").each(function() {
        $(this).height($(this).width());
        $(this).find("img").css("max-height",$(this).width())
        $(this).wrapInner("<span class='imgwr2' style='width:"+$(this).width()+"px; height:"+$(this).width()+"px;'/>")
      })
      $('#catalog_level1').delegate('.list-nav a', 'click', function (event) {
  	    event.preventDefault();
  		  var sub = $(this).attr('data-levid');
  		  $.ajax({
    			type       : "GET",
    			url        : "http://vsemoe.com.ua/api/subcategory/"+sub,
    			crossDomain: true,
    			dataType   : 'json',
    			beforeSend : function(){$('.load, .floatingBarsG').show();},
    			complete   : function(){},
    			success    : function(response) {
      			if (response.catalog == '') {
              $('#catalog_level3 .idcallvl3').html(sub);
              $('#catalog_level3 h1').html($(this).find(".name").html());
              $.mobile.changePage( "#catalog_level3");
      			} else{
              $("#catalog_level2 .idcallvl2").html(sub);
              $.mobile.changePage( "#catalog_level2");   			
      			};
    			
    			},
    			error      : function() {}
  			});
      });
    },
    error      : function() {}
  });
   $('.load, .floatingBarsG').delay(1300).hide(0);
});
$(document).delegate('#catalog_level2', 'pageshow', function () {
  parentlevelId = $("#catalog_level2 .idcallvl2").html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/subcategory/"+parentlevelId,
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      /////////////////////////////////////////
      $('.ui-title').html(response.prevcatname);
      ////////////////////////////////////////
      var level2_item = (response.catalog);
      $('#catalog_level2 .list-nav').append(level2_item);
  		$("#catalog_level2 .list-nav a").live("click", function() {
  		  $('#catalog_level3 .idcallvl3').html($(this).attr("data-lev2"));
        $('#catalog_level3 h1').html($(this).find(".name").html());
  		});
      $("#catalog_level2 .imgwr").each(function() {
        $(this).height($(this).width()).next().height($(this).width()).width($(this).parent().width()-$(this).outerWidth()-5);
        $(this).find("img").css("height",$(this).width())
        $(this).wrapInner("<span class='imgwr2' style='width:"+$(this).width()+"px; height:"+$(this).width()+"px;'/>");
        h2 = $(this).width();
        $(this).parent("a").height(h2);
      });
    },
    error      : function() {}
  });
  $('.load, .floatingBarsG').delay(1300).hide(0);
});
$(document).delegate('#catalog_level3', 'pageshow', function () {
  var catlevel2Id = $('#catalog_level3 .idcallvl3').html();
  var isb = isBascket(catlevel2Id);
  if(isb == false){
  	$.ajax({
    	type       : "GET",
    	url        : "http://vsemoe.com.ua/api/products/"+catlevel2Id,
    	crossDomain: true,
    	dataType   : 'json',
    	beforeSend : function(){},
    	complete   : function(){
          $('.load, .floatingBarsG').hide(0);
          $("#catalog_level3 input").kendoNumericTextBox({ 
            format: "#.0"
          });
      },
    	success    : function(response) {
        $('.ui-title').html(response.prevcat);
    		$('#catalog_level3 ul.list-nav2 li').remove();
    		$('#catalog_level3 ul.list-nav2').append(response.catalog);
        
    		$('#catalog_level3 ul.list-nav2 li ').delegate("a", 'click', function() {
    			var id = $(this).find('span.id').html();
    			$('#full_cart_description span.hidden').html(id);
    			$(".product-item").html("&nbsp;");
    		});
    		$("[data-role=header] .changer ").delegate(".look1", "click",function (event) {
    			event.preventDefault();
    			if ($(this).hasClass("active")) {} else{
    			$(this).addClass("active").siblings().removeClass("active")
    			$("#catalog_level3 ul.list-nav2").addClass("list-table");
    			};
    		})
    		$(" [data-role=header] .changer ").delegate(".look2", "click",function (event) {
    			event.preventDefault();
    			if ($(this).hasClass("active")) {} else{
    			$(this).addClass("active").siblings().removeClass("active")
    			$("#catalog_level3 ul.list-nav2").removeClass("list-table");
    			};
    		})
    		$("#catalog_level3 .img_block").each(function() {
    			var a =  $(this).width()
    			$(this).wrapInner("<span class='img_inner' style='width:"+a+"px !important; height:"+a+"px;'/>");
           $(this).children("span").children("img").height(a);
    		});

        $(".list-nav2 li .product_name").dotdotdot();

    	},
    	error      : function() {}
    }); 
  } else {
  	$.ajax({
    	type       : "GET",
    	url        : "http://vsemoe.com.ua/api/product_buskets/"+catlevel2Id,
    	crossDomain: true,
    	dataType   : 'json',
    	beforeSend : function(){},
    	complete   : function(){
        $('.load, .floatingBarsG').hide(0);
        $("#catalog_level3 input").kendoNumericTextBox({ 
          format: "#.0"
        });
      },
    	success    : function(response) {
    		$('#catalog_level3 ul.list-nav2 li').remove();

  			$('#catalog_level3 ul.list-nav2').append(response.catalog);
  			$('#catalog_level3 ul.list-nav2 li ').delegate("a", 'click', function() {
  				var id = $(this).find('span.id').html();
  				$('#full_cart_description span.hidden').html(id);
  				$(".product-item").html("&nbsp;");
  			});
        $("[data-role=header] .changer ").delegate(".look1", "click",function (event) {
          event.preventDefault();
          if ($(this).hasClass("active")) {} else{
          $(this).addClass("active").siblings().removeClass("active")
          $("#catalog_level3 ul.list-nav2").addClass("list-table");
          };
        })
        $(" [data-role=header] .changer ").delegate(".look2", "click",function (event) {
          event.preventDefault();
          if ($(this).hasClass("active")) {} else{
          $(this).addClass("active").siblings().removeClass("active")
          $("#catalog_level3 ul.list-nav2").removeClass("list-table");
          };
        })
  			$("#catalog_level3 .img_block").each(function() {
  				var a = $(this).width()
  				$(this).wrapInner("<span class='img_inner' style='width:"+a+"px; height:"+a+"px;'/>");
          $(this).children("span").children("img").height(a);
  			})
    	},
      error      : function() {}
    });
  } 
});
function isBascket(parent_id) {
  var res;
  	$.ajax({
  	  type       : "GET",
  	  url        : "http://vsemoe.com.ua/api/is_busket/"+parent_id,
  	  crossDomain: true,
  	  dataType   : 'json',
  	  async:false,
  	  beforeSend : function(){},
  	  complete   : function(){},
  	  success    : function(response) {
  		  res = response.value;	
  		  }
  	});
  return res;
}









$(".button_buy").live("click",function (event) {
  var id = $(this).parents("a").find(".id").html();
  event.stopPropagation();
  event.preventDefault();
    var _this = $(this);
    var length = 1;
    var price = parseFloat(($(this).parents("a").find(".product_price.orangetext").text()).replace(",",'.').replace(" ",''));
    var trueb = 0;
    var name = $(this).parents("a").find(".product_name.blacktext").html();
    $(".backet_hidden li").each(function() {
      if (parseFloat($(this).find("span").eq(0).html()) == id) {
        trueb = 1;
      };
    })
    if (trueb == 1) {
      $(".popup_bg").fadeIn(100,function() {
        $(".popwrAddedToBacket p").html("Этот товар уже есть в корзине")
        $(".popwrAddedToBacket").fadeIn(100);
        $(".popwrAddedToBacket .left img").attr("src","images/ui/itb.png");
      })
    } else{
      $(".popup_bg").fadeIn(100,function() {
        if (_this.parents("a").attr("data-type") != 1) {
          var input = "Введите количество в граммах<br><input type='text' value='1000'>";
        }else{
          var input = "<div style='padding-bottom:5px'>Выберите нужное количество</div><input class='numeric' type='number' value='1' min='1' step='1' />";
        };
        $(".popwrAddedToBacket p").html(input +"<span style='display:none' class='productNameFromPopap'>"+name+"</span><span style='display:none' class='productIdFromPopap'>"+id+"</span><span style='display:none' class='productPriceFromPopap'>"+price+"</span>");
        $(".popwrAddedToBacket .numeric").kendoNumericTextBox({ 
          format: "#",
          change: kdChangePop,
          spin: kdChangePop
        });
        function kdChangePop () {
          this.value(Math.round(this.value()));
        };
        $(".popwrAddedToBacket .left img").attr("src","images/ui/itb.png");
        $(".popwrAddedToBacket").fadeIn(100);
        $(".popwrAddedToBacket .toBack").addClass("cans").html("Отмена");
        $(".popwrAddedToBacket .close").addClass("closevv").removeClass("close");
      })
      
    };
});

$(".popwrAddedToBacket .toBack.cans").live("click",function (event){
  $(this).removeClass("cans");
  event.stopPropagation();
  event.preventDefault();
  $(".popwr").fadeOut(100,function() {
    $(".popup_bg").fadeOut(100)
  });
})
$(".popwrAddedToBacket .closevv").live("click",function (event){
  event.stopPropagation();
  event.preventDefault();
  $(".popwrAddedToBacket .toBack").removeClass("cans").html("Корзина");
  $(this).removeClass("closevv").addClass("close");



  if ($(this).parents(".popAddedToBacket").find("input").eq(1).attr("aria-valuenow") == undefined) {
    if ($(this).parents(".popAddedToBacket").find("input").attr("value")>100) {
      var lgs = Math.round($(this).parents(".popAddedToBacket").find("input").attr("value")/100)/10;
    } else{
      var lgs = Math.round(100/100)/10;
    };
  } else {
    var lgs = $(this).parents(".popAddedToBacket").find("input").eq(1).attr("aria-valuenow");
  };
 


  $(".backet_hidden").append("<li><span>"+$(".productIdFromPopap").html()+"</span><span>"+lgs+"</span><span>"+parseFloat($(".productPriceFromPopap").html())*lgs+"</span></li>");
  var name = $(".productNameFromPopap").html();
  $(".popup_bg").fadeIn(100,function() {
    $(".popwrAddedToBacket p").html("Товар:<br><span>"+name+"</span><br>добавлен в корзину")
    $(".popwrAddedToBacket").fadeIn(100);
  });  
})