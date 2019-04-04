;
(function(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else if(typeof exports === 'object') {
        exports['$_$'] = factory();
    } else {
        root['$_$'] = factory();
    }
})(this, function() {
    return(function(modules) { // webpackBootstrap
        /******/ // The module cache
        /******/
        var installedModules = {};

        /******/ // The require function
        /******/
        function __require__(moduleId) {

            /******/ // Check if module is in cache
            /******/
            if(installedModules[moduleId])
            /******/
                return installedModules[moduleId].exports;

            /******/ // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: false
                /******/
            };

            /******/ // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __require__);

            /******/ // Flag the module as loaded
            /******/
            module.loaded = true;

            /******/ // Return the exports of the module
            /******/
            return module.exports;
            /******/
        }

        /******/ // expose the modules object (__webpack_modules__)
        /******/
        __require__.m = modules;

        /******/ // expose the module cache
        /******/
        __require__.c = installedModules;

        /******/ // __webpack_public_path__
        /******/
        __require__.p = "";

        /******/ // Load entry module and return exports
        /******/
        return __require__(0);
        /******/
    })([
        /* 0*/
        /***/
        function(module, exports, __require__) {
            module.exports = __require__(1);
        },
        /* 1*/
        /***/
        function(module, exports, __require__) {
            var utils = __require__(2);
            var eChart = {
                name:'Chart',
                version:'1.0.1',
                init:init_chart
            };
            var colors = [
                "#FF4500", "#9A32CD", "#00007F", "#8e8b34", "#8B2500", "#698B22", "#cd4168", "#00868B", "#8B008B", "#006400"
                ,"#FF4500", "#9A32CD", "#00007F", "#8e8b34", "#8B2500", "#698B22", "#cd4168", "#00868B", "#8B008B", "#006400"
                ,"#FF4500", "#9A32CD", "#00007F", "#8e8b34", "#8B2500", "#698B22", "#cd4168", "#00868B", "#8B008B", "#006400"
                ,"#FF4500", "#9A32CD", "#00007F", "#8e8b34", "#8B2500", "#698B22", "#cd4168", "#00868B", "#8B008B", "#006400"];
            var views = [];
            var datas = [];
            var doms = [];
            function init_chart(dom) {
                var w = document.body.clientWidth;
                var h = document.body.clientHeight-45;
                dom.width = w;
                dom.height = h;
                dom.style.width = w+"px";
                dom.style.height = h+"px";
                dom.innerHTML = "";
                var models = __require__(3);
                models.initParam(dom);
                var chart = new Chat(models);
                return chart;
            }
            function Chat(models) {
                var _opts;
                var _json_arr;
                this._models = models;
                this.setOptions = function (opts) {
                    this._opts = opts;
                }
                this.setJsonArray = function (json_str, type, select) {
                    var arr = json_str;
                    if(typeof json_str === 'string'){
                        arr = JSON.parse(json_str);
                    }
                    if(type=="pie3d"){
                        var pie_arr = this.processData(arr,select);
                        this.daw3dPie(pie_arr,colors);
                    }else{
                        this.drawAxis();
                        this.addDatas(arr);
                    }
                }
                this.processData = function (arr,select) {
                    return this._models.process_data(arr,select);
                }
                this.daw3dPie = function (pie_arr) {
                    this._models.daw_3d_Pie(pie_arr,colors);
                }
                this.drawAxis = function () {
                    this._models.drawAxis();
                }
                this.addDatas = function (_json_arr) {
                    this._models.addDatas(_json_arr);
                }
            }
            Chat.fn = Chat.prototype;
            Chat.fn.init = function () {

            }

            var $_$ = eChart;
            module.exports = $_$;
        },
        /* 2*/
        /***/
        function(module, exports) {
            /**
             * 日期范围工具类
             */
            var Utils = function(){
            }
            module.exports = Utils();
        },
        /* 3*/
        /***/
        function(module, exports) {
            /**
             * 数据模型
             */
            var Model = function(){
                var _dom;
                var _width;
                var _height;
                var _ctx;
                var _leftBottom;
                var _rightTop;
                var _gap = 10;
                var _fontSize;
                var _paddingX;
                var _json_arr;
                var _this = this;
                var unit = 10;
                this.initParam = function (dom) {
                    this._dom = dom;
                    this._width = dom.width;
                    this._height = dom.height;
                    this._leftBottom = 60;
                    this._rightTop = 30;
                    this._fontSize = 12;
                    this._paddingX = 0;
                    var canvas = document.createElement("canvas");
                    canvas.width = this._width;
                    canvas.height = this._height;
                    canvas.addEventListener("mousewheel", this.mousewheel, true);
                    this._ctx = canvas.getContext("2d");
                    this._ctx.translate(0.5, 0.5);
                    dom.appendChild(canvas);
                    this.clearRect();
                }
                this.mousewheel = function (event) {
                    var de = event.wheelDelta;
                    var hPadding = 30;
                    if(de>0){
                        _this._paddingX-=hPadding;
                    }else{
                        _this._paddingX+=hPadding;
                    }
                    var w = _this._width-_this._rightTop-_this._leftBottom;
                    if(_this._paddingX>0){
                        _this._paddingX==0;
                    }else if(_this._paddingX<-_this._json_arr.length*hPadding+w){
                        _this._paddingX = -_this._json_arr.length*hPadding+w;
                    }else{
                        _this.refresh();
                    }
                }
                this.drawAxis = function () {
                    var ctx = this._ctx;
                    var w = this._width;
                    var h = this._height;
                    var l = this._leftBottom;
                    var t = this._rightTop;
                    ctx.setLineDash([1, 0]);
                    ctx.strokeStyle = "#000000";
                    ctx.beginPath();
                    ctx.moveTo(l,t);
                    ctx.lineTo(l,h-l);
                    ctx.lineTo(w-t,h-l);
                    ctx.stroke();

                    var ling = h-l;
                    var padding = (h-l-t-_gap)/33;
                    ctx.beginPath();
                    ctx.font = this._fontSize + "px Arial";
                    ctx.fillText('0',l-_gap*2 , ling+this._fontSize/2);
                    ctx.closePath();
                    ctx.setLineDash([3, 6]);
                    for(var i=1;i<=33;i++){
                        var y = ling-(i*padding);
                        ctx.beginPath();
                        ctx.strokeStyle = "#80857D";
                        ctx.moveTo(l,ling-(i*padding));
                        ctx.lineTo(w-t,ling-(i*padding));
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.font = this._fontSize + "px Arial";
                        ctx.fillStyle = "#000000";
                        ctx.fillText(i,l-_gap*2 , y+this._fontSize/3);
                        ctx.closePath();
                    }
                }
                this.addDatas = function (json_arr) {
                    this._json_arr = json_arr;
                    var hPadding = 30;
                    var ctx = this._ctx;
                    var w = this._width;
                    var h = this._height;
                    var l = this._leftBottom;
                    var t = this._rightTop;
                    var padding = (h-l-t-_gap)/33;
                    var r = padding/2;
                    for(item in json_arr){
                        var json = json_arr[item];
                        var redOne = json.redone;
                        var redTwo = json.redtwo;
                        var redThree = json.redthree;
                        var redFour = json.redfour;
                        var redFive = json.redfive;
                        var redSix = json.redsex;
                        var blue = json.blueone;

                        var x = l+item*hPadding+hPadding;
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redOne,r,h,l,padding);
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redTwo,r,h,l,padding);
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redThree,r,h,l,padding);
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redFour,r,h,l,padding);
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redFive,r,h,l,padding);
                        ctx.fillStyle = "#FF0000";
                        this.drawRedBall(ctx,x,redSix,r,h,l,padding);
                        ctx.fillStyle = "#0000FF";
                        this.drawRedBall(ctx,x,blue,r,h,l,padding);

                        ctx.save();
                        ctx.beginPath();
                        ctx.translate(x+this._paddingX-5 , h-l+_gap-5);
                        ctx.rotate(60 * Math.PI / 180);
                        ctx.font = this._fontSize + "px Arial";
                        ctx.fillStyle = "#000000";
                        ctx.fillText("第"+json.issue+"期",0 , 0);
                        ctx.closePath();
                        ctx.restore();

                        ctx.beginPath();
                        ctx.moveTo(x+this._paddingX , h-l);
                        ctx.lineTo(x+this._paddingX ,h-l-_gap/2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    console.log(this._paddingX);
                }
                this.drawRedBall = function (ctx,x,ball,r,h,l,padding) {
                    var y = h-l-ball*padding;
                    var scale = 0.7;
                    ctx.save();
                    ctx.beginPath();
                    ctx.scale(1,scale);
                    ctx.arc(x+this._paddingX,y/scale,r*3/2,0,Math.PI*2,false);
                    ctx.closePath();
                    ctx.fill();

                    var ba_str = ball+"";
                    if(ba_str.length==1){
                        ba_str = "0"+ba_str;
                    }
                    ctx.fillStyle = "#FFFFFF";
                    ctx.beginPath();
                    ctx.font = "8px Arial";
                    ctx.fillText(ba_str,x+this._paddingX-r , (y+r-5)/scale,50);
                    ctx.closePath();
                    ctx.restore();
                }
                this.clearRect = function () {
                    this._ctx.fillStyle = "#FFFFFF";
                    this._ctx.fillRect(0,0,this._width,this._height);
                }
                this.refresh = function () {
                    this.clearRect();
                    this.drawAxis();
                    this.addDatas(this._json_arr);
                }
                this.process_data = function (arr,select) {
                    var data_arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    var content = [
                        '1号','2号','3号','4号','5号','6号','7号','8号','9号','10号',
                        '11号','12号','13号','14号','15号','16号','17号','18号','19号','20号',
                        '21号','22号','23号','24号','25号','26号','27号','28号','29号','30号',
                        '31号','32号','33号'];
                    for(var i=0;i<arr.length;i++){
                        var redone = arr[i].redone;
                        var redtwo = arr[i].redtwo;
                        var redthree = arr[i].redthree;
                        var redfour = arr[i].redfour;
                        var redfive = arr[i].redfive;
                        var redsex = arr[i].redsex;
                        var blueone = arr[i].blueone;
                        if(select=='red'){
                            data_arr[redone-1]++;
                            data_arr[redtwo-1]++;
                            data_arr[redthree-1]++;
                            data_arr[redfour-1]++;
                            data_arr[redfive-1]++;
                            data_arr[redsex-1]++;
                        }else if(select == 'blue'){
                            data_arr[blueone-1]++;
                        }else{
                            data_arr[redone-1]++;
                            data_arr[redtwo-1]++;
                            data_arr[redthree-1]++;
                            data_arr[redfour-1]++;
                            data_arr[redfive-1]++;
                            data_arr[redsex-1]++;
                            data_arr[blueone-1]++;
                        }
                    }
                    var data = [];
                    var cot = [];
                    for(var key in data_arr){
                        var item = [];
                        if(data_arr[key]!=0){
                            data[data.length] = data_arr[key];
                            cot[cot.length] = content[key];
                        }
                    }
                    return [data,cot];
                }
                this.daw_3d_Pie = function (pie_arr,colors) {
                    var data = pie_arr;//[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
                    var gap = 50;
                    var h = 10;
                    var point_radius = 30;
                    var centerX = this._width/2;
                    var centerY = this._height/2;
                    var x =  centerX;
                    var y = centerY;
                    var z = 0;
                    var r = unit * 18;
                    var h = unit * 3;
                    var a_y = 0.8;
                    var ctx = this._ctx;
                    draw3DPie(ctx,data,x, y, z, r, h, a_y,colors);
                    this.drawInstructionCircle(data,colors);
                }
                this.drawInstructionCircle = function(datas,colors) {
                    var data = datas[0];
                    var content = datas[1];
                    var w = this._width;
                    var r = 10;
                    var sum = 0;
                    var length = data.length;
                    for(var i = 0; i < length; i++) {
                        sum+=data[i];
                    }
                    var pad = 3.2*unit;
                    var x = 0;
                    var y = 0;
                    for(var i=0;i<data.length;i++){
                        if(i<data.length/2){
                            x = unit*10;
                            y = unit*1+pad*(i+1);
                        }else{
                            x = w-unit*20;
                            y = unit*1+pad*i-parseInt(data.length%2==0?data.length/2-1:data.length/2)*pad;
                        }
                        this.drawCircleInfo(data[i],content[i],sum,x,y,r,colors[i]);
                    }
                }
                this.drawCircleInfo = function (data,text,sum,x,y,r,color) {
                    var ctx = this._ctx;
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(x,y,r,0,Math.PI*2,false);
                    ctx.closePath();
                    ctx.fill();

                    var text_str = text+'球'+(data*100/sum).toFixed(2)+'%';
                    ctx.font = "18px 宋体";
                    ctx.textBaseline = "middle";
                    ctx.beginPath();
                    ctx.fillText(text_str, x+r*1.5, y, 100);
                    ctx.closePath();
                }
            }
            var unit = 10;
            function draw3DPie(ctx,data_content,x, y, z, r, h, a_y,colors) {
                var datas = [];
                var start = 0;
                var end = 0;
                var color = 0;
                var da = [];
                var sum = 0;
                var data = data_content[0];
                var content = data_content[1];
                var length = data.length;
                for(var i = 0; i < length; i++) {
                    sum+=data[i];
                }
                for(var i = 0; i < data.length; i++) {
                    var percent = data[i] / sum;
                    var arc = 360 * percent;
                    start = end;
                    end = start + arc;
                    datas[i] = [start, end,content[i], colors[i]];
                }
                var pan1 = getPan(datas, 270);
                var pan2 = getPan(datas, 180);
                var pan3 = getPan(datas, 90);
                var data1 = getPans(datas, pan1[1], 360);
                var data2 = getPans(datas, pan2[1], pan1[0]);
                var data3 = getPans(datas, pan3[1], pan2[0]);
                var data4 = getPans(datas, 0, pan3[0]);

                drawFan(ctx,x, y, z, r, h, a_y, pan1[0], pan1[1], pan1[2], pan1[3]);
                drawFans(ctx,x, y, z, r, h, a_y,data1,false);
                drawFans(ctx,x, y, z, r, h, a_y,data2,true);
                drawFan(ctx,x, y, z, r, h, a_y, pan2[0], pan2[1], pan2[2], pan2[3]);
                drawFans(ctx,x, y, z, r, h, a_y,data3,true);
                drawFans(ctx,x, y, z, r, h, a_y,data4,false);
                drawFan(ctx,x, y, z, r, h, a_y, pan3[0], pan3[1], pan3[2], pan3[3]);
            }
            function getPan(datas, angle) {
                for(var j = 0; j < datas.length; j++) {
                    start = datas[j][0];
                    end = datas[j][1];
                    if(start <= angle && end > angle) {
                        return datas[j];
                    }
                }
            }
            function getPans(datas, s, e) {
                var pans = [];
                var start;
                var end;
                for(var j = 0; j < datas.length; j++) {
                    start = datas[j][0];
                    end = datas[j][1]>360?360:datas[j][1];
                    if(start >= s) {
                        if(end <= e) {
                            pans[pans.length] = datas[j];
                        }
                    }
                }
                return pans;
            }
            function drawFans(ctx,x, y, z, r, h, a_y,pans, dest) {
                if(dest) {
                    for(var j = pans.length - 1; j >= 0; j--) {
                        drawFan(ctx,x, y, z, r, h, a_y, pans[j][0], pans[j][1], pans[j][2], pans[j][3]);
                    }
                } else {
                    for(var j = 0; j < pans.length; j++) {
                        drawFan(ctx,x, y, z, r, h, a_y, pans[j][0], pans[j][1], pans[j][2], pans[j][3]);
                    }
                }
            }
            function drawFan(ctx,x, y, z, radius, thick, scaleY, startAngle, endAngle, content, fillStyle, strokeStyle) {
                ctx.fillStyle = "#088CB7";
                ctx.strokeStyle = "#FFFFFF";
                if(fillStyle) {
                    ctx.fillStyle = fillStyle;
                }
                if(strokeStyle) {
                    ctx.strokeStyle = strokeStyle;
                }
                var start = 0;
                var end = 0;
                if(startAngle) {
                    if(startAngle < 0) {
                        startAngle = 0;
                    } else if(startAngle >= 360) {
                        startAngle = 359.9999999;
                    }
                    startAngle = startAngle % 360;
                    start = startAngle * Math.PI / 180;
                }
                if(endAngle) {
                    if(endAngle < 0) {
                        endAngle = 0;
                    } else if(endAngle >= 360) {
                        endAngle = 359.9999999;
                    }
                    endAngle = endAngle % 360;
                    end = endAngle * Math.PI / 180;
                }
                if(start > end) {
                    var T = start;
                    start = end;
                    end = T;
                    var TT = startAngle;
                    startAngle = endAngle;
                    endAngle = TT;
                }
                var yA = 0.5;
                if(scaleY) {
                    yA = scaleY;
                }
                var p = X_Y_Z_to_X_Y(x, y, z);
                x = p.x;
                y = p.y;

                y = y / yA;
                thick = thick / yA;

                var swx = radius * Math.cos(start);
                var swy = radius * Math.sin(start);
                var ewx = radius * Math.cos(end);
                var ewy = radius * Math.sin(end);


                var centerAngle = startAngle+(endAngle-startAngle)/2;
                var centerP = 1;
                var anhei = 0;
                if(centerAngle>=0 && centerAngle < 90) {
                    centerP = 4;
                    anhei = 90-centerAngle;
                } else if(centerAngle>=90 && centerAngle < 180) {
                    centerP = 3;
                    anhei = centerAngle-90;
                } else if(centerAngle>=180 && centerAngle < 270) {
                    anhei = 270-centerAngle;
                    centerP = 2;
                } else {
                    anhei = centerAngle-270;
                    centerP = 1;
                }
                var num = (90-anhei)*0.012*unit;
                var r_a = start+(end-start)/2;
                var arc_x = radius * Math.cos(r_a);
                var arc_y = radius * Math.sin(r_a);
                var d_x = (radius+unit*5)*Math.cos(r_a);
                var d_y = (radius+unit*(4+num))*Math.sin(r_a);
                var ratio = 10;
                var distance_x = x+d_x+unit*ratio;
                var text_x = distance_x;
                var text_y = y+d_y-unit*0.5;

                var cT = [x, y - thick];
                var cB = [x, y];
                var startP = 1;
                var endP = 1;
                if(startAngle>=0 && startAngle < 90) {
                    startP = 4;
                } else if(startAngle>=90 && startAngle < 180) {
                    startP = 3;
                } else if(startAngle>=180 && startAngle < 270) {
                    startP = 2;
                } else {
                    startP = 1;
                }
                if(endAngle>=0 && endAngle < 90) {
                    endP = 4;
                } else if(endAngle>=90 && endAngle < 180) {
                    endP = 3;
                } else if(endAngle>=180 && endAngle < 270) {
                    endP = 2;
                } else {
                    endP = 1;
                }

                var sT = [x + swx, y + swy - thick];
                var sB = [x + swx, y + swy];
                var eT = [x + ewx, y + ewy - thick];
                var eB = [x + ewx, y + ewy];
                ctx.save();
                ctx.scale(1, yA);
                if(centerP==4){
                    distance_x = x+d_x+unit*ratio;
                    text_x = x+d_x;
                }else if(centerP==3){
                    distance_x = x+d_x-unit*ratio;
                    text_x = distance_x;
                }else if(centerP==2){
                    distance_x = x+d_x-unit*ratio;
                    text_x = distance_x;
                }else{
                    distance_x = x+d_x+unit*ratio;
                    text_x = x+d_x;
                }
                ctx.strokeStyle = fillStyle;
                ctx.beginPath();
                ctx.moveTo(x+arc_x,y+arc_y - thick/2);
                ctx.lineTo(x+d_x,y+d_y - thick/2);
                ctx.lineTo(distance_x,y+d_y - thick/2);
                ctx.stroke();
                ctx.strokeStyle = "#FFFFFF";
                if(startP == 4) {
                    if(endP == 4) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 3) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 2) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        eT = [x - radius, y - thick];
                        eB = [x - radius, y];
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, Math.PI);
                    } else {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        eT = [x - radius, y - thick];
                        eB = [x - radius, y];
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, Math.PI);
                    }
                } else if(startP == 3) {
                    if(endP == 4) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 3) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 2) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        eT = [x - radius, y - thick];
                        eB = [x - radius, y];
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, Math.PI);
                    } else {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        eT = [x - radius, y - thick];
                        eB = [x - radius, y];
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, Math.PI);
                    }
                } else if(startP == 2) {
                    if(endP == 4) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 3) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 2) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                    } else {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                    }
                } else {
                    if(endP == 4) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 3) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                    } else if(endP == 2) {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                        eT = [x - radius, y - thick];
                        eB = [x - radius, y];
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, Math.PI);
                    } else {
                        draw2DFan(ctx,x, y, radius, start, end); //bottom
                        draw2DRect(ctx,cT, cB, sB, sT); //start
                        drawCurvedSurface(ctx,cB, cT, sB, sT, eB, eT, radius, start, end);
                        draw2DRect(ctx,cT, cB, eB, eT); //end
                        draw2DFan(ctx,x, y - thick, radius, start, end); //top
                    }
                }
                var text_str = content+'球'+((endAngle-startAngle)*100/360).toFixed(1)+'%';
                ctx.font = "18px 宋体";
                ctx.fillText(text_str, text_x, text_y-thick/2, 100);
                ctx.restore();

            }
            /**
             * 立体坐标转化成平面坐标
             * @param {Object} x
             * @param {Object} y
             * @param {Object} z
             */
            function X_Y_Z_to_X_Y(x, y, z) {
                var toX = x - z * (Math.sqrt(2) / 2);
                var toY = y + z * (Math.sqrt(2) / 2);
                return {
                    x: toX,
                    y: toY
                };
            }
            function draw2DFan(ctx,x, y, radius, sA, eA) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.arc(x, y, radius, sA, eA, false);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
            function draw2DRect(ctx,p1, p2, p3, p4) {
                ctx.beginPath();
                ctx.moveTo(p1[0], p1[1]);
                ctx.lineTo(p2[0], p2[1])
                ctx.lineTo(p3[0], p3[1])
                ctx.lineTo(p4[0], p4[1])
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
            function drawCurvedSurface(ctx,cb, ct, psb, pst, peb, pet, r, start, end) {
                ctx.beginPath();
                ctx.moveTo(pst[0], pst[1]);
                ctx.arc(ct[0], ct[1], r, start, end, false);
                ctx.lineTo(peb[0], peb[1]);
                ctx.arc(cb[0], cb[1], r, end, start, true);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
            function arrSort(arr) {
                arr.sort(function(a, b) {
                    return a[0] - b[0];
                });
            }

            Model.fn = Model.prototype;

            function pxstr_parse_int(str) {
                var metion = str.replace("px", "");
                return parseInt(metion);
            }
            var models = new Model();
            module.exports = models;
        }
    ]);
});