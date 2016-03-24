select_chair_not_selected='- Не выбрана -';
select_chair_select='Введите название';
select_city='Город:';
select_city_not_found='Город не найден';
select_city_not_selected='- Не выбран -';
select_city_other_city='- Другой -';
select_city_select='Введите название';
select_class_not_selected='- Не выбран -';
select_country='Страна:';
select_country_full_list='- Полный список -';
select_country_not_found='Страна не найдена';
select_country_not_selected='- Не выбрана -';
select_country_select='Введите страну';
select_district='Район:';
select_district_name='район';
select_district_not_selected='- Не выбран -';
select_eduform1='Дневная';
select_eduform2='Вечерняя';
select_eduform3='Заочная';
select_eduform_not_selected='- Не выбрана -';
select_edustatus_not_selected='- Не выбран -';
select_enter='Введите';
select_error='Ошибка';
select_faculty_name='факультет';
select_fac_not_selected='- Не выбран -';
select_fac_select='Введите название';
select_house='Номер дома:';
select_house_not_found='Дом не найден';
select_house_not_selected='- Не выбран -';
select_house_select='Введите номер';

function resizeApp() {
  var newHeight = ge("content") ? ge("content").offsetHeight : 450;

  if(window.height_app != newHeight) {
    debugLog('change');
    window.height_app = newHeight;
    
   
    VK.callMethod("resizeWindow", 627, window.height_app);
    VK.callMethod("scrollSubscribe", window.height_app);
  }
}

var slide_show = function(elem) {
  if (!isVisible(elem)) 
    slideDown(elem, 150);
};

var slide_hide = function(elem) {
  if (isVisible(elem)) 
    slideUp(elem, 150);
};

