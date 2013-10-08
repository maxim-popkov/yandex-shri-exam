// Основная логика Приложения
define(['knockout-2.3.0'],function (ko) {
	return function appViewModel (studentsModel, lectionsModel, shriModel) {
		/************************
		 * Объявления переменных
		 ************************/
		this.pages = ['main', 'lections', 'shri'];
		this.currentPage = ko.observable('main');

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
			if (this.currentPage() == 'main') {
					console.log('studentsList recalc');
						return ko.utils.arrayFilter(this.students(), function(student){
					return student.visible();
				});
			}
		},this);
		
		// сохранить лекции перед сменой страницы
		this.saveLections = [
				{header: 'lec1', lector: 'lector1'},
				{header: 'lec2', lector: 'lector2'},
				{header: 'lec3', lector: 'lector3'},
			];

		// список лекций
		this.lections = ko.observableArray();
		
		// выбранная лекция
		this.chosenLection = ko.observable();

		// cохраненная информация о Шри
		this.saveShri = {info: 'shri info', details: 'shri details'};

		// Про Шри
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
	
		// показать страницу
		this.previewPage = function (page) {
			console.log('page: ', page);
			switch(page){
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
					this.lections(this.saveLections);
					console.log(this.lections());
					break;
				case 'shri':
					this.chosenLection(null);
					this.chosenStudent(null);
					this.students(null);
					this.lections(null);
					this.shri(this.saveShri);
					console.log(this.shri());
					break;
			}
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