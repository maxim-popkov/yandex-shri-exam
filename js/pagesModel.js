define("pagesModel",[], function (){
    return function pagesModel () {
        /**
         * Страницы приложения
         * @type {[type]}
         */
        this.pages =
            [
                {name: 'Меню', sys_name: 'main'},
                {name: 'Лекции', sys_name: 'lections'},
                {name: 'О Шри', sys_name: 'shri'},
            ];
        /**
         * Первая страница при инициализации приложения
         * @type {[type]}
         */
        this.startPage = this.pages[0];
        
        /**
         * Вернуть объект страницы по системному имени
         * @param  {[type]} sysName [description]
         * @return {[type]}         [description]
         */
        this.getPageBySysName = function(sysName){
            for (var i = 0; i < this.pages.length; i++) {
                 if (this.pages[i].sys_name == sysName) {
                    return  this.pages[i];
                 }
            }
            return 'None';
        }.bind(this);
        /**
         * Вернуть имя страницы по её системному имени
         */
        this.getPageNameBySysName = function(sysName){
            for (var i = 0; i < this.pages.length; i++) {
                 if (this.pages[i].sys_name == sysName) {
                    return  this.pages[i].sys_name;
                 }
            }
            return 'None';
        }.bind(this);
        /**
         * Вернуть массив всех системных имен страниц 
         * @return {[type]} [description]
         */
        this.getSysNames = function(){
            var sysNames = [];
            for (var i = 0; i < this.pages.length; i++) {
                sysNames.push(this.pages[i].sys_name);
            }
            return sysNames;
        }.bind(this);
    };
});