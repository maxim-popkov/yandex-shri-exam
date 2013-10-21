define("lectorsModel",[], function (){
    return function lectorsModel () {
        /**
         * Вернуть ссылку на объект лектора с указанным id 
         * @param  {int} id ид лектора
         * @return {lector object}  лектор
         */
        this.getLectorById = function(id){
            var lctsLength = this.lectors.length;
            for (var k = 0; k < lctsLength; k++) {
                if(this.lectors[k].id === id){
                    return this.lectors[k];
                }
            }
        }.bind(this);
        this.lectors = [
                    {
                      "id":181,
                      "first_name":"Алексей",
                      "last_name":"Бережной",
                      "about":"До Яндекса занимался разработкой браузерной MMORPG. С 2011 года работает над интерфейсом Яндекс.Директа.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/e39d3fcaea981cf918bf9f337e56feee/365x365",
                     },
                    {
                      "id":182,
                      "first_name":"Анна",
                      "last_name":"Чеботкевич",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/300cb1b51bfadaca152a75491c232b92/365x365",
                    },
                    {
                      "id":183,
                      "first_name":"Виктор",
                      "last_name":"Ашик",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/a679b4725fe296178cc47bc3804c0b6e/365x365",
                    },
                    {
                      "id":184,
                      "first_name":"Георгий",
                      "last_name":"Мостоловица",
                      "about":"Веб-разработчик. В Яндексе занимается ускорением фронтенда Поиска.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/9c6a228a5196ef3cb1c73c9e06ab24b2/365x365",
                    },
                    {
                      "id":185,
                      "first_name":"Денис",
                      "last_name":"Бугарчев",
                      "about":"Верстальщик, разработчик веб-интерфейсов, автор подкаста о веб-разработке «Сделайте мне красиво!».",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/f42b324b24dbce848d1510fc3a304e89/365x365",
                    },
                    {
                      "id":186,
                      "first_name":"Дмитрий",
                      "last_name":"Поляков",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/cf731f3868db81beb9414444926e328b/365x365",
                    },
                    {
                      "id":187,
                      "first_name":"Евгений",
                      "last_name":"Дорошенко",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/b42044e74a6cfefb5db858e42956f721/365x365",
                    },
                    {
                      "id":188,
                      "first_name":"Игорь",
                      "last_name":"Новак",
                      "about":"Разработчик интерфейсов",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/8dd92a1999fbe06e3767f633dc406c07/365x365",
                    },
                    {
                      "id":189,
                      "first_name":"Марина",
                      "last_name":"Широчкина",
                      "about":"Занимается тестированием уже девять лет. В Яндексе с 2007 года. Последний год работает в группе производительности интерфейсов.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/384a444b0f7aecea2d967791365b2bc9/365x365",
                    },
                    {
                      "id":190,
                      "first_name":"Михаил",
                      "last_name":"Трошев",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/9dc5433ef8399aaba298434c14c0792f/365x365",
                    },
                    {
                      "id":191,
                      "first_name":"Роман",
                      "last_name":"Андриади",
                      "about":"Работает в департаменте эксплуатации Яндекса с 2005 года. С 2010 года —руководитель группы администрирования коммуникационных, контент- и внутренних сервисов.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/ad0b99c52e0084b10b4c21dda9aa080b/365x365",
                    },
                    {
                      "id":192,
                      "first_name":"Сергей",
                      "last_name":"Сергеев",
                      "about":"Профессионально занимается разработкой уже более 10 лет, из них 5 в Яндексе.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/fe9e1c73b45ae87cfb8ed1bf30fec679/365x365",
                    },
                    {
                      "id":193,
                      "first_name":"Сергей",
                      "last_name":"Черкасов",
                      "about":null,
                      "photo_url":"http://avatars.yandex.net/get-yaevents/e4136deea69b5bed89ed08615435d7b2/365x365",
                    },
                    {
                      "id":194,
                      "first_name":"Тарас",
                      "last_name":"Иващенко",
                      "about":"Администратор информационной безопасности в Яндексе. Специалист по информационной безопасности, проповедник свободного программного обеспечения, участник проектов w3af и OWASP.",
                      "photo_url":"http://avatars.yandex.net/get-yaevents/5e276342723793120da28e22e51047ae/365x365",
                    }
                  ];
    };
});