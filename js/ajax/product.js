$(document).delegate('#product_detailed', 'pagebeforeshow', function () {
  $('.load, .floatingBarsG').show(0);
});

$(document).delegate('#product_detailed', 'pageshow', function () {
  $('.ui-title').html("");
  var nodeId = $('#full_cart_description span').html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/product_detail2/"+nodeId+"",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {

	  $(".product-item").html(response.str1);
	  $(".sw-wrapper").append(response.str2);
	  $(".similarp").append(response.str3);
	    
      $("[data-type=1] #numeric").kendoNumericTextBox({ 
        format: "#",
        change: kdChangePr,
        spin: kdChangePr
      });
      $("[data-type=2] #numeric").kendoNumericTextBox({format: "#.0"});
      var val1 = $(".my-valute").html();
      var val1 = val1.replace(' ','').replace(',','.');
      function kdChangePr () {
        var mnozh = $("#numeric").val();
        var total = val1*mnozh;
        $(".all-pp").html((Math.round(total*100)/100).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.',',')+"<span class='valute'>$</span>");
      };
      if (($(window).width()-30) < 700) {
        $(".sw-container").height((($(window).width()-30)*500)/700);
        $(".my-slide").height((($(window).width()-30)*500)/700);      
      } else{
        $(".sw-container").height(500);
        $(".my-slide").height(500);  
      };


      $('select').wSelect();
      $('#choose1').val('US').change();
      $('#choose2').val('white').change();

  

      var wtab = $(".ptabs").width();
      $(".tabb").width(wtab/2-3);

      
      $(".sim").live("click", function() {
        $('#full_cart_description span').html(parseFloat($(this).attr("data-id")));
        jQuery.mobile.changePage( "#product_detailed", {allowSamePageTransition:true,transition:"none"});

      })

      //tabs

      $('.tab1').live('click', function() {
          $('.tab2').removeClass('atab');
          $('.tab1').addClass('atab');
          $('.tab2cont').hide();
          $('.tab1cont').fadeIn("fast");
      });

      $('.tab2').live('click', function() {
          $('.tab1').removeClass('atab');
          $('.tab2').addClass('atab');
          $('.tab1cont').hide();
          $('.tab2cont').fadeIn("fast");
      });

      // slider

      var swiperProduct  = new Swiper('.sw-container',{
        wrapperClass: 'sw-wrapper',
        slideClass: 'my-slide',
        pagination: '.paginew',
        paginationClickable: true,
        speed: 200
      });

	 
	  var countImage =  $(".my-slide img").length;
      if(countImage == 1) {
        $(".paginew").css("display","none");
      }

      // tabs
      $("#product_detailed .description *").attr("style","");
      $("#product_detailed .description a").attr("href","javascript:void(0)");
      $("#product_detailed .description").css("overflow","hidden");
	  
	  $("#product_detailed").ajaxStop(function() {
        $('.load, .floatingBarsG').hide(0);
      });
	  
    },
    error      : function() {}
  });  
});


