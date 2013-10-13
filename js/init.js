// инициализация приложения
require(['knockout-2.3.0',
         'appViewModel',
         'studentsModel',
         'lectionsModel',
         'lectorsModel',
         'shriModel',
         'pagesModel',
         'domReady!',
         ], function (ko, appViewModel, studentsModel, lectionsModel, lectorsModel, shriModel, pagesModel){
    var studentsMdl = new studentsModel();
    var lectionsMdl = new lectionsModel();
    var lectorsMdl = new lectorsModel();
    var shriMdl = new shriModel();
    var pagesMdl = new pagesModel();
    var appVM = new appViewModel(studentsMdl, lectionsMdl, lectorsMdl, shriMdl, pagesMdl);
    console.log(studentsMdl.students);
    console.log(lectionsMdl.lections);
    console.log(lectorsMdl.lectors);
    console.log(shriMdl.shri);
    console.log(pagesMdl.pages);
    ko.applyBindings(appVM);
});