function domReady() {

  setCookie('remixlang', App.lang);
  window.headNode = geByTag1('head');

  window.getScroll = function() { return 0; };
  window.updSideTopLink = function() { return 0; };

  extend(window, {
    bodyNode: geByTag1('body'),
    htmlNode: geByTag1('html'),
    _tbLink: {}
  });

  window.scrollNode = browser.msie6 ? pageNode : ((browser.chrome || browser.safari) ? bodyNode : htmlNode);
  setInterval(resizeApp, 200); 

  stats.preinit(); 

  cur.uiAgeFrom = new Dropdown(ge('ageFrom'), getAgeFromData(), {
    zeroPlaceholder: true,
    placeholderColor: '#777',
    width: 70,
    selectedItem: '',
    onChange: function(value){
      cur.uiAgeTo.setData(getAgeToData(value));
      followers.result();
    }
  });

  cur.uiAgeTo = new Dropdown(ge('ageTo'), getAgeToData(), {
    zeroPlaceholder: true,
    placeholderColor: '#777',
    width: 70,
    selectedItem: '',
    onChange: function(value){
      cur.uiAgeFrom.setData(getAgeFromData(value));
      followers.result();
    }
  });

  cur.uiStatuses = new Dropdown(ge('status'), cur.mStatuses, {
    zeroPlaceholder: true,
    placeholderColor: '#777',
    selectedItems: '',
    width: 150,
    onChange: followers.result
  });

  cur.onlineCB = new Checkbox(ge('online'), {
    width: 150,
    label: '<span style="font-size:11px;">сейчас на сайте</div>',
    onChange: followers.result
  });

  cur.only_photoCB = new Checkbox(ge('only_photo'), {
    width: 150,
    label: '<span style="font-size:11px;">только с фото</div>',
    onChange: followers.result
  });

  cur.deletedCB = new Checkbox(ge('deleted'), {
    width: 150,
    label: '<span style="font-size:11px;">удаленные страницы</div>',
    onChange: followers.result
  });


  var addrFilterSelData = {"countries":[["2","Украина"],[1,"Россия"],[3,"Беларусь"],[4,"Казахстан"],[5,"Азербайджан"],[6,"Армения"],[7,"Грузия"],[11,"Кыргызстан"],[15,"Молдова"],[16,"Таджикистан"],[17,"Туркменистан"],[18,"Узбекистан"],[19,"Австралия"],[20,"Австрия"],[21,"Албания"],[22,"Алжир"],[23,"Американское Самоа"],[24,"Ангилья"],[25,"Ангола"],[26,"Андорра"],[27,"Антигуа и Барбуда"],[28,"Аргентина"],[29,"Аруба"],[30,"Афганистан"],[31,"Багамы"],[32,"Бангладеш"],[33,"Барбадос"],[34,"Бахрейн"],[35,"Белиз"],[36,"Бельгия"],[37,"Бенин"],[38,"Бермуды"],[39,"Болгария"],[40,"Боливия"],[235,"Бонайре, Синт-Эстатиус и Саба"],[41,"Босния и Герцеговина"],[42,"Ботсвана"],[43,"Бразилия"],[44,"Бруней-Даруссалам"],[45,"Буркина-Фасо"],[46,"Бурунди"],[47,"Бутан"],[48,"Вануату"],[233,"Ватикан"],[49,"Великобритания"],[50,"Венгрия"],[51,"Венесуэла"],[52,"Виргинские острова, Британские"],[53,"Виргинские острова, США"],[54,"Восточный Тимор"],[55,"Вьетнам"],[56,"Габон"],[57,"Гаити"],[58,"Гайана"],[59,"Гамбия"],[60,"Гана"],[61,"Гваделупа"],[62,"Гватемала"],[63,"Гвинея"],[64,"Гвинея-Бисау"],[65,"Германия"],[66,"Гибралтар"],[67,"Гондурас"],[68,"Гонконг"],[69,"Гренада"],[70,"Гренландия"],[71,"Греция"],[72,"Гуам"],[73,"Дания"],[231,"Джибути"],[74,"Доминика"],[75,"Доминиканская Республика"],[76,"Египет"],[77,"Замбия"],[78,"Западная Сахара"],[79,"Зимбабве"],[8,"Израиль"],[80,"Индия"],[81,"Индонезия"],[82,"Иордания"],[83,"Ирак"],[84,"Иран"],[85,"Ирландия"],[86,"Исландия"],[87,"Испания"],[88,"Италия"],[89,"Йемен"],[90,"Кабо-Верде"],[91,"Камбоджа"],[92,"Камерун"],[10,"Канада"],[93,"Катар"],[94,"Кения"],[95,"Кипр"],[96,"Кирибати"],[97,"Китай"],[98,"Колумбия"],[99,"Коморы"],[100,"Конго"],[101,"Конго, демократическая республика"],[102,"Коста-Рика"],[103,"Кот д`Ивуар"],[104,"Куба"],[105,"Кувейт"],[138,"Кюрасао"],[106,"Лаос"],[12,"Латвия"],[107,"Лесото"],[108,"Либерия"],[109,"Ливан"],[110,"Ливия"],[13,"Литва"],[111,"Лихтенштейн"],[112,"Люксембург"],[113,"Маврикий"],[114,"Мавритания"],[115,"Мадагаскар"],[116,"Макао"],[117,"Македония"],[118,"Малави"],[119,"Малайзия"],[120,"Мали"],[121,"Мальдивы"],[122,"Мальта"],[123,"Марокко"],[124,"Мартиника"],[125,"Маршалловы Острова"],[126,"Мексика"],[127,"Микронезия, федеративные штаты"],[128,"Мозамбик"],[129,"Монако"],[130,"Монголия"],[131,"Монтсеррат"],[132,"Мьянма"],[133,"Намибия"],[134,"Науру"],[135,"Непал"],[136,"Нигер"],[137,"Нигерия"],[139,"Нидерланды"],[140,"Никарагуа"],[141,"Ниуэ"],[142,"Новая Зеландия"],[143,"Новая Каледония"],[144,"Норвегия"],[145,"Объединенные Арабские Эмираты"],[146,"Оман"],[147,"Остров Мэн"],[148,"Остров Норфолк"],[149,"Острова Кайман"],[150,"Острова Кука"],[151,"Острова Теркс и Кайкос"],[152,"Пакистан"],[153,"Палау"],[154,"Палестинская автономия"],[155,"Панама"],[156,"Папуа - Новая Гвинея"],[157,"Парагвай"],[158,"Перу"],[159,"Питкерн"],[160,"Польша"],[161,"Португалия"],[162,"Пуэрто-Рико"],[163,"Реюньон"],[164,"Руанда"],[165,"Румыния"],[9,"США"],[166,"Сальвадор"],[167,"Самоа"],[168,"Сан-Марино"],[169,"Сан-Томе и Принсипи"],[170,"Саудовская Аравия"],[171,"Свазиленд"],[172,"Святая Елена"],[173,"Северная Корея"],[174,"Северные Марианские острова"],[175,"Сейшелы"],[176,"Сенегал"],[177,"Сент-Винсент"],[178,"Сент-Китс и Невис"],[179,"Сент-Люсия"],[180,"Сент-Пьер и Микелон"],[181,"Сербия"],[182,"Сингапур"],[234,"Синт-Мартен"],[183,"Сирийская Арабская Республика"],[184,"Словакия"],[185,"Словения"],[186,"Соломоновы Острова"],[187,"Сомали"],[188,"Судан"],[189,"Суринам"],[190,"Сьерра-Леоне"],[191,"Таиланд"],[192,"Тайвань"],[193,"Танзания"],[194,"Того"],[195,"Токелау"],[196,"Тонга"],[197,"Тринидад и Тобаго"],[198,"Тувалу"],[199,"Тунис"],[200,"Турция"],[201,"Уганда"],[202,"Уоллис и Футуна"],[203,"Уругвай"],[204,"Фарерские острова"],[205,"Фиджи"],[206,"Филиппины"],[207,"Финляндия"],[208,"Фолклендские острова"],[209,"Франция"],[210,"Французская Гвиана"],[211,"Французская Полинезия"],[212,"Хорватия"],[213,"Центрально-Африканская Республика"],[214,"Чад"],[230,"Черногория"],[215,"Чехия"],[216,"Чили"],[217,"Швейцария"],[218,"Швеция"],[219,"Шпицберген и Ян Майен"],[220,"Шри-Ланка"],[221,"Эквадор"],[222,"Экваториальная Гвинея"],[223,"Эритрея"],[14,"Эстония"],[224,"Эфиопия"],[226,"Южная Корея"],[227,"Южно-Африканская Республика"],[232,"Южный Судан"],[228,"Ямайка"],[229,"Япония"]],"country":"","cities":[],"city":"","city_info":{"city":0,"completed_streets":1,"completed_schools":1,"completed_universities":1,"stations":[],"districts":[]},"district":0,"station":null,"street_val":[""],"street":null,"house":[""],"place":[""]};

  selectsData.setCountries(addrFilterSelData.countries);

  cur.uiCity = new CitySelect(ge('city'), ge('cCity'), {
    show: slide_show,
    hide: slide_hide,
    width: 150,
    city: 0,
    country: 0,
    introText: 'Введите название',
    placeholder: 'Выбор города',
    zeroPlaceholder: true,
    placeholderColor: '#777',
    noResult: 'Городов не найдено',
    otherCity: 'Другой город',
    maxItemsShown: function(query_length) {
      if (query_length > 6) {
        return 500;
      } else {
        return 300;
      }
    },
    onChange: followers.result
  });

  cur.uiCountry = new CountrySelect(ge('country'), ge('cCountry'), {
    show: slide_show,
    hide: slide_hide,
    width: 150,
    country: 0,
    placeholder: 'Выбор страны',
    placeholderColor: '#777',
    autocomplete: 1,
    noDefaultCountry: 1,
    full_list: '',
    citySelect: cur.uiCity,
    onChange: followers.result
  });

  window.radioBtns['sex'] = {
    els: Array.prototype.slice.apply(geByClass('radiobtn', ge('cSex'))),
    val: 0
  }

  if(!App.user_id) 
    friends.show();
  else  
    followers.init(App.user_id, App.api_result.response.friends_gen[0].first_name+" "+App.api_result.response.friends_gen[0].last_name);

}

function getAgeFromData(max) {
  max = parseInt(max);
  if (!max > 0) 
    max = 80;
  return getRangeData(12, max, 1, 'от ', 'От');
}

function getAgeToData(min) {
  min = parseInt(min);
  if (!min > 0) 
    min = 12;
  return getRangeData(min, 80, 1, 'до ', 'До');
}

