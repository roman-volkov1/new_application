$(document).delegate('#personal_info,#login_page,#forget_password,#register_page,#change_personal_data,', 'pageshow', function () {
  $('.ui-title').html("");
});
// Personal info
$(document).delegate('#personal_info', 'pageshow', function () {

  
  var token = $('#token').html();
  $.ajax({
    type       : "GET",
    url        : "http://vsemoe.com.ua/api/check_user_sign_in?auth_token="+ token +"",
    crossDomain: true,
    cache : false,
    dataType   : 'json',
    beforeSend : function(){$('.load, .floatingBarsG').show();},
    complete   : function(){$('.load, .floatingBarsG').hide();},
    success    : function(response) {
	     
      var user_sign_in_status = response.msg;
      if (user_sign_in_status!='false' && user_sign_in_status!='undefined' ){
        $.ajax({
          type       : "GET",
          url        : "http://vsemoe.com.ua/api/detail?auth_token="+ token +"",
          crossDomain: true,
          dataType   : 'json',
          beforeSend : function(){$('.load, .floatingBarsG').show();},
          complete   : function(){$('.load, .floatingBarsG').hide();},
          success    : function(response) {
            var ttt = (JSON.stringify(response));
            var obj = jQuery.parseJSON(ttt);
            if(response.error == undefined){	
              $.each(obj, function (){
                var user_email = this.email;
                if (user_email == null) {
                  user_email = ""
                };
                var user_login = this.username;
                if (user_login == null) {
                  user_login = ""
                };
                var user_options = this.retail_customer;
                if (user_options == null) {
                  user_options = ""
                };

                var user_building = (user_options.building);
                if (user_building == null) {
                  user_building = ""
                };
                var user_city = (user_options.city);
                if (user_city == null) {
                  user_city = ""
                };
                var user_flat = (user_options.flat);
                if (user_flat == null) {
                  user_flat = ""
                };
                var user_home_phone = (user_options.home_phone);
                if (user_home_phone == null) {
                  user_home_phone = ""
                };
                var user_lastname = (user_options.lastname);
                if (user_lastname == null) {
                  user_lastname = ""
                };
                var user_name = (user_options.name);
                if (user_name == null) {
                  user_name = ""
                };
                var user_porch = (user_options.porch);
                if (user_porch == null) {
                  user_porch = ""
                };
                var user_street = (user_options.street);
                if (user_street == null) {
                  user_street = ""
                };
                var user_mob_phone = (user_options.telephone);
                if (user_mob_phone == null) {
                  user_mob_phone = ""
                };
                var user_mob_phone2 = (user_options.mob_phone);
                if (user_mob_phone2 == null) {
                  user_mob_phone2 = ""
                };



                // qwertyuiop[]qwertyuiop[qwertyuiop[]]
                var user_corpus = (user_options.corpus);
                if (user_corpus == null) {
                  user_corpus = ""
                };
                var user_code_intercom = (user_options.code_intercom);
                if (user_code_intercom == null) {
                  user_code_intercom = ""
                };
                var user_floor = (user_options.floor);
                if (user_floor == null) {
                  user_floor = ""
                };
                // qwertyuiop[]qwertyuiop[qwertyuiop[]]
                $('#personal_info .content').html("<div class='personal_info'><div class='line'><div class='key'>Имя</div><div class='val'>"+user_name+"</div><div class='clr'></div></div><div class='line'><div class='key'>Фамилия</div><div class='val'>"+user_lastname+"</div><div class='clr'></div></div><div class='line'><div class='key'>E-mail</div><div class='val'>"+user_email+"</div><div class='clr'></div></div><div class='line'><div class='key'>Моб. телефон </div><div class='val'>"+user_mob_phone+"</div><div class='clr'></div></div><div class='line'><div class='key'>Моб. телефон #2</div><div class='val'>"+user_mob_phone2+"</div><div class='clr'></div></div><div class='line'><div class='key'>Домашний телефон</div><div class='val'>"+user_home_phone+"</div><div class='clr'></div></div><div class='line'><div class='key'>Город</div><div class='val'>"+user_city+"</div><div class='clr'></div></div><div class='line'><div class='key'>Улица</div><div class='val'>"+user_street+"</div><div class='clr'></div></div><div class='line'><div class='key'>Дом</div><div class='val'>"+user_building+"</div><div class='clr'></div></div><div class='line'><div class='key'>Корпус</div><div class='val'>"+user_corpus+"</div><div class='clr'></div></div><div class='line'><div class='key'>Номер подъезда</div><div class='val'>"+user_porch+"</div><div class='clr'></div></div><div class='line'><div class='key'>Код подъезда</div><div class='val'>"+user_code_intercom+"</div><div class='clr'></div></div><div class='line'><div class='key'>Этаж</div><div class='val'>"+user_flat+"</div><div class='clr'></div></div><div class='line'><div class='key'>Номер квартиры</div><div class='val'>"+user_floor+"</div><div class='clr'></div></div><div class='line'><div class='key'>Логин</div><div class='val'>"+user_login+"</div><div class='clr'></div></div></div><a id='change_personal_data_link' href='#change_personal_data'>Изменить данные</a><a id='logoutprof' href='#' >Выход</a>"); 

                $("#u_name").attr({value: user_name});
                $("#u_lastname").attr({value: user_lastname});
                $("#u_mail").attr({value: user_email});
                $("#u_tel").attr({value: user_home_phone});
                $("#u_mob_phone").attr({value: user_mob_phone});
                $("#u_mob_phone2").attr({value: user_mob_phone2});
                $("#u_city").attr({value: user_city});
                $("#u_street").attr({value: user_street});
                $("#u_building").attr({value: user_building});
                $("#u_porch").attr({value: user_porch});
                $("#u_flat").attr({value: user_flat});
                $("#u_login").attr({value: user_login});

                $("#u_corpus").attr({value: user_corpus});
                $("#u_code_intercom").attr({value: user_code_intercom});
                $("#u_floor").attr({value: user_floor});

              });
      			}
      			else{
      			 $.mobile.changePage('#login_page');
      			}
          },
          error      : function() {
          }
        });
      } else {
        $.mobile.changePage('#login_page');
      }
    },
    error      : function() {}
  });
});
// Update  profile
$(function (){
  $('#user_edit').submit(function(event) {
    var token = $('#token').html();

    event.preventDefault();
    var postData = $(this).serialize();

    $.ajax({
      type       : 'POST',
      url        : "http://vsemoe.com.ua/api/edit_personal_data?auth_token="+ token +"",
      dataType   : 'json',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')),$('.sohanit').addClass('buttonoz_inactive').html('Сохранение...')},
      complete   : function(){$('.sohanit').removeClass('buttonoz_inactive').html('Сохранить')},
      data       : postData,
      success    : function(data) {
        var ttt = (JSON.stringify(data));
        var obj = jQuery.parseJSON(ttt);

        // $.mobile.changePage('#personal_info');
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
		$.mobile.changePage('#personal_info');
		$(".popup_bg").fadeIn(100,function() {
			$(".popwrOfferCreate p").html("Профиль успешно отредактирован");
			$(".popwrOfferCreate").fadeIn(100);
			$(".popwrOfferCreate .toBack").css("display", "none");
			$(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
			$(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
		});		
		}	
      },
      error      : function() {
      }
    });
    return false;
  });
});
// Registration  work
$(function (){
  $('#web_user').submit(function (event) {
    event.preventDefault();
    var postData = $(this).serialize();

    $.ajax({
      type       : 'POST',
      url        : "http://vsemoe.com.ua/api/web_users",
      dataType   : 'json',
      data       : postData,
      success    : function(data) {
        var ttt = (JSON.stringify(data));
        var obj = jQuery.parseJSON(ttt);

        // $.mobile.changePage('#login_page');
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
		$.mobile.changePage('#login_page');
		$(".popup_bg").fadeIn(100,function() {
			$(".popwrOfferCreate p").html("Вы успешно зарегистрировались");
			$(".popwrOfferCreate").fadeIn(100);
			$(".popwrOfferCreate .toBack").css("display", "none");
			$(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
			$(".popwrOfferCreate .left img").attr("src","images/ui/itb.png");
		});		
		}
      },
      error      : function() {
      }
        });

    return false;
  });
});
// Forget password
$(function (){
  $('#forget').submit(function (event) {
    event.preventDefault();
    if ($("#forget input").attr("value") == "" || $("#forget input").attr("value").length < 6 ) {
      $(".popup_bg").fadeIn(100,function() {
        $(".popwrOfferCreate p").html("Email адрес введен некоректно.")
        $(".popwrOfferCreate").fadeIn(100);
        $(".popwrOfferCreate .toBack").css("display", "none");
        $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
        $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png")
      })
    } else{
      var postData = $(this).serialize();
	 
      $.ajax({
        type       : 'POST',
        url        : "http://vsemoe.com.ua/api/create_password",
        dataType   : 'json',
        data       : postData,
        beforeSend : function(){$('a.forgot_pass ').addClass('buttonoz_inactive').html('Отправка...')},
        complete   : function(){$('a.forgot_pass ').removeClass('buttonoz_inactive').html('Отправить')},
        success    : function(data) {
          var ttt = (JSON.stringify(data));
          var obj = jQuery.parseJSON(ttt);
		  
		  var msq  = ttt.substr(0,8);
		  
		  if(msq == '{"error"'){
		  msq = 'Email указан не верно или отсутствует';
		  }
		  else{
		  msq = 'На почту отправлено письмо с инструкцией';	  
		  }
		  $(".popup_bg").fadeIn(100,function() {
          $(".popwrOfferCreate p").html(msq);
          $(".popwrOfferCreate").fadeIn(100);
          $(".popwrOfferCreate .toBack").css("display", "none");
          $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
          $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png")
        });
        },
        error      : function() {
        }
      });
    };
    return false;
  });
});
// Login
$(function (){
  $('#new_web_user').submit(function (event) {
    event.preventDefault();
    var postData = $(this).serialize();
    $.ajax({
      type       : 'POST',
      url        : "http://vsemoe.com.ua/api/tokens",
      dataType   : 'json',
      data       : postData,
      success    : function(data) {
        var token = data.token;
        
        $('#token').html(token);
        localStorage.setItem('token', token);

        $.mobile.changePage('#'+$(".thisPage").html());
      },
      error      : function() {
        $(".popup_bg").fadeIn(100,function() {
          $(".popwrOfferCreate p").html("Логин или пароль введен не правильно.")
          $(".popwrOfferCreate").fadeIn(100);
          $(".popwrOfferCreate .toBack").css("display", "none");
          $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
          $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png")
        });
      }
    });

    return false;
  });
});

// LogOUT
$(function (){
  $('#logoutprof').live("click",function (event) {
    event.preventDefault();

	 var t = $('#token').html();
   localStorage.removeItem("token");
	$.ajax({
      type       : 'DELETE',
      url        : "http://vsemoe.com.ua/api/tokens/"+t,
      dataType   : 'json',
      success    : function(data) {
        $(".popup_bg").fadeIn(100,function() {
          $(".popwrOfferCreate p").html("Вы вышли из системы")
          $(".popwrOfferCreate").fadeIn(100);
          $(".popwrOfferCreate .toBack").css("display", "none");
          $(".popwrOfferCreate .close").css({"float":"none", "margin":"0 auto"});
          $(".popwrOfferCreate .left img").attr("src","images/ui/itb.png")
        });
		$('#token').html("");	
		//$(".content > *").remove();
        $.mobile.changePage('#login_page');
      },
      error      : function() {
      }
    });
	 
	return false;
});

$(document).delegate('#login_page', 'pageshow', function () {
  $('.ui-title').html("Вход");
});

$(document).delegate('#register_page', 'pageshow', function () {
  $('.ui-title').html("Регистрация");
});

$(document).delegate('#forget_password', 'pageshow', function () {
  $('.ui-title').html("Восстановление пароля");
});
  
});	