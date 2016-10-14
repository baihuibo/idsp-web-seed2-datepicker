///<reference path="../typings/datepicker.d.ts"/>
///<reference path="../typings/daterangepicker/daterangepicker.d.ts"/>

// Created by baihuibo on 2016/10/14.
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';
import 'moment';
import {module} from "angular";

const modName = 'datepicker';

export const mod = module(modName, []);
export default modName;

mod.directive('datepicker', ['$timeout', function ($timeout) {
    let defaultSetting = {
        singleDatePicker: true, // 单个选择器
        autoApply: true, // 自动设置
        showDropdowns: true, // 下拉选择月份
        locale: {
            format: 'YYYY-MM-DD',
            separator: " - ",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月",
                "七月", "八月", "九月", "十月", "十一月", "十二月"]
        }
    };
    return {
        restrict: 'E',
        template: `
            <div>
                <!-- 单日期选择器 -->
                <div class="dropdown" ng-if="singleDatePicker">
                    <button type="button" data-toggle="dropdown" class="form-control">
                        <div layout="row" layout-align="start center">
                            <div flex class="text-left d-text-overflow">{{startDate}}</div>
                            <div class="caret"></div>
                        </div>
                    </button>
                </div>
                
                <!-- 范围日期选择器 -->
                <div ng-if="!singleDatePicker" layout="row" layout-align="start center">
                    <button type="button" data-toggle="dropdown" class="form-control">
                        <div layout="row" layout-align="start center">
                            <div flex class="text-left d-text-overflow">{{startDate}}</div>
                            <div class="caret"></div>
                        </div>
                    </button>
                    <i style="margin:5px 7px;">-</i>
                    <button type="button" data-toggle="dropdown" class="form-control">
                        <div layout="row" layout-align="start center">
                            <div flex class="text-left d-text-overflow">{{endDate}}</div>
                            <div class="caret"></div>
                        </div>
                    </button>
                </div>
            </div>
        `,
        replace: true,
        scope: {
            startDate: '=?',
            endDate: '=?',
            rangeMode: '@',
            option: '=?'
        },
        require: '?ngModel',
        link(scope, el, attr,
             ngModel: ng.INgModelController){

            let option: daterangepicker.Settings = $.extend(true, {}, defaultSetting, scope['option'] || {});

            if (attr.rangeMode != void 0) {
                option.singleDatePicker = false;
            }

            scope.singleDatePicker = option.singleDatePicker;

            $timeout(function () {
                let value = '';
                if (ngModel) {
                    value = ngModel.$modelValue || ngModel.$viewValue;

                    // 监听model值的设置
                    scope.$parent.$watch(attr['ngModel'],
                        function (newValue, oldValue, scope) {
                            if (newValue && newValue != oldValue) {
                                setDate(newValue);
                            }
                        });
                }

                setDate(value);
            });

            scope.$on('$destroy', function () {
                picker && picker.remove();
            });

            let picker;
            let {format, separator} = option.locale;
            let singleDatePicker = !!option.singleDatePicker;

            function setDate(value) {
                let strs = String(value || '').split(separator);
                if (strs.length == 2) {
                    scope['startDate'] = strs[0];
                    scope['endDate'] = strs[1];
                } else if (strs.length == 1) {
                    scope['startDate'] = scope['endDate'] = strs[0];
                }

                if (scope['startDate']) { // 设置开始时间
                    option.startDate = scope['startDate'];
                }

                if (scope['endDate']) { // 设置结束时间
                    option.endDate = scope['endDate'];
                }

                if (picker) {
                    picker.remove();
                }

                initPicker();

                setViewValue(picker);
            }

            function initPicker() {
                picker = el.daterangepicker(option)
                    .on('apply.daterangepicker', function (e) {
                        setViewValue(picker);
                    }).data('daterangepicker');
            }

            function setViewValue({startDate, endDate}) {
                let date = '';
                scope['startDate'] = startDate.format ? startDate.format(format) : startDate;
                scope['endDate'] = endDate.format ? endDate.format(format) : endDate;
                if (singleDatePicker) {
                    date = scope['startDate'];
                } else {
                    date = scope['startDate'] + separator + scope['endDate'];
                }
                if (ngModel) {
                    ngModel.$setViewValue(date);
                } else {
                    scope.$applyAsync();
                }
            }
        }
    }
}]);