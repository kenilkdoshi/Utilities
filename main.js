var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope) {
    $scope.myData = [{Snum: "1", TradeId: 101, FromDate: "06/05/2016",Todate:"07/04/2017",Entity:"Entity1"},
                     {Snum: "2", TradeId: 102, FromDate: "06/06/2016",Todate:"07/05/2017",Entity:"Entity2"},
                     {Snum: "3", TradeId: 103, FromDate: "06/07/2016",Todate:"07/06/2017",Entity:"Entity3"},
                     {Snum: "4", TradeId: 104, FromDate: "06/07/2016",Todate:"07/07/2017",Entity:"Entity4"},
                     {Snum: "5", TradeId: 105, FromDate: "06/08/2016",Todate:"07/08/2017",Entity:"Entity5"},
					 {Snum: "6", TradeId: 106, FromDate: "06/09/2016",Todate:"07/09/2017",Entity:"Entity6"},
					 {Snum: "7", TradeId: 107, FromDate: "06/10/2016",Todate:"07/10/2017",Entity:"Entity7"},
					 {Snum: "8", TradeId: 108, FromDate: "06/11/2016",Todate:"07/11/2017",Entity:"Entity8"},
					 {Snum: "9", TradeId: 109, FromDate: "06/12/2016",Todate:"07/12/2017",Entity:"Entity9"},
					 {Snum: "10", TradeId: 110, FromDate: "06/13/2016",Todate:"07/13/2017",Entity:"Entity10"},
					 {Snum: "11", TradeId: 111, FromDate: "06/14/2016",Todate:"07/14/2017",Entity:"Entity11"},
					 {Snum: "12", TradeId: 112, FromDate: "06/15/2016",Todate:"07/15/2017",Entity:"Entity12"},];
    $scope.gridOptions = { data: 'myData' };
});