interface DatepickerOption {

    /* 是否为单日期选择模式  default : false */
    singleDatePicker?: boolean

    /* 是否自动应用选择  default : true */
    autoApply?: boolean

    /* 是否显示下拉框来选择年和月  default : true */
    showDropdowns?: boolean

    /* 设置开始日期 */
    startDate?: string | Date | moment.Moment

    /* 设置结束日期 */
    endDate?: string | Date | moment.Moment

    /* 设置可选择最小日期 */
    minDate?: string | Date | moment.Moment

    /* 设置可选择最大日期 */
    maxDate?: string | Date | moment.Moment

    /* 设置日期范围最大间隔天数 */
    dateLimit?: {
        days?: number // 多少天
    }

    /* 是否显示时间选择(时分秒选择) */
    timePicker?: boolean

    /* time选择递增数 */
    timePickerIncrement?: number

    /* 是否显示时间选择(时分秒选择) */
    timePicker24Hour?: boolean

    /* 设置日期组件方向 */
    opens?: 'left'|'right'|'center'

    /* 渲染模板到目标 default :  'body' */
    parentEl?: string | Element | JQuery
    locale?: {
        /* 时间格式化模板  default : 'YYYY-MM-DD' */
        format?: string

        /* 开始时间和结束时间的拼接字符串 default : ' - ' */
        separator?: string
    }
}