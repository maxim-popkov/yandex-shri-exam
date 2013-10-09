// инициализация приложения
require(['knockout-2.3.0',
         'appViewModel',
         'studentsModel',
         'lectionsModel',
         'lectorsModel',
         'domReady!',
         ], function (ko, appViewModel, studentsModel, lectionsModel, lectorsModel){
    var studentsMdl = new studentsModel();
    var lectionsMdl = new lectionsModel();
    var lectorsMdl = new lectorsModel();
    var appVM = new appViewModel(studentsMdl, lectionsMdl, lectorsMdl);
    console.log(studentsMdl.students);
    console.log(lectionsMdl.lections);
    console.log(lectorsMdl.lectors);
    ko.applyBindings(appVM);
});