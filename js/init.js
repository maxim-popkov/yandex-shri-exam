require.config( {
    paths : {
        jquery: 'libs/jquery',
        ko: 'libs/knockout-2.3.0',
        domReady: 'libs/domReady',
        sammy: 'libs/sammy',
    },
    shim: {
        'sammy':['jquery'],
        'appViewModel':['ko','pagesModel','studentsModel','lectionsModel','lectorsModel','shriModel'],
    },
    baseUrl: 'js'
});

// инициализация приложения
require(['jquery', 'ko',
         'pagesModel',
         'studentsModel',
         'lectionsModel',
         'lectorsModel',
         'shriModel',
         'appViewModel',
         'domReady!'
         ], function ( jquery, ko, pagesModel, studentsModel, lectionsModel, lectorsModel, shriModel, appViewModel){

    var studentsMdl = new studentsModel();
    var lectionsMdl = new lectionsModel();
    var lectorsMdl = new lectorsModel();
    var shriMdl = new shriModel();
    var pagesMdl = new pagesModel();

    var appVM = new appViewModel(studentsMdl, lectionsMdl, lectorsMdl, shriMdl, pagesMdl);
    ko.applyBindings(appVM);
    appVM.router.run();
});