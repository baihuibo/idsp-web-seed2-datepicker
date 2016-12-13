// Created by baihuibo on 2016/10/14.
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "angular-material/layouts/angular-material.layout-attributes.min.css"
import datepicker from "./datepicker";
import {module, bootstrap} from "angular";

const app = module('app', [datepicker]);

app.run(function ($rootScope) {

    $rootScope.rangeOption = {
        locale: {
            format: 'YYYY-MM-DD HH'
        },
        timePicker: true, // 开启时间选择
        singleDatePicker: false
    };
});

bootstrap(document, ['app']);