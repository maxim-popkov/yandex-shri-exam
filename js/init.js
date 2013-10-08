// инициализация приложения
require(['knockout-2.3.0','appViewModel','studentsModel','domReady!'], function (ko, appViewModel, studentsModel){
	var stModel = new studentsModel();
	var appVM = new appViewModel(stModel);
	console.log(stModel.students);
	ko.applyBindings(appVM);
});