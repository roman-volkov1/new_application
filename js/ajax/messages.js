var mesc, numofcatting;
$(document).delegate('#messageslist', 'pageshow', function () {
  $("#messageslist .messages > *").remove();
  $(".ui-title").html("Сообщения");
  var token = $('#token').html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){$('.load, .floatingBarsG').show();},
    complete   : function(){$('.load, .floatingBarsG').hide();},
    success    : function(response) {
      var user_sign_in_status = response.msg;
      if (user_sign_in_status!='false'){
        $.ajax({
          type       : "GET",
          url        : "http://vsemoe.com.ua/api/get_carts?auth_token="+ token +"",
          crossDomain: true,
          dataType   : 'json',
          beforeSend : function(){$('.load, .floatingBarsG').show();},
          complete   : function(){$('.load, .floatingBarsG').hide();},
          success    : function(response) {
		 			if(response.error == undefined){ 
            var message = (JSON.stringify(response));
            var messages = jQuery.parseJSON(message);
            var newmes = messages.count;
            if (messages.carts.length > 0) {
              for (var i = messages.carts.length - 1; i >= 0; i--) {
                if (newmes[i]>0) {
                  var classtoadd = "greytext inmes"
                } else{
                  var classtoadd = "greytext"
                };
                $("#messageslist .messages").append('<li><a href="#messages" data-num="'+messages.carts[i].id+'"><span class="blacktext">Заказ № <span>'+messages.carts[i].id+'</span></span><br><span class="'+classtoadd+'">Новых сообщений: <span>'+newmes[i]+'</span></span></a></li>');       
              };
            } else{
              $("#messageslist .messages").append('<li class="nobefore" style="border-bottom: 0;"><center class="orangetext" style="display:block; line-height:200px;">История сообщений пуста</center></li>'); 
            };
  
          }
		  	else
			{
			$.mobile.changePage('#login_page');
			}
		  },
          error      : function() {
          }
        });
        $("#messageslist .messages a").live("click",function (event) {
          event.preventDefault();
          $(".messid").html($(this).attr("data-num"));
          $("#sendmessage input[name=id]").attr("value", $(this).attr("data-num"));
          $.mobile.changePage('#messages');
        })  
      } else {
        $.mobile.changePage('#login_page');
      }
    },
    error      : function() {}
  });
});

$(document).delegate('#messages', 'pageshow', function () {
  $("#messages .messages").remove();
  numofcatting = $("#messages .messid").html();
  $(".ui-title").html("Заказ №"+numofcatting);
  var token = $('#token').html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){$('.load, .floatingBarsG').show();},
    complete   : function(){$('.load, .floatingBarsG').hide();},
    success    : function(response) {
      var user_sign_in_status = response.msg;
      if (user_sign_in_status!='false'){
        checkMessages()
        mesc = window.setInterval(function(){checkMessages()}, 10000)
        $(".tooffers").attr("data-tooffers", numofcatting)
        $(".tooffers").live("click", function() {
          $(".id-offer").html($(this).attr("data-tooffers"));
          $.mobile.changePage('#view_offer');
        });
      } else {
        $.mobile.changePage('#login_page');
      }
    },
    error      : function() {}
  });
});
$(document).delegate('#messages', 'pagebeforehide', function () {clearInterval(mesc)});

function checkMessages() {
  var token = $('#token').html();
  $.ajax({
    type       : "GET",
    // url        : "../../test2.json",
    url        : "http://vsemoe.com.ua/api/get_cart_messages/"+numofcatting+"?auth_token="+ token +"",
    crossDomain: true,
    dataType   : 'json',
    beforeSend : function(){},
    complete   : function(){},
    success    : function(response) {
      $("#messages .mbox div.messages").remove();
      var message2 = (JSON.stringify(response));
      var messages2 = jQuery.parseJSON(message2);
      var messages3 = messages2.messages;
      for (var i = 0; i <= messages3.length - 1; i++) {
        var oper = messages3[i].operator;
        if (oper !== null && typeof oper !=="undefined") {
          var messagetype = "oper", name = messages3[i].operator, name_ms = "adm_m", name_src = "images/ui/admin_ms.png";
        } else if (oper == null, typeof oper !=="undefined"){
          var messagetype = "my", name = "Я", name_ms = "i_m", name_src = "images/ui/i_ms.png";
        } else if (typeof oper =="undefined"){
          var messagetype = "oper", name = "Инфо";
        };
        if (messages3[i].readh == false) {
          var db = "block";
        } else{
          var db = "none";
        };
        var datet = messages3[i].created_at;
        var date = new Date(datet);
        var yyyy = date.getFullYear();
        var mm = date.getMonth()+1;
        var dd = date.getDate();
        var hh = date.getHours();
        var mn = date.getMinutes();
        if (mn.toString().length == 1){
          mn = "0" + mn;
        }
        var msdate = dd +"."+ mm +"."+ yyyy +", "+ hh +"."+ mn;
        $("#messages .mbox").prepend('<div class="messages '+messagetype +'"><p class="name_date">'+msdate+'</p><span class="img_ms '+name_ms+'"><span class="img_ms2"><img alt="" src="'+name_src+'"></span></span><p class="message"><i class="nread" style="display:'+db+'"></i>'+messages3[i].message+'</p><div class="clr"></div></div>')
        $("#messages .nread").delay(5000).fadeOut(1000);
      };
    },
    error      : function() {
    }
  });
}

$(function (){
  $('#sendmessage').submit(function (event) {
    var token = $('#token').html();
    event.preventDefault();
    var postData = $(this).serialize();
    var mstext1 = $('#sendmessage input[name=message]').val();
    if ($('#sendmessage input[name=message]').val().length > 0 && $('#sendmessage input[name=message]').val() != "Введите текст сообщения") {
      $('#sendmessage input[name=message]').val("");
      $.ajax({
        type       : 'POST',
        url        : "http://vsemoe.com.ua/api/create_message?auth_token="+ token +"",
        dataType   : 'json',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data       : postData,
        success    : function(data) {
          
        },
        error      : function() {
        }
      });

      var date = new Date();
      var yyyy = date.getFullYear();
      var mm = date.getMonth()+1;
      var dd = date.getDate();
      var hh = date.getHours();
      var mn = date.getMinutes();
      if (mn.toString().length == 1){
        mn = "0" + mn;
      }
      var msdate = dd +"."+ mm +"."+ yyyy +", "+ hh +"."+ mn;
        $("#messages  .mbox").append('<div class="messages my"><p class="name_date">'+msdate+'</p><span class="img_ms i_m"><span class="img_ms2"><img alt="" src="images/ui/i_ms.png"></span></span><p class="message"><i class="nread" style="display:none"></i>'+mstext1+'</p><div class="clr"></div></div>');
    }
    return false;
  });
});