function getRangeData(min, max, step, prefix, label) {
  if (min > max) 
    return false;
  var ret = [[0, label]];
  if (step < 0) {
    for (var i = max; i >= min; i += step)
      ret.push([i, prefix + i]);
  } else if (step > 0) {
    for (var i = min; i <= max; i += step)
      ret.push([i, prefix + i]);
  }
  return ret;
}

cur.mStatuses = [
  [0, 'Выбор статуса'],
  [1, 'Не женат'],
  [2, 'Есть подруга'],
  [3, 'Помолвлен'],
  [4, 'Женат'],
  [7, 'Влюблён'],
  [5, 'Всё сложно'],
  [6, 'В активном поиске']
];

cur.fmStatuses = [
  [0, 'Выбор статуса'],
  [1, 'Не замужем'],
  [2, 'Есть друг'],
  [3, 'Помолвлена'],
  [4, 'Замужем'],
  [7, 'Влюблена'],
  [5, 'Всё сложно'],
  [6, 'В активном поиске']
];



function onSexChanged(value){
  ge('c[sex]').value = value;
  var selectedStatuses = cur.uiStatuses.val();
  var statusesData = (value == 1) ? cur.fmStatuses : cur.mStatuses;
  cur.uiStatuses.setData(statusesData);
  if (selectedStatuses) {
    cur.uiStatuses.clear();
    var arr = selectedStatuses.split(',');
    for (var i = 0; i < arr.length; i++) 
      cur.uiStatuses.selectItem(arr[i]);
    
  }
  followers.result();
}

function block(block) {
  if(cur.block == block)
    return; 
     
  var arr = ['profile_view_as', 'search_content'];
  for(var i in arr) {
    if(arr[i] == block)
      continue;

    hide(arr[i]);
    removeClass(arr[i]+"_tab", "active_link");
  }

  show(block);
  show(block+"_tab");
  addClass(block+"_tab", "active_link");
  cur.block = block;
}

function sub_block(block) {
  if(cur.sub_block == block)
    return;
  
  var arr = ['followers', 'stats'];
  var arr_names = {'followers': 'Подписчики', 'stats': 'Аудитория'};
  for(var i in arr) {
    if(arr[i] == block)
      continue;
    hide(arr[i]);
    removeClass('search_'+arr[i]+'_tab', "active");
  }
  ge('main_tab_word').innerHTML = arr_names[block];
  show(block);
  addClass('search_'+block+'_tab', "active");
  cur.sub_block = block;
}

var api = {
  _headId: null,
  _callbacks: {},
  attachScript: function(url) {
    if (!api._headId) 
      api._headId = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.setAttribute('encoding', 'UTF-8');
    newScript.src = url;
    api._headId.appendChild(newScript);
  },
  call: function(method, params, cb, queryTry) {
    var query = params || {}, qs, responseCb;
    if (typeof query != 'object' || typeof cb != 'function') {
             return false;
    }

    var rnd = parseInt(Math.random() * 10000000);
    while (api._callbacks[rnd])
      rnd = parseInt(Math.random() * 10000000); 
    
    query['callback'] = 'api._callbacks['+rnd+']';
    query['access_token'] = App.access_token;
    qs = this.encode(query);

    responseCb = function(response) {
      cb(response);
      delete api._callbacks[rnd];
    };

    api._callbacks[rnd] = responseCb;
    api.attachScript("https://api.vkontakte.ru/method/"+method+"?" + qs);
  },
  encode: function(params) {
    var  pairs = [], key;
    for(key in params) 
      if (key != 'user') 
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    pairs.sort();
    return pairs.join('&');
  }
}

var userFunction = {
  age: function(bday,bmo,byr) {
      var bday=parseInt(bday);
      var bmo=(parseInt(bmo)-1);
      var byr=parseInt(byr);
      var byr;
      var age;
      var now = new Date();
      tday=now.getDate();
      tmo=(now.getMonth());
      tyr=(now.getFullYear());

      if((tmo > bmo)||(tmo==bmo & tday>=bday))
          age=byr;
      else
          age=byr+1;
  
      return tyr-age;
  },

  units: function(num, cases) {
    num = Math.abs(num);
    var word = '';
    if (num.toString().indexOf('.') > -1) {
        word = cases[0];
    } else { 
        word = (
            num % 10 == 1 && num % 100 != 11 
                ? cases[0]
                : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) 
                    ? cases[1]
                    : cases[2]
        );
    }
    
    return word;
  },

  numFormat: function(n, d, s) {
    if (arguments.length == 2) { s = " "; }
    if (arguments.length == 1) { s = " "; d = "."; }
    n = n.toString();
    a = n.split(d);
    x = a[0];
    y = a[1];
    z = "";
    if (typeof(x) != "undefined") {
    for (i=x.length-1;i>=0;i--)
      z += x.charAt(i);
    z = z.replace(/(\d{3})/g, "$1" + s);
    if (z.slice(-s.length) == s)
      z = z.slice(0, -s.length);
    x = "";
    for (i=z.length-1;i>=0;i--)
      x += z.charAt(i);
    if (typeof(y) != "undefined" && y.length > 0)
      x += d + y;
    }
    return x;
  }, 

  parseLatin: function(text){
    var outtext = text;
    var lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"];
    var rus1 = ['ё', 'ж', 'х', 'ц', 'ч', 'щ',  'щ',   'ш', 'э', 'ю', 'я', 'Ё', 'Ж', 'Х', 'Ц', 'Ч', 'Щ',  'Щ',   'Ш', 'Э', 'Ю', 'Я', 'ь'];
    for (var i = 0, l = lat1.length; i < l; i++) {
    outtext = outtext.split(lat1[i]).join(rus1[i]);
    }
    var lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ';
    var rus2 = 'абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ';
    for (var i = 0, l = lat2.length; i < l; i++) {
    outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i));
    }
    return outtext;
  },

  parseLatKeys: function(text) {
    var outtext = text, i,
      lat1 = ['yo','zh','kh','ts','ch','sch','shch','sh','eh','yu','ya','YO','ZH','KH','TS','CH','SCH','SHCH','SH','EH','YU','YA',"'"],
      rus1 = ['ё', 'ж', 'х', 'ц', 'ч', 'щ',  'щ',   'ш', 'э', 'ю', 'я', 'Ё', 'Ж', 'Х', 'Ц', 'Ч', 'Щ',  'Щ',   'Ш', 'Э', 'Ю', 'Я', 'ь'],
      lat2 = 'abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ',
      rus2 = 'абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ';
    for (i = 0; i < rus1.length; i++) {
      outtext = outtext.split(rus1[i]).join(lat1[i]);
    }
    for (i = 0; i < rus2.length; i++) {
      outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i));
    }
    return outtext;
  },

  stripHTML: function(str) {
    str = str.split("<").join("&lt;");
    return str.split(">").join("&rt;");;
  }

};



