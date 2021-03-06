angular.module('agh.multimenu', ['templates/multimenu.html', 'templates/menu_item.html'])

    .service('menuService', ['$rootScope', function($rootScope) {

        var visible;

        this.setState = function(visible){
            var visible = visible;
        }

        this.toggleVisible = function(){
            visible = !visible;
            $rootScope.$apply();
        }

        this.getVisible = function(){
            return visible;
        }

    }])

    .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {

        var menu = this;
        $scope.activeLevel = 0;
        $scope.menuService = menuService;
        menu.clickPath = [];
        $scope.isVisible;

        menu.init = function(visible){
            $scope.isVisible = visible;
        }

        $scope.$watch('menuService.getVisible()', function(newValue,  oldValue) {
            if(newValue === oldValue){
                return;
            }
            $scope.isVisible = newValue;
        });

        menu.incrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel + 1;
        }

        menu.decrementActiveLevel = function(){
            $scope.activeLevel = $scope.activeLevel - 1;
            menu.clickPath[menu.clickPath.length - 1].removeClass('active');
            menu.clickPath.pop();
            $scope.$apply();
        }

        menu.setActiveItem = function(element){
            element.addClass('active');
            menu.clickPath.push(element);
            $scope.$apply();
        }
    }])

    .directive( 'multimenu', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '../templates/multimenu.html',
            scope: {
                menuitems: '=',
                visible: '='
            },
            controller: 'MenuController',
            link: function(scope, element, attrs, ctrl){
                ctrl.init(scope.visible)
            }
        };
    })

    .directive( 'backbutton', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '^multimenu',
            link: function(scope, element, attrs, ctrl) {
                element.bind('click', function(){
                    ctrl.decrementActiveLevel();
                })
            }
        };
    })

    .directive( 'closebutton', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '^multimenu',
            controller: function($element, menuService){
                $element.bind('click', function(){
                    menuService.toggleVisible();
                });
            }
        };
    })

    .directive( 'menuitem', function () {
        return {
            restrict: 'EA',
            require: '^multimenu',
            link: function(scope, element, attrs, ctrls) {
                var menuCtrl = ctrls;
                element.bind('click', function(){
                    menuCtrl.incrementActiveLevel();
                    menuCtrl.setActiveItem(element);
                });
            }
        };
    })


angular.module("templates/multimenu.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("templates/multimenu.html");
}]);

angular.module("templates/menu_item.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("templates/menu_item.html");
}]);

