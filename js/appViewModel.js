// Основная логика Приложения
define(['knockout-2.3.0'],function (ko) {
	return function appViewModel () {
		this.pages = ['main', 'student'];
		this.currentPage = ko.observable('main');

		// сохранить студентов перед сменой страницы
		this.saveStudents = [];

		// список студентов
		this.students = ko.observableArray([
				{name: 'nm1', lastName: 'lnm1', visible: ko.observable(true)},
				{name: 'nm2', lastName: 'lnm2', visible: ko.observable(true)},
				{name: 'nm3', lastName: 'lnm3', visible: ko.observable(true)},
				{name: 'nm4', lastName: 'lnm4', visible: ko.observable(true)},
			]);
		// строка поиска
		this.search = ko.observable();

		// список студентов в ответе страницы
		this.studentsList = ko.computed(function(){
			console.log('studentsList recalc');
			return ko.utils.arrayFilter(this.students(), function(student){
				return student.visible();
			});
		},this);
		
		// подписка и действие при обновлении строки поиска
		this.search.subscribe(function(){
			console.log(1);
			console.log(this.search());
			ko.utils.arrayForEach(this.students(), function (student) {
				var regex = new RegExp("^" + this.search().toUpperCase());
				var name = student.name.toUpperCase();
				student.visible(regex.test(name));
			}.bind(this));
		}, this);

		// выбранный студент
		this.chosenStudent = ko.observable();

		// показать страницу
		this.previewPage = function (page) {
			console.log('page: ', page);
			switch(page){
				case 'main':
					this.chosenStudent(null);
					console.log(this);
					this.students(this.saveStudents);
			}
		}.bind(this);

		// показать студента
		this.previewStudent = function(student){
			console.log('preview student');
			console.log(student);
			this.saveStudents = this.students();
			this.students(null);
			console.log(this.saveStudents);
			this.chosenStudent(student);
		}.bind(this);

		// при первом запуске ни один студент не выбран
		this.chosenStudent(null);
	};
});