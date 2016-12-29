"use strict";
// Created by baihuibo on 2016/10/14.
require('bootstrap');
require("bootstrap/dist/css/bootstrap.min.css");
require("angular-material/layouts/angular-material.layout-attributes.min.css");
var datepicker_1 = require("./datepicker");
var angular_1 = require("angular");
var app = angular_1.module('app', [datepicker_1.default]);
app.run(function ($rootScope) {
    $rootScope.rangeOption = {
        locale: {
            format: 'YYYY-MM-DD HH'
        },
        timePicker: true,
        singleDatePicker: false
    };
});
angular_1.bootstrap(document, ['app']);
