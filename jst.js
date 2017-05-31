/*! jst - v0.0.1 - 2017-05-30 - (MIT) */
var tree = {
    item: function (li, a) {
        this.li = li;
        this.a = a;
        this.clear = function () {
            this.li.getElementsByTagName('ul')[0].innerHTML = '';
        };
        this.parent = function () {
            var ul = this.li.parentElement;
            var li = null, ni = null, a = null;
            if (ul.nodeName == 'UL') {
                li = ul.parentElement;
                var a = li.getElementsByTagName('a')[0];
                if (li.nodeName == 'LI' && a.nodeName == 'A') {
                    ni = new tree.item(li, a);
                    console.log("FIND ITEM", ni);
                }
            }
            return ni;
        };
    },
    createItem: function (parent, text, icon, haschildren, onexpand, oncolapse, onclick) {
        var li = document.createElement('li');
        var img = document.createElement('img');
        if (haschildren) {
            img.src = "jqtree/plus.gif";
            img.className = 'openChildNode';
        } else {
            img.src = "jqtree/blank.gif";
        }
        li.appendChild(img);
        if (icon != null) {
            var symbol = document.createElement('img');
            symbol.src = icon;
            li.appendChild(symbol);
        }
        var a = document.createElement('a');
        li.appendChild(a);
        var textnode = document.createTextNode(text);
        a.appendChild(textnode);
        var ul = document.createElement('ul');
        li.appendChild(ul);
        if (parent != null) {
            parent.appendChild(li);
        }
        var item = new this.item(li, a);
        img.onclick = function () {
            if (img.className == 'openChildNode') {
                img.className = 'closeChildNode';
                img.src = "jqtree/minus.gif";
                onexpand(item);
            } else {
                img.className = 'openChildNode';
                img.src = "jqtree/plus.gif";
                item.li.getElementsByTagName('ul')[0].innerHTML = '';
                oncolapse(item);
            }
        };
        a.onclick = function () {
            onclick(item);
        };
        return item;
    },
    add: function (parent, text, icon, haschildren, onexpand, oncolapse, onclick) {
        if (parent.tagName != 'UL') {
            /* search ul */
            parent = parent.getElementsByTagName('ul')[0];
        }
        var li = this.createItem(parent, text, icon, haschildren, onexpand, oncolapse, onclick);
        return li;
    }
};
