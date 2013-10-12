// инициализация приложения
require(['knockout-2.3.0',
         'appViewModel',
         'studentsModel',
         'lectionsModel',
         'lectorsModel',
         'shriModel',
         'domReady!',
         ], function (ko, appViewModel, studentsModel, lectionsModel, lectorsModel, shriModel){
    var studentsMdl = new studentsModel();
    var lectionsMdl = new lectionsModel();
    var lectorsMdl = new lectorsModel();
    var shriMdl = new shriModel();
    var appVM = new appViewModel(studentsMdl, lectionsMdl, lectorsMdl, shriMdl);
    console.log(studentsMdl.students);
    console.log(lectionsMdl.lections);
    console.log(lectorsMdl.lectors);
    console.log(shriMdl.shri);
    ko.applyBindings(appVM);
});