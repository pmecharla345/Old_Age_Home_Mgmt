var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    const userId = localStorage.getItem("userId");
    $scope.admin = localStorage.getItem("admin");
    var URL = "https://fir-1c7de-default-rtdb.firebaseio.com";
    $scope.onload = function () {
        $scope.viewUserData = [];
        $scope.pickDropData = {};
        $scope.userData = {};
        $scope.isIteamTab = false;
        $scope.admin == 'ADMIN' ? $scope.getAdminTableData() : $scope.getUserTableData();
        $("#myapplyLeaveDivId").hide();
        $("#applyLeaveDivId").hide();
        $("#aboutDivId").show();
    }
    $scope.payment = function () {
        $scope.userData.date = new Date().toISOString().split('T')[0],

            $.ajax({
                type: 'post',
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                url: URL + "/oldAgeHome/" + userId + ".json",
                data: JSON.stringify($scope.userData),
                success: function (response) {
                    $scope.getUserTableData();
                    alert("Data submitted sucessfully!!!");
                }, error: function (error) {
                    alert("Something went wrong");
                }
            });
    }

    $scope.getUserTableData = function () {

        $scope.viewUserData = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/oldAgeHome/" + userId + ".json",
            success: function (response) {
                for (let i in response) {
                    let eventData = response[i];
                    eventData["userId"] = i;
                    $scope.viewUserData.unshift(response[i]);
                }
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.getAdminTableData = function () {
        $scope.viewUserData = [];
        let leaveList = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/oldAgeHome.json",
            success: function (response) {
                for (let data in response) {
                    //let eventData = response[data];

                    //orderList.push(eventData);
                    for (let x in response[data]) {
                        let eventData = response[data][x];
                        eventData["userId"] = data;
                        eventData["childUserId"] = x;
                        leaveList.unshift(eventData);
                    }
                }
                $scope.viewUserData = leaveList;
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }


    $scope.logout = function () {
        window.location.href = "login.html";
    }
    $scope.switchMenu = function (type, id) {
        $(".menuCls").removeClass("active");
        $('#' + id).addClass("active");
        $scope.isIteamTab = false;
        $("#myapplyLeaveDivId").hide();
        $("#aboutDivId").hide();
        $("#applyLeaveDivId").hide();
        if (type == "MY_LEAVES") {
            $scope.userData = {};
            $scope.admin == 'ADMIN' ? $scope.getAdminTableData() : $scope.getUserTableData();
            $("#myapplyLeaveDivId").show();
        } else if (type == "APPLY_LEAVE") {
            $("#applyLeaveDivId").show();
            $scope.pickDropData = {};
            $scope.isIteamTab = true;
        } else if (type == "ABOUT") {
            $("#aboutDivId").show();
        }

    }
});
