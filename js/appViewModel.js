// Основная логика Приложения
define(['ko'],function (ko) {
    
    return function appViewModel (studentsModel, lectionsModel, lectorsModel, shriModel, pagesModel) {
        /************************
         * Объявления переменных
         ************************/
        console.log('s',studentsModel);
        this.pagesModel = pagesModel;
        this.pages = this.pagesModel.pages;
        this.currentPage = ko.observable(this.pagesModel.startPage);

        // показывать или скрывать расширенную информацию о студентах
        this.isVisibleDetails = ko.observable(false);

        // cновной список студентов, в цикле добавляется поле visible для отображения в поиске
        this.studentsModel = studentsModel.students;
        for (var i = 0; i < this.studentsModel.length; i++) {
            this.studentsModel[i].visible = ko.observable(true);
        }

        // список студентов
        this.students = ko.observableArray();
        // выбранный студент
        this.chosenStudent = ko.observable();

        // строка поиска
        this.search = ko.observable();

        // список студентов в ответе страницы
        this.studentsList = ko.computed(function(){
            if (this.currentPage().sys_name == 'main') {
                    console.log('studentsList recalc');
                        return ko.utils.arrayFilter(this.students(), function(student){
                    return student.visible();
                });
            }
        },this);
        
        /**
         * Лектора
         */
        //список лекторов
        this.lectorsModel = lectorsModel;

        /**
         * Лекции
         */
        // сохранить лекции перед сменой страницы
        this.lectionsModel = lectionsModel.lections;
        for (var j = 0; j < this.lectionsModel.length; j++) {
            var lection = this.lectionsModel[j];
            lection.lector = this.lectorsModel.getLectorById(lection.lector_id);
            var lecDate = new Date(lection.date);
            var monthStrings = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек',];

            lection.day =  lecDate.getDay();
            lection.month = monthStrings[lecDate.getMonth()];

            console.log(lection.month);
            console.log(lection.day);
            console.log(lecDate);
        }

        // список лекций
        this.lections = ko.observableArray();
        
        // выбранная лекция
        this.chosenLection = ko.observable();




        // Про Шри
        this.shriModel = shriModel.shri;
        this.shri = ko.observable();

        /********************
         * Логика приложения
         ********************/
        // подписка и действие при обновлении строки поиска
        this.search.subscribe(function(){
            ko.utils.arrayForEach(this.students(), function (student) {
                var regex = new RegExp("^" + this.search().toUpperCase());
                var name = student.first_name.toUpperCase();
                student.visible(regex.test(name));
            }.bind(this));
        }, this);

        /**
         * меняет состояние isVisibleDetails на противоположное, для скрытия или отображения инфо о студенте
         * @return {[type]} [description]
         */
        this.showHideDetails = function(){
            console.log('showHideDetails work');
            this.isVisibleDetails(!this.isVisibleDetails());
        }.bind(this);
    
        // показать страницу
        this.previewPage = function (page) {
            console.log('page: ', page);
            switch(page.sys_name){
                case 'main':
                    this.chosenLection(null);
                    this.lections(null);
                    this.chosenStudent(null);
                    this.shri(null);
                    this.students(this.studentsModel);
                    break;
                case 'lections':
                    this.chosenLection(null);
                    this.chosenStudent(null);
                    this.students(null);
                    this.shri(null);
                    this.lections(this.lectionsModel);
                    console.log(this.lectionsModel);
                    console.log(this.lections());
                    break;
                case 'shri':
                    this.chosenLection(null);
                    this.chosenStudent(null);
                    this.students(null);
                    this.lections(null);
                    this.shri(this.shriModel);
                    console.log(this.shri());
                    break;
            }
            location.hash = page.sys_name;
            this.currentPage(page);
        }.bind(this);

        // показать студента
        this.previewStudent = function(student){
            console.log('preview student');
            console.log(student);
            this.studentsModel = this.students();
            this.students(null);
            console.log(this.studentsModel);
            this.chosenStudent(student);
        }.bind(this);

        // при первом запуске ни один студент не выбран
        this.chosenStudent(null);
        this.students(this.studentsModel);
    };
});