// Основная логика Приложения
define(['ko','jquery','sammy'],function (ko, jquery, sammy) {
    
    return function appViewModel (studentsModel, lectionsModel, lectorsModel, shriModel, pagesModel, path) {
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
            this.studentsModel.students[i].inOffset = ko.observable(false);
        }


        // список студентов
        this.students = ko.observableArray(null);
        // выбранный студент
        this.chosenStudent = ko.observable();

        // строка поиска
        this.search = ko.observable();

        // this.studentsOffset = ko.observable(0);
        this.maxStep = 8;
        this.curStep = ko.observable(0);
        this.listLength = 8;
        // список студентов в ответе страницы
        this.studentsList = ko.computed(function(){
            var resultVisible = [];
            var result = [];
            if (this.currentPage().sys_name == 'main') {
                        resultVisible = ko.utils.arrayFilter(this.students(), function(student){
                    return student.visible();
                });
                
                var offsetMin = (this.curStep() + 0) * this.maxStep;
                
                if (offsetMin > resultVisible.length) {
                    this.curStep(0);
                    offsetMin = (this.curStep() + 0) * this.maxStep;
                }

                var offsetMax = (this.curStep() + 1) * this.maxStep;
                var offsetReal = offsetMax % this.maxStep;
                for (var i = offsetMin; i < resultVisible.length && i < offsetMax; i++) {
                    result.push(resultVisible[i]);
                }
                return result;

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
        var monthStrings = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек',];
        for (var j = 0; j < this.lectionsModel.length; j++) {
            var lection = this.lectionsModel[j];
            lection.lector = this.lectorsModel.getLectorById(lection.lector_id);
            var lecDate = new Date(lection.date);
            
            lection.day =  lecDate.getDay();
            lection.month = monthStrings[lecDate.getMonth()];
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
            this.curStep(0);
            ko.utils.arrayForEach(this.students(), function (student) {
                var regex = new RegExp("^" + this.search().toUpperCase());
                var firstName = student.first_name.toUpperCase();
                var lastName = student.last_name.toUpperCase();
                var isVisible = regex.test( firstName) || regex.test(lastName);
                student.visible(isVisible);
            }.bind(this));
        }, this);

        /**
         * Показать ещё студентов (прибавляет еденицу с смещению)
         * @return {[type]} [description]
         */
        this.nextStudents = function(){
            this.curStep(this.curStep() + 1);
        }.bind(this);

        /**
         * меняет состояние isVisibleDetails на противоположное, для скрытия или отображения инфо о студенте
         * @return {[type]} [description]
         */
        this.showHideDetails = function(){
            this.isVisibleDetails(!this.isVisibleDetails());
        }.bind(this);
    
        // показать страницу
        this.previewPage = function (page) {
            location.hash = page.sys_name;
          }.bind(this);
        
        // показать студента
        this.previewStudent = function(student){
            this.studentsModel.currentStudent = student;
            location.hash = "main/" + student.id;
        }.bind(this);
        
        /**
         * показать следующего студента
         * @param  {[type]} student [description]
         * @return {[type]}         [description]
         */
        this.previewNextStudent = function(student){
            var id = student.id;
            var nextStudent = this.studentsModel.getNextStudent(id);
            this.studentsModel.currentStudent = nextStudent;
            location.hash = "main/" + nextStudent.id;
        }.bind(this);
        
        /**
         * Сброс состояний страницы
         * @return {[type]} [description]
         */
        this.resetState = function(){
             this.chosenLection(null);
             this.chosenStudent(null);
             this.students(null);
             this.shri(null);
             this.lections(null);
             document.title = 'Выпускной альбом ШРИ-2013';
        }.bind(this);


        /**
         * роутер страниц
         * @return {[type]} [description]
         */
        this.router = sammy(function(){
            this.get('#main', function() {
                app.resetState();
                app.students(app.studentsModel.students);
                app.currentPage(app.pagesModel.getPageBySysName('main'));
            });
            this.get('#lections', function() {
                app.resetState();
                app.lections(app.lectionsModel);
                app.currentPage(app.pagesModel.getPageBySysName('lections'));
            });
            this.get('#shri', function() {
                app.resetState();
                app.shri(app.shriModel);
                app.currentPage(app.pagesModel.getPageBySysName('shri'));
            });
            this.get('#main/:studentId', function() {
                app.resetState();
                var student = {};
                if(app.studentsModel.currentStudent){
                    student = app.studentsModel.currentStudent;
                }
                else{
                    student =  app.studentsModel.getStudentById(this.params.studentId);
                }
                if (student) {
                    app.chosenStudent(student);
                    document.title = student.first_name + ' ' + student.last_name;
                }
                else{
                    app.previewPage(app.pagesModel.startPage);
                }
                
            });
            this.get('', function(){
                this.app.runRoute('get', '#main');
            });
        });

    };
});