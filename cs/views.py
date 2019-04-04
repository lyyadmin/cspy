from django.shortcuts import render
from django.http import HttpResponse
from cs.models import Chromosphere
from django.core.cache import cache
from django.core import serializers
from cs.utils import utils

# Create your views here.
def hello(request):
    return HttpResponse("<small><h1>Hello World !</h1>你好，世界！</small>")
def index(request):
    msg = "传过来的数据。"
    return render(request, "index/index.html", {'msg': msg});
def history(request):
    type = request.GET.get('type', 'line');
    select = request.GET.get('select', 'red');
    title = "双色球图表";
    if ("pie3d" == type):
        title = "双色球概率统计饼图";
        if ("red" == select):
            title = "红球概率统计饼图";
        elif ("blue" == select):
            title = "蓝球概率统计饼图";
    return render(request, "index/history.html", {'type': type,'select':select,'title':title});
def getdatas(request):
    start = request.GET.get('start', 3000);
    end = request.GET.get('end', 17110);
    qihao = request.GET.get('qihao','null');
    page = int(request.GET.get('page',-1));
    page_size = 12;
    if (page == 0):
        operation = request.GET.get('operation','null');
        if (operation == 'index'):
            page = 1;
        elif (operation == 'pre'):
            page = cache.get("page",0)-1;
            print("page:"+str(page))
            if (page < 1):
                page = 1;
        elif (operation == 'next'):
            page = cache.get("page",0)+1;
            count = Chromosphere.objects.count();
            if (page > count):
                  page = count;
        elif (operation == 'end'):
            page = Chromosphere.objects.count() / page_size;
        cache.set("page",page,60*15);
        res = Chromosphere.objects.all().order_by("-issue")[(page-1)*page_size:page*page_size];
        cache.set("resault",res,60*15);
        count = len(res);
        return render(request,"index/querytable.html",{"data":res,"count":count});
    else:
        json = True;
        if (qihao != 'null'):
            if (qihao.index("-")>-1):
                arr = qihao.split("-");
                start = arr[0];
                end = arr[1];
            else:
                start = qihao;
                end = qihao;
            json = False;
        start = int(start);
        end = int(end);
        if (json):
            res = serializers.serialize("json", Chromosphere.objects.filter(issue__range=(start,end)));
            return HttpResponse(res);
        else:
            res = Chromosphere.objects.filter(issue__range=(start,end));
            cache.set("resault",res,60*15);
            count = len(res);
            return render(request, "index/querytable.html", {"data": res, "count": count});
def getCache(request):
    try:
        cache_data = cache.get("resault","default");
        res = utils.cslist_to_json(cache_data);
        return HttpResponse(res);
    except Exception:
        return HttpResponse("<h1>没有查到你想要的数据！</h1>");
def collectdatas(request):
    start = request.GET.get('start', '17111');
    end = request.GET.get('end', '17200');
    url = "https://datachart.500.com/ssq/history/newinc/history.php?start="+start+"&end="+end;
    content = utils.https_get(url);
    arr_data = utils.getArrayFromStr(content);
    if(len(arr_data)<=0):
        return HttpResponse("没有采集到数据！");
    else:
        utils.save_datas(arr_data);
        return HttpResponse("数据保存成功！");
def save(request):
    type = request.GET.get('type', 'excel');
    res = "保存失败！";
    if(type=="excel"):
        return utils.saveExcel(cache.get("resault", "default"));
    elif(type=="csv"):
        return utils.saveCSV(cache.get("resault", "default"));
def setValue(request):
    res = Chromosphere.objects.filter(issue__range=(17100, 17200));
    cache.set("res",res,60);
    return HttpResponse(res)
def getValue(request):
    return HttpResponse(cache.get("res","default"))
def test(request):
    # mo = Chromosphere.objects.filter(issue__lt=(3010))
    # mo = Chromosphere.objects.filter(issue__gt=(17110))
    # mo = Chromosphere.objects.filter(issue__exact=(17118))
    mo = Chromosphere.objects.filter(issue__in=(17118,17116,17114))
    return HttpResponse(serializers.serialize("json",mo))
def admin(request):
    return render(request,"admin/login.html")
def admin_html(request):
    path = request.path[1:]
    if(path.endswith('.jpg')):
        return HttpResponse(path, content_type="image/jpg")
    elif(path.endswith('.png')):
        return HttpResponse(path, content_type="image/png")
    elif(path.endswith('.gif')):
        return HttpResponse(path, content_type="image/gif")
    elif(path.endswith('.html') | path.endswith('.css') | path.endswith('.js')):
        return render(request,path)
    else:
        pass