var friends = {
  init: function() {
    if(cur.friends && cur.friends.load)
      return;
    delete cur.friends;
    //server.init();
    cur.friends = {load: true, arr: []};

    friends.show();

    var r = App.api_result;
    i = r.response.friends[1] ? 1 : 0; 

    cur.friends.arr.push({
      uid: r.response.friends[i].uid,
      first_name: r.response.friends[i].first_name.toLowerCase(),
      last_name: r.response.friends[i].last_name.toLowerCase(),
      photo: r.response.friends[i].photo_rec,
      online: 2,
      name_case: r.response.friends_gen[i].first_name+" "+r.response.friends_gen[i].last_name
    });

    ge('friends_list').innerHTML = '<div class="wide_loading" style="background: url(\'http://vk.com/images/progress7.gif\') center center no-repeat;height: 300px;"></div>';

    var code = 'return {friends: API.friends.get({fields:"photo_rec,online,screen_name"}), friends_gen: API.friends.get({fields:"first_name",name_case:"gen"})};';
    
    VK.api('execute', {code:code}, function(r){
      if(r.response) {
        for(var i in r.response.friends) {
          cur.friends.arr.push({
              uid: r.response.friends[i].uid,
              first_name: r.response.friends[i].first_name.toLowerCase(),
              last_name: r.response.friends[i].last_name.toLowerCase(),
              photo: r.response.friends[i].photo_rec,
              online: intval(r.response.friends[i].online),
              name_case: r.response.friends_gen[i].first_name+" "+r.response.friends_gen[i].last_name
          });
        }
      }
      friends.result(); 
    });
  }, 

  result: function() {
    if(friends.timeOut) 
      friends.timeOut = window.clearTimeout(friends.timeOut);

    cur.friends.result = false; 
    cur.friends.page = 1;
    cur.friends.search_count = 1;
 
    var result = /^((http:\/\/)?(vkontakte.ru|vk.com)\/)?((id)?([a-z0-9_.]+))/i.exec( ge('friends_query').value );
    ge('search_list').innerHTML = "";
    if(result) {
      show('friends_query_progress');
      result = result[result.length-1];
      if(intval(result) && intval(result) == result) {
        var code = 'return {profile: API.getProfiles({fields:"photo_rec,online,screen_name", uids:"'+intval(result)+'"})[0], profile_gen: API.getProfiles({uids:"'+intval(result)+'", name_case:"gen"})[0]};';
      } else {
        var code = "var screen = API.resolveScreenName({screen_name:\""+userFunction.stripHTML(result)+"\"}); if(screen.type == \"user\") return {profile: API.getProfiles({fields:\"photo_rec,online,screen_name\", uids:screen.object_id})[0], profile_gen: API.getProfiles({uids:screen.object_id, name_case:\"gen\"})[0]}; else return {};";
      }

      VK.api('execute', {code: code}, function(r) {
        if(r.response) {
          if(r.response.profile) {
            var user = {
              uid: r.response.profile.uid,
              photo: r.response.profile.photo_rec,
              first_name: r.response.profile.first_name,
              last_name: r.response.profile.last_name,
              online: r.response.profile.online,
              name_case: r.response.profile_gen.first_name+" "+r.response.profile_gen.last_name
            };

            ge('search_list').innerHTML = '<div class="im_friend" onclick="followers.init('+user.uid+',\''+user.name_case+'\')"><img src="'+user.photo+'" class="fl_l" width="32" height="32"><div class="fl_l"><nobr>'+user.first_name.substr(0,1).toUpperCase()+user.first_name.substr(1)+' '+user.last_name.substr(0,1).toUpperCase()+user.last_name.substr(1)+'</nobr></div><div class="online fl_l">'+(user.online ? 'online' : '')+'</div></div>';

            if(!cur.friends.search_count) 
              ge('friends_list').innerHTML = '';
            else 
              ge('search_list').innerHTML += '<div id="ts_search_sep" style="border-top: 0px solid #E0E1E2;">Поиск по друзьям</div>';
          }
        }
        hide('friends_query_progress');
      });
    } else 
      ge('search_list').innerHTML = "";

    var where = false, search_true;
    if(trim(ge('friends_query').value)) {
        var str = App.lang == 3 ? userFunction.parseLatKeys(trim(ge('friends_query').value)).toLowerCase().split(' ') : userFunction.parseLatin(trim(ge('friends_query').value)).toLowerCase().split(' ');
        where = {
          str: str,
          count:[
            (str[0] ? str[0].length : 0), 
            (str[1] ? str[1].length : 0)
          ]
        };
    }

    cur.friends.result = [];
    for(var i in cur.friends.arr) {
      if(where) {
        search_true = true; 

        if(cur.friends.arr[i].first_name.substr(0,where.count[0]) != where.str[0] && cur.friends.arr[i].last_name.substr(0,where.count[0]) != where.str[0])
          search_true = false;

        if(where.str[1] && cur.friends.arr[i].first_name.substr(0,where.count[1]) != where.str[1] && cur.friends.arr[i].last_name.substr(0,where.count[1]) != where.str[1])
          search_true = false; 
                
        if(search_true == false) 
          continue;
      }
      cur.friends.result.push(cur.friends.arr[i]);
    }

    cur.friends.result = cur.friends.result.sort(function(a,b) {
        if(a.online > b.online)
          return -1;
        if(a.online < b.online)
          return 1;
        return 0;
    });

    cur.friends.max_page = cur.friends.result.length == 0 ? 1 : intval(Math.ceil(cur.friends.result.length / 50));
    cur.friends.search_count = intval(cur.friends.result.length);
    
    if(cur.friends.search_count) {
      friends.print();
    } else {
      if(ge('ts_search_sep')) {
        ge('friends_list').innerHTML = "";
        hide('ts_search_sep');
      } else
        ge('friends_list').innerHTML = '<div id="not_found" class="info_msg f_search" style="display: block;padding: 130px 10px;background: #F7F7F7;border: 1px solid #CCC;margin: 20px;text-align: center;font-size: 12px;color: #777;border-image: initial;"><span class="by_search">Не найдено ни одного друга.</span></div><br style="clear:both;" />';      
    }
  },

  print: function() {
    if(cur.friends.loading || !cur.friends.result || cur.friends.page > cur.friends.max_page)
      return;

    cur.friends.loading = true;
    if(cur.friends.page == 1) 
        ge('friends_list').innerHTML = "";

    for (var i = 50*(cur.friends.page-1); i < Math.min(cur.friends.result.length, 50*cur.friends.page); i++) {
   
      ge('friends_list').innerHTML += '<div class="im_friend" onclick="followers.init('+cur.friends.result[i].uid+',\''+cur.friends.result[i].name_case+'\')"><img src="'+cur.friends.result[i].photo+'" class="fl_l" width="32" height="32"><div class="fl_l"><nobr>'+cur.friends.result[i].first_name.substr(0,1).toUpperCase()+cur.friends.result[i].first_name.substr(1)+' '+cur.friends.result[i].last_name.substr(0,1).toUpperCase()+cur.friends.result[i].last_name.substr(1)+'</nobr></div><div class="online fl_l">'+(cur.friends.result[i].online ? 'online' : '')+'</div></div>';
    }


    cur.friends.page++;  
    cur.friends.loading = false;
  },

  show: function() {
    friends.init();
    block('profile_view_as');
    VK.removeCallback("onScroll");
    VK.addCallback("onScroll", function(r) {
      if(cur.friends && cur.friends.result && cur.friends.result.length && ((ge("content") ? ge("content").offsetHeight : 500) - r) < 1000)
          friends.print();
    });
  },

  onkey: function() {

    if(ge('friends_query').value)
      hide('input_friends_q');
    else {
      show('input_friends_q');
      animate('input_friends_q', {color:"#C0C8D0"}, 200); 
    }

    if(cur.friends.search_value != ge('friends_query').value) {
      if(cur.friends.timeOut) 
        cur.friends.timeOut = window.clearTimeout(cur.friends.timeOut);

      cur.friends.timeOut = window.setTimeout(friends.result, 200);
      cur.friends.search_value = ge('friends_query').value;
    }
  },

  search_click: function() {
    if(ge('friends_query').value) 
      hide('input_friends_q');
     else {
      show('input_friends_q');
      animate('input_friends_q', {color:"#C0C8D0"}, 200); 
    }
    ge('friends_query').focus();
  },

  onblur: function() {
    if(ge('friends_query').value == '') {
      show('input_friends_q');
      animate('input_friends_q', {color:"#777"}, 200); 
    }
  }
}

