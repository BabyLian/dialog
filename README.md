### 弹窗
功能：支持标题、内容、按钮文字、点击事件的配置
![image](https://github.com/BabyLian/dialog/blob/master/screenshots.png)

####配置参数
  addClass: '', //包裹在外层的类名, 用来改变外观
  
  
  cancelValue: '取消', //取消按钮的文案
  
  
  cancelFun: '', //点击X和取消时的事件
  
  
  sureValue: '确定', //确定按钮的文案
  
  
  sureFun: '', //点击确定时的事件
  
  
  title: '提示', //标题
  
  
  content: '内容' //弹窗内容
  
####如何使用
```
new Dialog("你好吧", {addClass: 'song', title: "抽奖", cancelValue: "残忍拒绝", sureValue: "果断接受", 
            cancelFun: function () {
                    alert("close")
                }, 
            sureFun: function () {
                    alert("sure")
                }
    });

```
