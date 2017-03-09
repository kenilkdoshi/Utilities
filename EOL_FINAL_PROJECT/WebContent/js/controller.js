var myApp=angular.module('app',['ngTouch','ui.grid.pagination','ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize']);
  
  
//for controlling tabs
myApp.controller("TabController",function(){
	    this.tab=0;
	    this.setTab=function(tabId)
	    {
	    	
	        this.tab=tabId;
	    };
	    this.isSet=function(tabId)
	    {
	        return this.tab==tabId;
	    };

	});



//for date picker directive
myApp.directive('datepicker1', function() {
  return {
    link: function(scope, el, attr) {
      $(el).datepicker({
        onSelect: function(dateText) {
          console.log(dateText);
          var expression = attr.ngModel + " = " + "'" + dateText + "'";
          scope.$apply(expression);
          }
      });
    }
  };
});


myApp.directive('submenu', function() {
  return {
    restrict: 'AEC', /*attaches directive to class called submenu*/
    link: function(scope, elem) {
      elem.parent().bind('mouseover', function() {
        /*Displays the submenu*/
        elem.css('display', 'block');
        /*add class highlight to the class linkName.  We have to use this chain of methods because angular doesn't support .siblings()*/
        elem.parent().children().eq(0).addClass("highlight");
      });
      elem.parent().bind('mouseleave', function() {
        elem.css('display', 'none');
        elem.parent().children().eq(0).removeClass("highlight");
      });
    }
  };
});