var followers = {
  init: function(id,user) {
    
    sub_block('followers');
    followers.show();
    if(cur.followers && cur.followers.uid == id)
      return; 

    cur.stats = {};
    ge('search_content_title').innerHTML = user;
    show('feed_progress');
    hide('search_section_tabs');
    ge('feed_summary').innerHTML = "Загрузка";
    ge('results').innerHTML = '<div id="not_found" class="info_msg f_search" style="display: block;padding: 130px 10px;background: #F7F7F7;border: 1px solid #CCC;margin: 15px 5px;text-align: center;font-size: 12px;color: #777;border-image: initial;"><span class="by_search">В данный момент приложение загружает всех подписчиков. <br />Когда часть подписчиков будет загружена, Вы сможете начать поиск.</span></div>';


    for(var i in api._callbacks) {
      var responseCb = function(response) {
        delete api._callbacks[i];
      };
      api._callbacks[i] = responseCb;
    }

    App.user_id = id;

    cur.followers = {
      uid: id,
      count: 0,
      offset: 0,
      complete: false,
      arr: [],
      result: [],
      first: true
    }; 

    api.call('subscriptions.getFollowers', {count: 1, uid: cur.followers.uid, offset: 0}, function(r) {
      cur.followers.count = r.response ? intval(r.response.count) : 0;
      followers.get_users();  
    });
  },

  get_users: function() {

    if(cur.followers.count > cur.followers.offset) {
      followers.result();

      ge('feed_summary').innerHTML = "Осталось загрузить "+userFunction.numFormat(cur.followers.count-cur.followers.offset)+" подписчиков";
      show('feed_progress');

      var code = 'var a = []; var p = []; var i = 0; var o = '+intval(cur.followers.offset)+'; var uid = '+intval(cur.followers.uid)+';var fields = "sex,education,online,bdate,photo_medium_rec,city,country,rate,relation"; while(i < 1) { a = API.subscriptions.getFollowers({uid: uid, offset: o, count: 1000}); if(parseInt(a.users[0]) == 0) return p; p = p + API.getProfiles({uids: a.users, fields:fields}); o = o + 1000; if (parseInt(a.users[999]) == 0) return p; i = i+1; } return p;';
      
      api.call('execute', {code:code}, function(r) {
        if(r.response) {
          
          var year_old, date, day, month, year; 
          for(var i in r.response) {
            year_old = 0; 
            if(r.response[i].bdate) {
              date = r.response[i].bdate.toString().split ( '.' );
              day = intval(date[0]);
              month = intval(date[1]);
              year = intval(date[2]);

              if(day && month && year)
                year_old = intval(userFunction.age(day, month, year));
              else
                year_old = 0;
            }  
            cur.followers.arr.push({
              uid: r.response[i].uid,
              first_name: r.response[i].first_name.toLowerCase(),
              last_name: r.response[i].last_name.toLowerCase(),
              photo: r.response[i].photo_medium_rec,
              sex: r.response[i].sex == 1 ? 1 : 2,
              online: intval(r.response[i].online),
              year: intval(year_old),
              city: intval(r.response[i].city),
              country: intval(r.response[i].country),
              rate: intval(r.response[i].rate),
              relation: intval(r.response[i].relation)
            });
          }

          cur.followers.offset += r.response.length;
          followers.get_users(); 
        }
      });

    } else {
      hide('feed_progress');
      cur.followers.complete = true;
      
      if(cur.followers.count > 10) 
        show('search_section_tabs');  
  
      followers.result();
      
    }
  },

  result: function(first) {
    if(cur.followers.timeOut) 
        cur.followers.timeOut = window.clearTimeout(cur.followers.timeOut);

    if(cur.followers.loading_result) {
      cur.followers.timeOut = window.setTimeout(followers.result, 200);
      return 0; 
    }
    sub_block('followers');

    cur.followers.loading_result = true;
    show('search_query_progress');

    cur.followers.page = 1;
    delete cur.followers.result;
    cur.followers.result = [];

    if(first)
      cur.followers.first = true;
    else
      cur.followers.first = false;

    if(cur.followers.count && cur.followers.offset > 0) {

      var where = {}; 

      if(intval(ge('c[age_from]').value))
        where['age_from'] = intval(ge('c[age_from]').value);
      if(intval(ge('c[age_to]').value))
        where['age_to'] = intval(ge('c[age_to]').value);
      if(intval(ge('c[country]').value))
        where['country'] = intval(ge('c[country]').value);
      if(intval(ge('c[city]').value))
        where['city'] = intval(ge('c[city]').value);
      if(intval(ge('c[status]').value))
        where['status'] = intval(ge('c[status]').value);
      if(intval(ge('c[online]').value))
        where['online'] = 1;
      if(intval(ge('c[only_photo]').value))
        where['only_photo'] = 1;
      if(intval(ge('c[deleted]').value) == 0)
        where['deleted'] = 1;
      if(intval(ge('c[sex]').value))
        where['sex'] = intval(ge('c[sex]').value);
      if(trim(ge('search_query').value)) {
        var str = App.lang == 3 ? userFunction.parseLatKeys(trim(ge('search_query').value)).toLowerCase().split(' ') : userFunction.parseLatin(trim(ge('search_query').value)).toLowerCase().split(' ');
        where['search'] = {
          str: str,
          count:[
            (str[0] ? str[0].length : 0), 
            (str[1] ? str[1].length : 0)
          ]
        };
      }
      var search_true = true;
      main:
      for(var i in cur.followers.arr) {
        for(var it in where) {
          switch(it) {
            case 'age_from': {
              if(cur.followers.arr[i].year < where[it])
                continue main;
              break;
            }
            case 'age_to': {
              if(cur.followers.arr[i].year > where[it])
                continue main;
              break;
            }
            case 'only_photo': {
              if(cur.followers.arr[i].photo == 'http://vkontakte.ru/images/camera_b.gif')
                continue main;
              break;
            }
            case 'deleted': {
              if(cur.followers.arr[i].photo == 'http://vk.com/images/deactivated_b.gif')
                continue main;
              break;
            }
            case 'country': {
              if(cur.followers.arr[i].country != where[it])
                continue main;
              break;
            }
            case 'city': {
              if(cur.followers.arr[i].city != where[it])
                continue main;
              break;
            }
            case 'status': {
              if(cur.followers.arr[i].relation != where[it])
                continue main;
              break;
            }
            case 'online': {
              if(cur.followers.arr[i].online != 1)
                continue main;
              break;
            }
            case 'sex': {
              if(cur.followers.arr[i].sex != where[it])
                continue main;
              break;
            }
            case 'search': {
              search_true = true; 

              if(cur.followers.arr[i].first_name.substr(0,where[it].count[0]) != where[it].str[0] && cur.followers.arr[i].last_name.substr(0,where[it].count[0]) != where[it].str[0])
                search_true = false;

              if(where[it].str[1] && cur.followers.arr[i].first_name.substr(0,where[it].count[1]) != where[it].str[1] && cur.followers.arr[i].last_name.substr(0,where[it].count[1]) != where[it].str[1])
                search_true = false; 
                
              if(search_true == false) 
                continue main;
              break;
            }
          }
        }
        cur.followers.result.push(cur.followers.arr[i]);        
      }

      if(cur.followers.result.length) {
        
        var count_new = userFunction.numFormat(intval(cur.followers.result.length));
        if(cur.followers.complete) 
          ge('feed_summary').innerHTML = userFunction.units(cur.followers.result.length,['Выбран '+count_new+' подписчик','Выбрано '+count_new+' подписчика','Выбрано '+count_new+' подписчиков']);

        cur.followers.max_page = Math.ceil(intval(cur.followers.result.length)/20) == 0 ? 1 : Math.ceil(intval(cur.followers.result.length)/20);
        followers.print();

      } else 
        followers.not_found();
    } else 
      followers.not_found();

    hide('search_query_progress');
    cur.followers.loading_result = false;
  },

  not_found: function() {
    if(cur.followers.complete) 
      ge('feed_summary').innerHTML = "Подписчики не найдены";
    ge('results').innerHTML = '<div id="not_found" class="info_msg f_search" style="display: block;padding: 130px 10px;background: #F7F7F7;border: 1px solid #CCC;margin: 15px 5px;text-align: center;font-size: 12px;color: #777;border-image: initial;"><span class="by_search">Подписчики по данному запросу не найдены.</span></div>';
  },

  print: function() {
    if(cur.followers.loading || !cur.followers.result || cur.followers.page > cur.followers.max_page)
      return;
    cur.followers.loading = true;

    show('search_query_progress');
    if(cur.followers.page == 1) 
      ge('results').innerHTML = "";
      
    var user = [], year;
    for (var i = (cur.followers.page-1)*20; i < Math.min(cur.followers.result.length, cur.followers.page*20); i++) {

      user = [];

      user.push(cur.followers.result[i].first_name.substr(0,1).toUpperCase()+cur.followers.result[i].first_name.substr(1).toLowerCase());
      user.push(cur.followers.result[i].last_name.substr(0,1).toUpperCase()+cur.followers.result[i].last_name.substr(1).toLowerCase());

      if(ge('search_query').value) {
        var str = trim(ge('search_query').value).split(' ');

        for(var it in str) {
          str[it] = App.lang == 3 ? userFunction.parseLatKeys(str[it].substr(0,1).toUpperCase()+str[it].substr(1).toLowerCase()) : userFunction.parseLatin(str[it].substr(0,1).toUpperCase()+str[it].substr(1).toLowerCase());
          for(var itt in user)
            if(user[itt].indexOf( str[it], 0 ) == 0)
              user[itt] = "<em>"+str[it]+"</em>"+user[itt].substr(str[it].length);
        }

      }

      year = cur.followers.result[i].year ? (cur.followers.result[i].year+' '+userFunction.units(cur.followers.result[i].year,['год','года','лет'])) : '';

      ge('results').innerHTML += '<div class="people_row three_col_row clear_fix" style="font-size:11px;"><div class="img fl_l"><a target="_blank" href="http://vk.com/id'+cur.followers.result[i].uid+'"><img src="'+cur.followers.result[i].photo+'"></a></div><div class="info fl_l"><div class="labeled name"><a href="http://vk.com/id'+cur.followers.result[i].uid+'" target="_blank">'+user[0]+' '+user[1]+'</a></div><div class="labeled "></div><div class="labeled ">'+year+'</div><div class="online">'+(cur.followers.result[i].online ? 'Online' : '')+'</div></div></div>';
    }
        
    cur.followers.page++;  
    cur.followers.loading = false;
    hide('search_query_progress');
  },

  show: function(f) {
    block('search_content');
    if(!f && cur.sub_block == 'stats')
      stats.init();
    else
      sub_block('followers');
    
    VK.removeCallback("onScroll");
    VK.addCallback("onScroll", function(r) {
      if(cur.followers.result.length && ((ge("content") ? ge("content").offsetHeight : 500) - r) < 1000)
          followers.print();
    });
  },

  onkey: function() {
    sub_block('followers');
    if(ge('search_query').value)
      hide('input_search_q');
    else {
      show('input_search_q');
      animate('input_search_q', {color:"#C0C8D0"}, 200); 
    }

    if(cur.followers.search_value != ge('search_query').value) {
      if(cur.followers.timeOut) 
        cur.followers.timeOut = window.clearTimeout(cur.followers.timeOut);

      cur.followers.timeOut = window.setTimeout(followers.result, 200);
      cur.followers.search_value = ge('search_query').value;
    }
  },

  search_click: function() {
    if(ge('search_query').value) 
      hide('input_search_q');
     else {
      show('input_search_q');
      animate('input_search_q', {color:"#C0C8D0"}, 200); 
    }
    ge('search_query').focus();
  },

  onblur: function() {
    if(ge('search_query').value == '') {
      show('input_search_q');
      animate('input_search_q', {color:"#777"}, 200); 
    }
  }
};

