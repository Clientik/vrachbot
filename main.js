   var l = 0; // Включение логирования
   var d=1; //Включение системы
   var tg=282873776;//идентификатор беседы телеграм
	var VK = require("VK-Promise"),
    vk = new VK(""); //Токен ВК
	var needle = require('needle');
	var TelegramBot = require('node-telegram-bot-api');

	var token = '';//Токен бота
	var bot = new TelegramBot(token, {polling: true});
	vk.longpoll.start(); // Запускаем получение сообщений через LongPoll
 

bot.on('message', (msg) => {
  var text = msg.text;
  //console.log(text);
 if(msg.chat.id==tg){
   if(text == "/start") // Если текст сообщения равен ping
        if(l==0){
          l=1;
         bot.sendMessage(tg, 'LOG ON');
        }else{
         l=0;
         bot.sendMessage(tg, 'LOG OFF');
        }


}
});

bot.on('message', (msg) => {
  var text = msg.text;
  //console.log(text);
 if(msg.chat.id==tg){
   if(text == "/stop") // Если текст сообщения равен ping
        if(d==0){
          d=1;
         bot.sendMessage(tg, 'Система включена');
        }else{
         d=0;
         bot.sendMessage(tg, 'Система отключена');
        }
}
});
vk.on("message",function (event, msg) { // Обрабатываем сообщения
    if(msg.body == "/start") // Если текст сообщения равен ping
        if(l==0){
          l=1;
          msg.send("LOG ON"); // Отвечаем pong
        }else{
         l=0;
         msg.send("LOG OFF"); // Отвечаем pong
        }
});
vk.on("message",function (event, msg) { // Обрабатываем сообщения
    if(msg.body == "/stop") // Если текст сообщения равен ping
        if(d==0){
          d=1;
          msg.send("Система включена"); // Отвечаем pong
        }else{
         d=0;
         msg.send("Система отключена"); // Отвечаем pong
        }
});
function war(text){
	 vk.messages.send({
    user_id:91142925,
	message:text // данные передаваемые API
}).then(function (res) {
    //console.log("response",res);
}).catch(function (error) {
    console.log("Ошибка",error);
});
}
function func() {
 if(d==1){
  var URL = 'https://gorzdrav.spb.ru/api/appointment_list/';
  var id=0;
 var options = 'doctor_form-doctor_id=174&doctor_form-clinic_id=287&doctor_form-patient_id=&doctor_form-history_id=&doctor_form-appointment_type=';
needle.post(URL,options,{headers:{'X-Requested-With':'XMLHttpRequest'},cookie:'_ym_isad=2; _ym_d=1531918440; _gid=GA1.3.694824067.1531918441; _ga=GA1.3.868717076.1531918441; _ym_uid=153191844044752662; csrftoken=NOTPROVIDED'},function(err, res){
    if (err) throw err;

		var body, search, hits, reg;
		body = res.body.success;
		//console.log(body);
		if (body) {
			 console.log("Тебе повезло!");
			 war("ВРАЧ ПОЯВИЛСЯ");
       bot.sendMessage(tg,'ВРАЧ ПОЯВИЛСЯ');
				} else {
			console.log(res.body);
			if(l==1){
			war(JSON.stringify(res.body));	
			bot.sendMessage(tg, JSON.stringify(res.body));	
			 }			
				}
    //console.log(res.statusCode);
});
}
}

setInterval(func, 10000);//60 sec
