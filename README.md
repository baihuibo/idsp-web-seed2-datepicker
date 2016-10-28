# idsp-web-seed2-datepicker
日期选择器

安装方法

### 1. 下载程序包
```bash
npm i idsp-web-seed2-datepicker --save
```

### 2. 配置文件依赖

找到 `index.html` 文件的systemjs配置,加入 `idsp-web-seed2-datepicker`  配置
```js
SystemJS.config({
    transpiler: 'ts',
    typescriptOptions: {
        // ...
    },
    packages: {
        //...
       
        // 组件设置 
        'idsp-web-seed2-datepicker': {main: 'src/datepicker.ts'},
        'daterangepicker': {main: 'daterangepicker.js', format: 'cjs'},
        'moment': {main: 'moment.js'},
    
        "src": {
            //...
        }
    },
    meta: {
        '*.less': {loader: 'less'},
        '*.css': {loader: 'css'},
        // ...
    },
    
    map: {
        // ...
        'idsp-web-seed2-datepicker': 'node_modules/idsp-web-seed2-datepicker',
        'daterangepicker': 'node_modules/bootstrap-daterangepicker',
        'moment': 'node_modules/moment',
    }
});
```

### 3. 在项目`src/common/directives/directives.ts`中依赖组件

```ts
//...
import datepicker from "idsp-web-seed2-datepicker";

export const mod = module('directives', [...others, datepicker]);
```


### 4. 接下来就可以使用日期组件了
```html
<datepicker 
  [ng-model="Ctrl.time"]
  [range-mode]
  [option="Ctrl.dateOption"]
  [start-date="Ctrl.startDate"]
  [end-date="Ctrl.endDate"]
  >
</datepicker>
```
```ts
@Route({
  ...
  controllerAs : 'Ctrl'
})
@Controller
exports class PageCtrl{
  public dateOption:DatepickerOption = {
     singleDatePicker : false,
     ...
     locale : {
       ...
     }
  };
  
  public time:string;
  public startDate:string;
  public endDate:string;
  
  constructor(){
     
  }
}
```

#### 指令属性参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>option (可选)</td>
      <td>DatepickerOption</td>
      <td>用来设置日期组件</td>
    </tr>
    <tr>
      <td>ng-model (可选)</td>
      <td>String</td>
      <td>绑定日期组件的值</td>
    </tr>
    <tr>
      <td>range-mode (可选)</td>
      <td></td>
      <td>启用范围选择器模式</td>
    </tr>
    <tr>
      <td>start-date (可选)</td>
      <td>String</td>
      <td>绑定开始时间的值</td>
    </tr>
    <tr>
      <td>end-date (可选)</td>
      <td>String</td>
      <td>绑定结束时间的值</td>
    </tr>
  </tbody>
</table>

#### DatepickerOption 参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>singleDatePicker (可选)</td>
      <td>Boolean</td>
      <td>是否启用单日期选择器模式默认 true,设置为false时和使用 `range-mode` 一样效果</td>
    </tr>
    <tr>
      <td>autoApply (可选)</td>
      <td>Boolean</td>
      <td>是否自动应用选择  default : true</td>
    </tr>
    <tr>
      <td>showDropdowns (可选)</td>
      <td>Boolean</td>
      <td>是否显示下拉框来选择年和月  default : true</td>
    </tr>
    <tr>
      <td>startDate (可选)</td>
      <td>String | Date | Moment</td>
      <td>设置开始日期</td>
    </tr>
    <tr>
      <td>endDate (可选)</td>
      <td>String | Date | Moment</td>
      <td>设置结束日期</td>
    </tr>
    <tr>
      <td>minDate (可选)</td>
      <td>String | Date | Moment</td>
      <td>设置可选择最小日期</td>
    </tr>
    <tr>
      <td>maxDate (可选)</td>
      <td>String | Date | Moment</td>
      <td>设置可选择最大日期</td>
    </tr>
    <tr>
      <td>dateLimit.days (可选)</td>
      <td>Number</td>
      <td>设置日期范围最大间隔天数</td>
    </tr>
    <tr>
      <td>timePicker (可选)</td>
      <td>Boolean</td>
      <td>是否显示时间选择(时分秒选择)</td>
    </tr>
    <tr>
      <td>timePickerIncrement (可选)</td>
      <td>Number</td>
      <td>time 选择递增数</td>
    </tr>
    <tr>
      <td>timePicker24Hour (可选)</td>
      <td>Boolean</td>
      <td>时间选择模式为24小时模式</td>
    </tr>
    <tr>
      <td>opens (可选)</td>
      <td>'left'|'right'|'center'</td>
      <td>设置日期组件打开方向 default : left</td>
    </tr>
    <tr>
      <td>parentEl (可选)</td>
      <td>String | Element | JQuery</td>
      <td>渲染模板到目标 default :  'body'</td>
    </tr>
    <tr>
      <td>locale.format (可选)</td>
      <td>String</td>
      <td>时间格式化模板  default : 'YYYY-MM-DD'</td>
    </tr>
    <tr>
      <td>locale.separator (可选)</td>
      <td>String</td>
      <td>开始时间和结束时间的拼接字符串 default : ' - '</td>
    </tr>
  </tbody>
</table>
