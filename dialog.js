/**
 * Created by Lian on 2015/7/31.
 */
(function () {
    var body = document.body,
        html = document.documentElement;
    
    function Dialog(content, option) {
        /*移除之前的弹窗*/
        if (Dialog.elem) {
            body.removeChild(Dialog.elem);
            Dialog.elem = null;
        }
        /*默认设置*/
        var setting = {
            addClass: '',
            cancelValue: '取消',
            cancelFun: '',
            sureValue: '确定',
            sureFun: '',
            title: '提示',
            content: '内容'
        };

        var item;
        if (!option) {
            option = {};
        }
        if (content) {
            option.content = content;
        }

        for (item in setting) {
            if (option[item] !== void 0) {
                setting[item] = option[item];
            }
        }
        this.init(setting);
    }

    Dialog.prototype = {
        init: function (setting) {
            var htmlArray,
                html = '';
            htmlArray = [
                '<div class="dialog-mask"></div>',
                    '<div class="dialog-wrap ' + setting.addClass + '">',
                '<div class="dialog-inner">',
                    '<div class="dialog-hd">' + setting.title + '<a href="javascript:void(0)" class="dialog-X">×</a></div>',
                    '<div class="dialog-bd">' + setting.content + '</div>',
                    '<div class="dialog-ft"><a href="javascript:void(0)" class="dialog-cancel" style="display: ' + (setting.cancelValue == null ? 'none' : '') + '">' + setting.cancelValue + '</a><a href="javascript:void(0)" class="dialog-sure" style="display: ' + (setting.sureValue == null ? 'none' : '') + '">' + setting.sureValue + '</a></div>',
                '</div>',
                '</div>'
            ];
            html = htmlArray.join('');
            this.render(html);
            this.bind(setting);
        },
        /*添加弹窗的内容*/
        render: function (html) {
            var elem = document.createElement("div");
            elem.className = 'dialog';
            elem.id = 'J_Dialog';
            elem.innerHTML = html;
            /*先隐藏, 绑定事件后再显示*/
            elem.style.display = 'none';
            body.appendChild(elem);
            Dialog.elem = elem;
        },
        /*居中显示*/
        show: function () {
            var $wrap = getElem(".dialog-wrap"),
                height,
                top;
            /*此处需先设置外围Div的样式, 以此覆盖之前设置的display:none, 否则算出的top会=0*/
            Dialog.elem.style.cssText = ['width:100%', 'height:' + getScrollHeight() + 'px', 'position:absolute', 'top:0', 'left:0'].join(";");

            height = $wrap.offsetHeight / 2;
            top = getScrollTop() + getClientHeight() / 2 - height;
            $wrap.style.top = top + 'px';
        },
        hide: function () {
            Dialog.elem.style.display = 'none';
        },
        /*事件绑定*/
        bind: function (setting) {
            var $closeBtn = getElem(".dialog-X"),
                $sureBtn = getElem(".dialog-sure"),
                $cancelBtn = getElem(".dialog-cancel"),
                self = this;

            var cancel = function () {
                if (typeof (setting.cancelFun) === 'function') {
                    setting.cancelFun();
                }
                self.hide();
            };

            var sure = function () {
                if (typeof (setting.sureFun) === 'function') {
                    setting.sureFun();
                }
                self.hide();
            };

            $cancelBtn.onclick = $closeBtn.onclick = cancel;
            $sureBtn.onclick = sure;

            /*显示弹窗*/
            this.show();
        }
    };

    /*Dom查询*/
    function getElem(name) {
        return Dialog.elem.querySelector(name);
    }

    function getScrollHeight() {
        return Math.max(html.scrollHeight, body.scrollHeight);
    }
    function getScrollTop() {
        return html.scrollTop || body.scrollTop;
    }
    function getClientHeight() {
        return Math.min(html.clientHeight, body.clientHeight);
    }

    window.Dialog = Dialog;
})();