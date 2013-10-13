require.config( {
    paths : {
        jquery: 'libs/jquery',
        ko: 'libs/knockout-2.3.0',
        domReady: 'libs/domReady',
        sammy: 'libs/sammy',
    },
    baseUrl: 'js'
});

// инициализация приложения
require(['jquery', 'ko',
         'studentsModel',
         'lectionsModel',
         'lectorsModel',
         'shriModel',
         'pagesModel',
         'appViewModel',
         'domReady!'
         ], function ( jquery, ko, studentsModel, lectionsModel, lectorsModel, shriModel, pagesModel, appViewModel){

    var studentsMdl = new studentsModel();
    var lectionsMdl = new lectionsModel();
    var lectorsMdl = new lectorsModel();
    var shriMdl = new shriModel();
    var pagesMdl = new pagesModel();

    var appVM = new appViewModel(studentsMdl, lectionsMdl, lectorsMdl, shriMdl, pagesMdl);
    ko.applyBindings(appVM);
    appVM.router.run();
});