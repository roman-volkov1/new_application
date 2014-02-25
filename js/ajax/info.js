$(document).delegate('#about_company', 'pageshow', function (){
  $('.ui-title').html("О нас");
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/page/114",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      var about = (JSON.stringify(response));
      var about2 = jQuery.parseJSON(about);
      $("#about_company .cont").html(about2.page[0].content);
      $("#about_company .cont").find("img").each(function() {
        $(this).attr("src", "http://vsemoe.com.ua/"+$(this).attr("src")).attr("style", "");
      })
    },
    error      : function() {}
  }); 
}); 


$(document).delegate('#delivery_page', 'pageshow', function (){
  $('.ui-title').html("Доставка");
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/page/115",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      var deliv = (JSON.stringify(response));
      var deliv2 = jQuery.parseJSON(deliv);
      $("#delivery_page .cont").html(deliv2.page[0].content);
      $("#delivery_page .cont").find("img").each(function() {
        $(this).attr("src", "http://vsemoe.com.ua/"+$(this).attr("src")).attr("style", "");
      })
      $("#delivery_page table").attr("style", "").wrap("<div class='tablewrap' />").find("*").attr("style", "");

    },
    error      : function() {}
  }); 
}); 

$(document).delegate('#pay_page', 'pageshow', function (){
  $('.ui-title').html("Оплата");
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/page/116",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      var deliv = (JSON.stringify(response));
      var deliv2 = jQuery.parseJSON(deliv);
      $("#pay_page .cont").html(deliv2.page[0].content);
      $("#pay_page .cont").find("img").each(function() {
        $(this).attr("src", "http://vsemoe.com.ua/"+$(this).attr("src")).attr("style", "");
      })
      $("#pay_page table").attr("style", "").wrap("<div class='tablewrap' />").find("*").attr("style", "");

    },
    error      : function() {}
  }); 
}); 