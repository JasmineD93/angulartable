var app = angular.module('rcr_sched',[]);

app.controller('main', ['$scope', '$location','$window', function ($scope, $location, $window){
        $window.onload = function(e){
            var split = $location.absUrl().split("?")
            var isprinting = (split[1].split("="))[1]
            if(isprinting == "true")
                {
                    $scope.isprinting = true;
                }
            else{
                $scope.isprinting = false; 
            }
        }
        $scope.goNext = function(view){
            $location.path('/');
        }
        $scope.data = [];
        $scope.columns = [];
        $scope.currentDate = new Date();
        $scope.calculateDate = function() {
            var x = new Date();
            return {
                'MonThisWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() - (x.getDay() - 1)), title:'MonThisWk'},
                'TueThisWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() - (x.getDay() - 2)),title:'TueThisWk'},
                'WedThisWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() - (x.getDay() - 3)),title:'WedThisWk'},
                'ThuThisWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() - (x.getDay() - 4)),title:'ThuThisWk'},
                'FriThisWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() - (x.getDay() - 5)),title:'FriThisWk'},
                'MonNextWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 7 - (x.getDay() - 1)),title:'MonNextWk'},
                'TueNextWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 7 - (x.getDay() - 2)),title:'TueNextWk'},
                'WedNextWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 7 - (x.getDay() - 3)),title:'WedNextWk'},
                'ThuNextWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 7 - (x.getDay() - 4)),title:'ThuNextWk'},
                'FriNextWk': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 7 - (x.getDay() - 5)),title:'FriNextWk'},
                'Mon2Wks': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 14 - (x.getDay() - 1)),title:'Mon2Wks'},
                'Tue2Wks': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 14 - (x.getDay() - 2)),title:'Tue2Wks'},
                'Wed2Wks': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 14 - (x.getDay() - 3)),title:'Wed2Wks'},
                'Thu2Wks': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 14 - (x.getDay() - 4)),title:'Thu2Wks'},
                'Fri2Wks': {date: new Date(x.getFullYear(), x.getMonth(), x.getDate() + 14 - (x.getDay() - 5)), title:'Fri2Wks'}
            }
        }
        $scope.printview = function(){
            domo.navigate("https://b14e33be-5dfa-4ed5-88ba-1ca2c0a912cf.domoapps.prod5.domo.com?printing=true",true)
        }
        $scope.isprinting = false;
        $scope.isPTO = function(rowTitle, ptoTitle, value) {
            if (rowTitle == (ptoTitle.replace('PTO', '')) && value) {
                return 'background-color: #7DD961;';
            }
            return '';
            
        }
        
        $scope.print = function(){
            window.print();
        }
        $scope.isHol = function(rowTitle, holTitle, value ){
            if (rowTitle == (holTitle.replace('Hol', '')) && value){
                return 'background-color: #c3aed6;';
            }
            return '';
        }
    $scope.dateOptions = $scope.calculateDate();
        $scope.getColor = function(teamRank, team, prop) {
            let today = new Date();
            
            if (prop == 'Team' || prop == 'TeamMember') 
            {
                if (team == 'Unassigned') 
                {
                    return "grayClass";
                }
                else if (team == 'Gold One') 
                {
                    return "goldClass";
                }
                else if (team == 'Red One' || team == 'Red Two') 
                {
                    return "redClass";
                }
                else if (team == 'Blue One' || team == 'Blue Two') {
                    return "blueClass"
                }
                else if (team == 'Green One') 
                {
                    return "greenClass";
                }
                else
                {
                    return "grayClass";
                }
            }
			if(prop == 'MonThisWk')
           {
               if(today.getDay() == 1)
               {
                    return "highlightClass";   
               } 
           }
            if(prop == 'Mon2Wks')
            {
                if(today.getDay() == 1)
                {
                    return "highlightClass;"
                }
            }
           if(prop == 'TueThisWk')
           {
               if(today.getDay() == 2)
               {
                    return "highlightClass";   
               }
           }
            if(prop == 'Tue2Wks')
            {
                if(today.getDay() == 1 && prop.HolMon2Wks !== null)
                {
                 return "highlightClass";
                }
                else if(today.getDay() == 2 && prop.HolTue2Wks !== null)
                {
                    return '';
                }
                else if(today.getDay() == 2)
                {
                    return "highlightClass";
                }
            }
           if(prop == 'WedThisWk')
           {
               if(today.getDay() == 3)
               {
                    return "highlightClass";   
               }
           }
            if(prop == 'Wed2Wks')
            {
                if(today.getDay() == 2 && prop.HolTue2Wks !== null)
                {
                 return "highlightClass";
                }
                else if(today.getDay() == 3 && prop.HolWed2Wks !== null)
                {
                    return '';
                }
                else if(today.getDay() == 3)
                {
                    return "highlightClass";
                }
            }
           if(prop == 'ThuThisWk')
           {
               if(today.getDay() == 4)
               {
                    return "highlightClass";   
               }
           }
            if(prop == 'Thu2Wks')
            {
               if(today.getDay() == 3 && prop.HolWed2Wks !== null)
                {
                 return "highlightClass";
                }
                else if(today.getDay() == 4 && prop.HolThu2Wks !== null)
                {
                    return '';
                }
                else if(today.getDay() == 4)
                {
                    return "highlightClass";
                }
            }
            if(prop == 'FriThisWk')
           {
               if(today.getDay() == 5)
               {
                    return "highlightClass";   
               }
           }
            if(prop == 'Fri2Wks')
            {
                if(today.getDay() == 4 && prop.HolThu2Wks !== null)
                {
                    return "highlightClass";
                }
                else if(today.getDay() == 5 && prop.HolFri2Wks !== null)
                {
                    return '';
                }
                else if(today.getDay() == 5)
                {
                    return "highlightClass;"
                }
            }
            
        }

        domo.get('data/v1/master?fields=Team,TeamMember,TotalJobs,NDD,Past,MonThisWk,TueThisWk,WedThisWk,ThuThisWk,FriThisWk,MonNextWk,TueNextWk,WedNextWk,ThuNextWk,FriNextWk,Mon2Wks,Tue2Wks,Wed2Wks,Thu2Wks,Fri2Wks,Future,TotalJobs,PTOMonThisWk,PTOTueThisWk,PTOWedThisWk,PTOThuThisWk,PTOFriThisWk,PTOMon2Wks,PTOTue2Wks,PTOWed2Wks,PTOThu2Wks,PTOFri2Wks,PTOMonNextWk,PTOTueNextWk,PTOWedNextWk,PTOThuNextWk,PTOFriNextWk,HolMonThisWk,HolTueThisWk,HolWedThisWk,HolThuThisWk,HolFriThisWk,HolMonNextWk,HolTueNextWk,HolWedNextWk,HolThuNextWk,HolFriNextWk,HolMon2Wks,HolTue2Wks,HolWed2Wks,HolThu2Wks,HolFri2Wks&groupby=TeamRank,Team,TeamMember&orderby=TeamRank')
            .then(function(data){
                $scope.data = data;
                for (prop in data[0]) {
                    if ($scope.dateOptions[prop]) {
                        var newDate = $scope.dateOptions[prop];
                        var formattedProp = {date: (newDate.date.getMonth() + 1).toString() + '/' + newDate.date.getDate().toString(), title: newDate.title};
                    }
                    else {
                        var formattedProp = {date: prop, title: prop};
                    }
                    $scope.columns.push(formattedProp);
                }
                $scope.$apply();
            })
    }]);