var stats = {
  init: function() {
    sub_block('stats');
    VK.removeCallback("onScroll");
    if(cur.stats && cur.stats.loading)
      return; 
    
    if(cur.stats && cur.stats.sex_chart && cur.stats.age_chart && cur.stats.sex_age_chart) {
      stats.draw();
      return;
    }

    debugLog('create_stats');
    cur.stats = {};
    cur.stats.loading = true;
    var count = [], all_count = [];

    for(var i = 0; i < 9; i++) {
      var arr = [];
      for(var j = 0; j < 2; j++)
        arr.push(0);
      count.push(arr) 
    }
      
    var sex = 0;
    for(var i in cur.followers.arr) {
      sex = cur.followers.arr[i].sex-1;
      count[0][sex]++;


      if(cur.followers.arr[i].year >= 1 && cur.followers.arr[i].year < 18) { 
        count[1][sex]++;
      } else if(cur.followers.arr[i].year >= 18 && cur.followers.arr[i].year < 21)
        count[2][sex]++;
      else if(cur.followers.arr[i].year >= 21 && cur.followers.arr[i].year < 24) {
        count[3][sex]++;
      } else if(cur.followers.arr[i].year >= 24 && cur.followers.arr[i].year < 27)
        count[4][sex]++;
      else if(cur.followers.arr[i].year >= 27 && cur.followers.arr[i].year < 30)
        count[5][sex]++;
      else if(cur.followers.arr[i].year >= 30 && cur.followers.arr[i].year < 35)
        count[6][sex]++;
      else if(cur.followers.arr[i].year >= 35 && cur.followers.arr[i].year < 45)
        count[7][sex]++;
      else if(cur.followers.arr[i].year >= 45)
        count[8][sex]++;
    }

    cur.stats.sex_chart = [];
    cur.stats.age_chart = [];
    cur.stats.sex_age_chart = [];

    for(var i in count) {
      if(i < 2) 
        all_count.push(0);
      for(var it in count[i])
        all_count[Math.min(i,1)] += count[i][it];
    }

    var sex_arr = ['женщины','мужчины'],
      age_arr = ['до 18', 'от 18 до 21', 'от 21 до 24', 'от 24 до 27', 'от 27 до 30', 'от 30 до 35', 'от 35 до 45', 'от 45'];

    for(var it in count) {
      for(var i in count[it]) {
        if(it == 0) {

          var count_now = Number(count[0][i]/all_count[0]*100).toFixed(2);
          cur.stats.sex_chart.push({
            "l": sex_arr[i],
            "q": count[0][i],
            "p": count_now,
            "id": Math.abs(i-1),
            "c": ""
          });
          ge('count_1_'+i).innerHTML = ' - <b>'+count_now+'%</b>';

        } else {
          var count_now = Number((count[it][i])/all_count[1]*100).toFixed(2);
          cur.stats.sex_age_chart.push({
            "l": age_arr[(intval(it)-1)],
            "q": intval(count[it][i]),
            "p": count_now,
            "id": intval(intval(intval(it)-1)+(intval(i)*8)),
            "c": sex_arr[i]
          });
          ge('count_3_'+intval(intval(intval(intval(it)-1)+(intval(i)*8))+1)).innerHTML = ' - <b>'+count_now+'%</b>';
        
          if(i == 1) {
            var count_now = Number((count[it][0]+count[it][1])/all_count[i]*100).toFixed(2);
            cur.stats.age_chart.push({
              "l": age_arr[(intval(it)-1)],
              "q": intval(count[it][0])+intval(count[it][1]),
              "p": count_now,
              "id": (intval(it)-1),
              "c": ""
            });
        
            ge('count_2_'+it).innerHTML = ' - <b>'+count_now+'%</b>';
          }

        }
      }
    }

    stats.draw();   
    cur.stats.loading = false;
  },

  draw: function() {
    (function() {
      var timer = setInterval(function() {
        if ('svgData' in cur && 'sex_chart' in cur.svgData && cur.svgData['sex_chart']) {
          clearInterval(timer);
          extend(cur.svgData['sex_chart'], {
            width: 130,
            height: 130
          });
          cur.invokeSvgFunction('sex_chart', 'setOptions', [{
            showLegend: false
          }]);

          cur.invokeSvgFunction('sex_chart', 'loadData', [cur.stats.sex_chart]);
        }
      }, 200);
    })();
    (function() {
      var timer = setInterval(function() {
        if ('svgData' in cur && 'age_chart' in cur.svgData && cur.svgData['age_chart']) {
          clearInterval(timer);
          extend(cur.svgData['age_chart'], {
            width: 130,
            height: 130
          });
          cur.invokeSvgFunction('age_chart', 'setOptions', [{
            showLegend: false
          }]);

          cur.invokeSvgFunction('age_chart', 'loadData', [cur.stats.age_chart]);
        }
      }, 200);
    })();

    (function() {
      var timer = setInterval(function() {
        if ('svgData' in cur && 'sex_age_chart' in cur.svgData && cur.svgData['sex_age_chart']) {
          clearInterval(timer);
          extend(cur.svgData['sex_age_chart'], {
            width: 130,
            height: 130
          });
          cur.invokeSvgFunction('sex_age_chart', 'setOptions', [{
            showLegend: false
          }]);

          cur.invokeSvgFunction('sex_age_chart', 'loadData', [cur.stats.sex_age_chart]);
        }
      }, 200);
    })();
        
  },

  preinit: function() {
    if (!cur.togglePiechartTooltip) {
      document.body.appendChild(ce('div', {id: 'piechart_tooltip', className: 'piechart_tooltip'}));
      addEvent(ge('piechart_tooltip'), 'mouseover', function(e) {
          cur.onPiechartMousemove(e);
        });

      cur.onWindowMessageFromSVG = function(e) {
        var data = e.data;
        switch (data.act) {
          case 'init':
            if (!('svgData' in cur)) cur.svgData = {};
            cur.svgData[data.svgUid] = {
              ref: e.source
            };
            break;
          case 'invoke':
            var parts = data.method.split('.');
            var ref = window;
            for (var i = 0; i < parts.length - 1; i++) {
              ref = ref[parts[i]];
            }
            ref[parts.pop()].apply({}, data.args);
            break;
        }
      };
      window.addEventListener('message', cur.onWindowMessageFromSVG, false);

      cur.invokeSvgFunction = function(id, method, args) {
        var menu = cur.svgData[id];
        if (menu.ref) {
          menu.ref.postMessage({
            act: method,
            data: args
          }, '*');
        } else {
          menu[method].apply({}, args);
        }
      }

      cur.highlightChartRowList  = function(svgUid, id, len, isIn) {
        for (var i = 0; i < len; i++) {
          var hList = ge('piechart_row_' + svgUid + '_' + i);
          if (!hList) continue;
          fadeTo(hList, 200, id == i || !isIn ? 1 : 0.5);
        }
      }

      // function for fixing zoom in webkit browsers
      /*
      if (browser.chrome || browser.safari) {

        cur.webkitSVGZoomFixTimer = setInterval((function() {
            var curZoom = getZoom();
            return function() {
              var zoom = getZoom();
              if (zoom == curZoom) return;
              curZoom = zoom;
              if (!('svgData' in cur)) return;
              for (var id in cur.svgData) {
                cur.svgData[id].container.documentElement.setAttribute('width', (cur.svgData[id].width) + 'px');
                cur.svgData[id].container.documentElement.setAttribute('height', (cur.svgData[id].height) + 'px');
              }
            }
          })(), 50);
      }
      */


      cur.onPiechartMousemove = function(e, id) {
        var xy = getXY(ge('svg_embed_' + id)) || [0, 0];
        var x = intval(e.clientX || e.pageX) + xy[0],
            y = intval(e.clientY || e.pageY) + xy[1],
            s = getSize(ge('piechart_tooltip').firstChild);

        var left = (x - s[0] - 10) < 10 ? (x - s[0] - 10)+100 : (x - s[0] - 10);
        var right = (y - s[1])-20; 
        extend(ge('piechart_tooltip').style, {
            left: left + 'px',
            top: right + 'px'
          });
      }

      cur.togglePiechartTooltip = function(data, isOn) {
  
        var text = ['<b>', data.l, '</b>', ' &mdash; ', data.p, '%'].join('');
        if (data.c) {
          text = ['<b>', data.c, '</b><br />', text].join('');
        }
        ge('piechart_tooltip').innerHTML = ['<div class="background">', text, '</div><div>', text, '</div>'].join('');
        window[isOn ? 'show' : 'hide']('piechart_tooltip');
      }

      cur.destroy.push(function() {
        document.body.removeChild(ge('piechart_tooltip'));
        window.removeEventListener('message', cur.onWindowMessageFromSVG, false);

        delete cur.onWindowMessageFromSVG;
        delete cur.invokeSvgFunction;
        delete cur.highlightChartRowList;
        if (cur.webkitSVGZoomFixTimer) delete cur.webkitSVGZoomFixTimer;
        delete cur.onPiechartMousemove;
        delete cur.togglePiechartTooltip;
      });
    }  


    extend(cur, {
      changeSvgCharts: function(el, menu_id, graph_id) {
        if (!('svgData' in cur)) return false;

        el = el.parentNode;
        var ch;
        for (ch = el.parentNode.firstChild; ch; ch = ch.nextSibling) {
          replaceClass(ch, 'summary_tab_sel', 'summary_tab');
        }
        replaceClass(el, 'summary_tab', 'summary_tab_sel');

        var cids = cur['svgCharts' + menu_id],
            data = cur['svgChartsData' + menu_id],
            rows = cur['svgChartsInfoRows' + menu_id];

        for (var i in cids) {
          var svgId = cids[i] + '_chart';
          if (data[graph_id][cids[i]]) {
            cur.invokeSvgFunction(svgId, 'loadData', [data[graph_id][cids[i]] || []]);
            ge('rows_' + svgId).innerHTML = rows[graph_id][cids[i]];
            hide('stats_demo_hide_mask');
          } else {
            show('stats_demo_hide_mask');
          }
        }

        return false;
      }
    });

  }
};

