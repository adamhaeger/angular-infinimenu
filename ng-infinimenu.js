angular.module('agh.multimenu', ['views/multimenu.html', 'menu_item.html'])

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
            templateUrl: 'views/multimenu.html',
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

angular.module("views/multimenu.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("views/multimenu.html",
            "<aside class=\"main-menu\" ng-class=\"{'visible' : isVisible}\">"+
            "    <a backbutton ng-show=\"activeLevel > 0\" class=\"back-button\"><\/a>"+
            "    <a closebutton class=\"close-button\"><\/a>"+
            "    <ul class=\"off-canvas-list\"  ng-style=\"{"+
            "                '-webkit-transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ,"+
            "                '-moz-transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ,"+
            "                '-ms-transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ,"+
            "                '-o-transformm': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' ,"+
            "                'transform': 'translate3d(-' +  ( activeLevel * 100 ) + '%, 0, 0) scale3d(1, 1, 1)' }\" >"+
            "        <li ng-repeat=\"item in menuitems\" ng-include=\"'menu_item.html'\"><\/li>"+
            "    <\/ul>"+
            "<\/aside>"
    );
}]);

angular.module("menu_item.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("menu_item.html",
            "<a ng-if=\"item.categories.length\" menuitem>{{ item.linkText }}<span class=\"icon-arrow-right\"></span></a>" +
            "<a ng-if=\"!item.categories.length\" href=\"{{item.href}}\">{{ item.linkText }}</a>" +
            "<ul ng-if=\"item.categories.length\">" +
            "<li ng-repeat=\"item in item.categories\" ng-include=\"'menu_item.html'\"></li>" +
            "</ul>"
    );
}]);
