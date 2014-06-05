var app = angular.module('app', [

    'agh.multimenu'
]);


app.run(function(){
    // FastClick.attach(document.body);
});



app.controller('menuController', function($scope){

    var menu = this;
    menu.hideNavigation = true;

   menu.test=  "test"
    

    menu.setActive = function(item){
        item.active = true;
    }


    menu.menuItems =
        [
            {
                'href' : '#/article',
                'linkText' : 'Kategori 1',
                'categories' : [
                    {
                        'href' : '#/article',
                        'linkText' : ' Artikkelside 2',
                        'categories' : [
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 3'
                            }
                        ]
                    },
                    {
                        'href' : '#/article',
                        'linkText' : ' Artikkelside 2 childs',
                        'categories' : [
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 32'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 32'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Artikkelside 32'
                            }
                        ]
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Artikkelside 2'
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Artikkelside 2'
                    }
                ]
            },

            {
                'href' : '#/persons',
                'linkText' : 'Kategori 2',
                'categories' : [
                    {
                        'href' : '#/article',
                        'linkText' : 'Finn kollega 2',
                        'categories' : [
                            {
                                'href' : '#/article',
                                'linkText' : 'Finn kollega 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Finn kollega 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Finn kollega 3'
                            }
                        ]
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Finn kollega 2'
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Finn kollega 2'
                    }
                ]
            },
            {
                'href' : '#/events',
                'linkText' : 'Kategori 3',
                'categories' : [
                    {
                        'href' : '#/article',
                        'linkText' : 'Events 2',
                        'categories' : [
                            {
                                'href' : '#/article',
                                'linkText' : 'Events 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Events 3'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Events 3'
                            }
                        ]
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Events stian',
                        'categories' : [
                            {
                                'href' : '#/article',
                                'linkText' : 'stians partytelt',
                                'categories' : [
                                    {
                                        'href' : '#/article',
                                        'linkText' : 'Streetdancers'
                                    },
                                    {
                                        'href' : '#/article',
                                        'linkText' : 'Pølsespisekonkurranse'
                                    },
                                    {
                                        'href' : '#/article',
                                        'linkText' : 'en millioooon gjester.'
                                    }
                                ]
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Events stian 2'
                            },
                            {
                                'href' : '#/article',
                                'linkText' : 'Events stian 3'
                            }
                        ]
                    },
                    {
                        'href' : '#/article',
                        'linkText' : 'Events 2'
                    }
                ]
            },
            {
                'href' : '#/persons',
                'linkText' : 'Finn ansatte'
            },
            {
                'href' : '#/profile',
                'linkText' : 'Profilside'
            },
            {
                'href' : '#/list',
                'linkText' : 'Listeside'
            },
            {
                'href' : '#/events',
                'linkText' : 'Kalender'
            }
        ]
});

