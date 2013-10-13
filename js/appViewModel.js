// Основная логика Приложения
define(['ko','jquery','sammy'],function (ko, jquery, sammy) {
    
    return function appViewModel (studentsModel, lectionsModel, lectorsModel, shriModel, pagesModel) {
        // ссыка на приложение для роутера sammy
        var app = this;
        /************************
         * Объявления переменных
         ************************/
        this.pagesModel = pagesModel;
        this.pages = this.pagesModel.pages;
        this.currentPage = ko.observable(this.pagesModel.startPage);

        // показывать или скрывать расширенную информацию о студентах
        this.isVisibleDetails = ko.observable(false);

        // cновной список студентов, в цикле добавляется поле visible для отображения в поиске
        this.studentsModel = studentsModel;
        for (var i = 0; i < this.studentsModel.students.length; i++) {
            this.studentsModel.students[i].visible = ko.observable(true);
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
        // лекции 
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

        // список лекций для отображения
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
            location.hash = page.sys_name;
          }.bind(this);
        // показать студента
        this.previewStudent = function(student){
            location.hash = "main/" + student.id;
        }.bind(this);
        
        /**
         * роутер страниц
         * @return {[type]} [description]
         */
        this.router = sammy(function(){
            this.get('#main', function() {
                app.chosenLection(null);
                app.lections(null);
                app.chosenStudent(null);
                app.shri(null);
                app.students(app.studentsModel.students);
                app.currentPage(app.pagesModel.getPageBySysName('main'));
            });
            this.get('#lections', function() {
                app.chosenLection(null);
                app.chosenStudent(null);
                app.students(null);
                app.shri(null);
                app.lections(app.lectionsModel);
                app.currentPage(app.pagesModel.getPageBySysName('lections'));
            });
            this.get('#shri', function() {
                app.chosenLection(null);
                app.chosenStudent(null);
                app.students(null);
                app.lections(null);
                app.shri(app.shriModel);
                app.currentPage(app.pagesModel.getPageBySysName('shri'));
            });
            this.get('#main/:studentId', function() {
                app.chosenLection(null);
                app.students(null);
                app.lections(null);
                app.shri(null);
                console.log(typeof this.params.studentId);
                app.chosenStudent(app.studentsModel.getStudentbyId(this.params.studentId));
            });
            this.get('', function() { this.app.runRoute('get', '#main');});
        });
        this.router.run();

    };
});