//controller for grid
myApp.controller("CompanyCtrl", ['$scope', '$http', '$interval', '$modal', '$log',function($scope, $http, $interval, $modal, $log) {
	

	$scope.myAppScopeProvider = {

								      showInfo : function(row) {
								           var modalInstance = $modal.open({
								                controller: 'InfoController',
								                templateUrl: 'ngTemplate/infoPopup.html',
								                resolve: {
								                  selectedRow: function () {                    
								                      return row.entity;
								                  }
								          
								                }
								    });
								           
   modalInstance.result.then(function (selectedItem) {
		             $log.log('modal selected Row: ' + selectedItem);
		           }, function () {
		             $log.info('Modal dismissed at: ' + new Date());
		           });
		      },
	rowFormatter :function( row ) {
		     return row.entity.Status === 'ERR'; 
		  }
		  }
	
	  function rowTemplate() {
	           return '<div ng-class="{ \'grey\':grid.appScope.rowFormatter( row ) }">'+'<div ng-dblclick="grid.appScope.showInfo(row)" >' +
	                 '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell"   ui-grid-cell></div>' +
	                 '</div>';
	  }
	
	

	$scope.myData = [{Snum: "1", TradeId: 101, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber1",Status:"ERR",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                 {Snum: "2", TradeId: 102, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber2",Status:"NEW",Repoflag:"YES",Security:"US458182CP58",CParty:"USBP",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                 {Snum: "3", TradeId: 103, FromDate: "06/07/2016",Todate:"07/06/2017",Subscriber:"Subscriber3",Status:"NMT",Repoflag:"YES",Security:"DE0001141547",CParty:"BBGB",Quantity:14000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                 {Snum: "4", TradeId: 104, FromDate: "06/07/2016",Todate:"07/07/2017",Subscriber:"Subscriber4",Status:"CAN",Repoflag:"YES",Security:"US458182CP58",CParty:"BBLL",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                 {Snum: "5", TradeId: 105, FromDate: "06/08/2016",Todate:"07/08/2017",Subscriber:"Subscriber5",Status:"ERR",Repoflag:"NO",Security:"DE0001141547",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "6", TradeId: 106, FromDate: "06/09/2016",Todate:"07/09/2017",Subscriber:"Subscriber6",Status:"NEW",Repoflag:"YES",Security:"XS0230228933",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "7", TradeId: 107, FromDate: "06/10/2016",Todate:"07/10/2017",Subscriber:"Subscriber7",Status:"NMT",Repoflag:"NO",Security:"DE0001141547",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "8", TradeId: 108, FromDate: "06/11/2016",Todate:"07/11/2017",Subscriber:"Subscriber8",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"USBP",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "9", TradeId: 109, FromDate: "06/12/2016",Todate:"07/12/2017",Subscriber:"Subscriber9",Status:"ERR",Repoflag:"NO",Security:"DE0001141547",CParty:"BBLL",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "10", TradeId: 110, FromDate: "06/13/2016",Todate:"07/13/2017",Subscriber:"Subscriber10",Status:"NEW",Repoflag:"YES",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "11", TradeId: 111, FromDate: "06/14/2016",Todate:"07/14/2017",Subscriber:"Subscriber11",Status:"NMT",Repoflag:"YES",Security:"DE0001141547",CParty:"BBGB",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "12", TradeId: 112, FromDate: "06/15/2016",Todate:"07/15/2017",Subscriber:"Subscriber12",Status:"CAN",Repoflag:"NO",Security:"DE0001141547",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "13", TradeId: 101, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber1",Status:"ERR",Repoflag:"YES",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                     {Snum: "14", TradeId: 102, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber2",Status:"NEW",Repoflag:"YES",Security:"DE0001141547",CParty:"BBLL",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                     {Snum: "15", TradeId: 103, FromDate: "06/07/2016",Todate:"07/06/2017",Subscriber:"Subscriber3",Status:"NMT",Repoflag:"NO",Security:"XS0230228933",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                     {Snum: "16", TradeId: 104, FromDate: "06/07/2016",Todate:"07/07/2017",Subscriber:"Subscriber4",Status:"CAN",Repoflag:"YES",Security:"US458182CP58",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                     {Snum: "17", TradeId: 105, FromDate: "06/08/2016",Todate:"07/08/2017",Subscriber:"Subscriber5",Status:"ERR",Repoflag:"NO",Security:"DE0001141547",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "18", TradeId: 106, FromDate: "06/09/2016",Todate:"07/09/2017",Subscriber:"Subscriber6",Status:"NEW",Repoflag:"YES",Security:"DE0001141547",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "19", TradeId: 107, FromDate: "06/10/2016",Todate:"07/10/2017",Subscriber:"Subscriber7",Status:"NMT",Repoflag:"NO",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "20", TradeId: 108, FromDate: "06/11/2016",Todate:"07/11/2017",Subscriber:"Subscriber8",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "21", TradeId: 109, FromDate: "06/12/2016",Todate:"07/12/2017",Subscriber:"Subscriber9",Status:"ERR",Repoflag:"NO",Security:"DE0001141547",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "22", TradeId: 110, FromDate: "06/13/2016",Todate:"07/13/2017",Subscriber:"Subscriber10",Status:"NEW",Repoflag:"YES",Security:"XS0230228933",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "23", TradeId: 111, FromDate: "06/14/2016",Todate:"07/14/2017",Subscriber:"Subscriber11",Status:"NMT",Repoflag:"YES",Security:"DE0001141547",CParty:"BBLL",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "24", TradeId: 112, FromDate: "06/15/2016",Todate:"07/15/2017",Subscriber:"Subscriber12",Status:"CAN",Repoflag:"NO",Security:"DE0001141547",CParty:"USBP",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "25", TradeId: 101, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber1",Status:"ERR",Repoflag:"NO",Security:"DE0001141547",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                         {Snum: "26", TradeId: 102, FromDate: "06/05/2016",Todate:"07/04/2017",Subscriber:"Subscriber2",Status:"NEW",Repoflag:"YES",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                         {Snum: "27", TradeId: 103, FromDate: "06/07/2016",Todate:"07/06/2017",Subscriber:"Subscriber3",Status:"NMT",Repoflag:"YES",Security:"DE0001141547",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                         {Snum: "28", TradeId: 104, FromDate: "06/07/2016",Todate:"07/07/2017",Subscriber:"Subscriber4",Status:"NMT",Repoflag:"NO",Security:"US458182CP58",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	                         {Snum: "29", TradeId: 105, FromDate: "06/08/2016",Todate:"07/08/2017",Subscriber:"Subscriber5",Status:"ERR",Repoflag:"YES",Security:"XS0230228933",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "30", TradeId: 106, FromDate: "06/09/2016",Todate:"07/09/2017",Subscriber:"Subscriber6",Status:"NEW",Repoflag:"YES",Security:"DE0001141547",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "31", TradeId: 107, FromDate: "06/10/2016",Todate:"07/10/2017",Subscriber:"Subscriber7",Status:"CAN",Repoflag:"NO",Security:"XS0230228933",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "32", TradeId: 108, FromDate: "06/11/2016",Todate:"07/11/2017",Subscriber:"Subscriber8",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"BBLL",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "33", TradeId: 109, FromDate: "06/12/2016",Todate:"07/12/2017",Subscriber:"Subscriber9",Status:"ERR",Repoflag:"NO",Security:"XS0230228933",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "34", TradeId: 110, FromDate: "06/13/2016",Todate:"07/13/2017",Subscriber:"Subscriber10",Status:"NEW",Repoflag:"YES",Security:"DE0001141547",CParty:"USBP",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "35", TradeId: 111, FromDate: "06/14/2016",Todate:"07/14/2017",Subscriber:"Subscriber11",Status:"NMT",Repoflag:"NO",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "36", TradeId: 112, FromDate: "06/15/2016",Todate:"07/15/2017",Subscriber:"Subscriber12",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "39", TradeId: 103, FromDate: "06/07/2016",Todate:"07/06/2017",Subscriber:"Subscriber3",Status:"NMT",Repoflag:"NO",Security:"DE0001141547",CParty:"BBLL",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "40", TradeId: 104, FromDate: "06/07/2016",Todate:"07/07/2017",Subscriber:"Subscriber4",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "41", TradeId: 105, FromDate: "06/08/2016",Todate:"07/08/2017",Subscriber:"Subscriber5",Status:"ERR",Repoflag:"NO",Security:"XS0230228933",CParty:"BBGB",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "42", TradeId: 106, FromDate: "06/09/2016",Todate:"07/09/2017",Subscriber:"Subscriber6",Status:"NEW",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "43", TradeId: 107, FromDate: "06/10/2016",Todate:"07/10/2017",Subscriber:"Subscriber7",Status:"NMT",Repoflag:"NO",Security:"US458182CP58",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "44", TradeId: 108, FromDate: "06/11/2016",Todate:"07/11/2017",Subscriber:"Subscriber8",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "45", TradeId: 109, FromDate: "06/12/2016",Todate:"07/12/2017",Subscriber:"Subscriber9",Status:"ERR",Repoflag:"YES",Security:"DE0001141547",CParty:"BBLL",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "46", TradeId: 110, FromDate: "06/13/2016",Todate:"07/13/2017",Subscriber:"Subscriber10",Status:"NEW",Repoflag:"NO",Security:"US458182CP58",CParty:"USBP",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "47", TradeId: 111, FromDate: "06/14/2016",Todate:"07/14/2017",Subscriber:"Subscriber11",Status:"NMT",Repoflag:"YES",Security:"XS0230228933",CParty:"BBGB",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "48", TradeId: 112, FromDate: "06/15/2016",Todate:"07/15/2017",Subscriber:"Subscriber12",Status:"CAN",Repoflag:"YES",Security:"DE0001141547",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "49", TradeId: 101, FromDate: "06/14/2016",Todate:"07/14/2017",Subscriber:"Subscriber11",Status:"NMT",Repoflag:"NO",Security:"DE0001141547",CParty:"USBP",Quantity:50000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"},
	         {Snum: "50", TradeId: 102, FromDate: "06/15/2016",Todate:"07/15/2017",Subscriber:"Subscriber12",Status:"ERR",Repoflag:"NO",Security:"XS0230228933",CParty:"C820",Quantity:40000000.00,Price:99.7600,Ccy:"EUR",PS:"P",Type:"NTRD"}];

	   $scope.Subscriber = ["Subscriber1", "Subscriber2", "Subscriber3","Subscriber4","Subscriber5","Subscriber6","Subscriber7","Subscriber8","Subscriber9","Subscriber10","Subscriber11","Subscriber12"];
	    $scope.startDate='';
	    $scope.EndDate='';
	    $scope.selectedSubscriber='';
	    $scope.var1='';
	      
		   $scope.filterOptions = {
				    filterText: '',
				    useExternalFilter: true
				  };
		   
		   $scope.pagingOptions = {
				   pageSizes: [2, 4, 6],
				  pageSize: 10,
			        totalServerItems: 0,
			        currentPage: 1
			    };  
		   
		   $scope.setPagingData = function(data, page, pageSize){	
		        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
		        $scope.myData1 = pagedData;
		        $scope.pagingOptions.totalServerItems = data.length;
		        if (!$scope.$$phase) {
		            $scope.$apply();
		        }
		    };
		    
		    
		    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
		        setTimeout(function () {
		        	var data1;

		            if (searchText) {
		                var ft = searchText.toLowerCase();
		                $http.get('http://jsonplaceholder.typicode.com/posts/').success(function (largeLoad) {		
		                    data1 = largeLoad.filter(function(item) {
		                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
		                    });
		                    $scope.setPagingData(data1,page,pageSize);
		                });            
		            } else {
		                $http.get('http://jsonplaceholder.typicode.com/posts/').success(function (largeLoad) {
		                    $scope.setPagingData(largeLoad,page,pageSize);
		                });
		            }
		        }, 100);
		    };
			
		    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
			
		    $scope.$watch('pagingOptions', function () {
		    //	console.log("claasssic"+data1);
		        console.log( "watch changed pagingOptions" );
		        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		    }, true);
		   $scope.$watch('filterOptions', function () {
		        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		    }, true);   
		   
		   
		   
		   
			$scope.activateFilter = function() 
			  {
			    var Subscriber = $scope.filterSubscriber || null;
			    var Todate = ($scope.filterTodate) ? $scope.filterTodate.toString() : null;
			    var FromDate = ($scope.filterFromDate) ? $scope.filterFromDate.toString() : null;
			  //  if (!Subscriber && !Todate) Subscriber='';
			    
			    $scope.filterData = angular.copy($scope.myData, []);
			    $scope.filterData = $scope.filterData.filter( function(item) {
			
			 if(FromDate!=null )
	    		{
		    		if(Todate==null && Subscriber==null)
		    			return (item.FromDate.toString().indexOf(FromDate) > -1 );
		    		else if(Todate!=null && Subscriber==null)
		    			return (item.FromDate.toString().indexOf(FromDate) > -1 && item.Todate.toString().indexOf(Todate) > -1);
		    		else if(Todate==null && Subscriber!=null)
		    			return (item.FromDate.toString().indexOf(FromDate) > -1 && item.Subscriber.indexOf(Subscriber)>-1);
		    		else
		    			return (item.Subscriber.indexOf(Subscriber)>-1 && item.Todate.toString().indexOf(Todate) > -1 &&  item.FromDate.toString().indexOf(FromDate) > -1);
	    		
	    		}
					    	
			 if(Todate!=null)
	    		{
		    		if(FromDate==null && Subscriber==null)
		    			return (item.Todate.toString().indexOf(Todate) > -1 );
		    		else if(FromDate!=null && Subscriber==null)
		    			return (item.FromDate.toString().indexOf(FromDate) > -1 && item.Todate.toString().indexOf(Todate) > -1);
		    		else if(FromDate==null && Subscriber!=null)
		    			return (item.Todate.toString().indexOf(Todate) > -1 && item.Subscriber.indexOf(Subscriber)>-1);
		    		else
		    			return (item.Subscriber.indexOf(Subscriber)>-1 && item.Todate.toString().indexOf(Todate) > -1 &&  item.Todate.toString().indexOf(FromDate) > -1);
	    		
	    		}
					    	
			 if(Todate==null || FromDate==null)
	    		{
	    		return (item.Subscriber.indexOf(Subscriber)>-1);
	    		}
			 else
	    		{
	    		return (item.Subscriber.indexOf(Subscriber)>-1 && item.Todate.toString().indexOf(Todate) > -1 &&  item.FromDate.toString().indexOf(FromDate) > -1);
	    		}
			    	// return (item.Subscriber.indexOf(Subscriber)>-1 && item.Todate.toString().indexOf(Todate) > -1 ||  item.FromDate.toString().indexOf(FromDate) > -1);
			    });
			  };
			    
			  
			  

			  $scope.filterData = angular.copy($scope.myData, []);
			    
			  $scope.gridOptions = {
					  paginationPageSizes:[5, 10, 15],
					   paginationPageSize: 10,
					   paginationOptions: $scope.pagingOptions,
					   filterOptions: $scope.filteroptions ,
					   enablePaging: true,
					   
				        showFooter: true,
				        enableSorting: true,
					    multiSelect: false,
					        
					    enableRowSelection: true, 
					    enableSelectAll: false,
					    enableRowHeaderSelection: false,
					    selectionRowHeaderWidth: 35,  
					    noUnselect: true,
					    enableGridMenu: true,
				        appScopeProvider: $scope.myAppScopeProvider,
				         onRegisterApi: function(gridApi){
				      grid = gridApi;
				    },
				    data:'filterData',
				    rowTemplate: rowTemplate()
				       
				}

		 
	//   $scope.filterData = angular.copy($scope.myData, []);
	  //binding data to grid 
	// 	$scope.gridOptions = { data: 'filterData',filterOptions: $scope.filteroptions };
	  
	  	
		
	  	//reset function
	    $scope.reset=function()
	       {
	    	 $scope.filterTodate=' ';
	    	 $scope.filterSubscriber=' ';
	    	 $scope.filterFromDate=' ';
	    	 $scope.Var1=' ';
	    	
	    	 $scope.filterData = angular.copy($scope.myData, []);
	    	 $scope.gridOptions = { data: 'filterData',filterOptions: $scope.filteroptions };
		    }
	    
	    $scope.Submit=function(){
	      
	    console.log($scope.startDate);
	    console.log($scope.EndDate);
	    console.log($scope.selectedSubscriber);
	    console.log($scope.Var1);
	    }
}]);


myApp.controller('InfoController', 
	    ['$scope', '$modal', '$modalInstance', '$filter', '$interval', 'selectedRow',
	    function ($scope, $modal, $modalInstance, $filter, $interval, selectedRow) {

	        $scope.selectedRow = selectedRow;

	       $scope.ok = function () {
	            $scope.selectedRow = null;
	            $modalInstance.close();
	        };

	        $scope.cancel = function () {
	            $scope.selectedRow = null;
	            $modalInstance.dismiss('cancel');
	        };
	    }
	]);


