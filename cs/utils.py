from cs.models import Chromosphere
from urllib import request
import re,time,xlwt,csv,os
from django.http import HttpResponse
import codecs
import requests
# here is utils.
class Utils():
    def cslist_to_json(self, cslist):
        res = "["
        for item in cslist:
            # it = "\"id\":"+item.id;
            it = "{\"issue\":"+str(item.issue);
            it = it+",\"redone\":"+str(item.redone);
            it = it+",\"redtwo\":"+str(item.redtwo);
            it = it+",\"redthree\":"+str(item.redthree);
            it = it+",\"redfour\":"+str(item.redfour);
            it = it+",\"redfive\":"+str(item.redfive);
            it = it+",\"redsex\":"+str(item.redsex);
            it = it+",\"blueone\":"+str(item.blueone);
            it = it+",\"progressive_prize\":\""+item.progressive_prize+"\"";
            it = it+",\"first_prize_num\":"+str(item.first_prize_num);
            it = it+",\"first_prize\":\""+item.first_prize+"\"";
            it = it+",\"second_prize_num\":"+str(item.second_prize_num);
            it = it+",\"second_prize\":\""+item.second_prize+"\"";
            it = it+",\"sum_num\":\""+item.sum_num+"\"";
            it = it+",\"open_prize_date\":\""+item.open_prize_date+"\"";
            it = it+",\"reg_date\":"+str(item.reg_date)+"},";
            res = res+it;
        return res[0:len(res)-1] + "]";
    def https_get(self, url):
        # req=request.Request(url)
        # req.add_header("user-agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36")
        # resp = request.urlopen(req);
        # return resp.read().decode("utf-8");
        # url = "https://datachart.500.com/ssq/history/newinc/history.php?start=03000&end=17210"
        res = requests.get(url)
        res.encoding = 'utf-8'
        return res.text
    def getArrayFromStr(self, content):
        reg=r'<tbody id="tdata">(.*?)</tbody>';
        resault = re.findall(reg,content,re.S|re.M|re.I);
        preg = r'<tr class="t_tr1">(.*?)</tr>';
        str=resault[0];
        res = re.findall(preg,str,re.S|re.M|re.I);
        arr_data = [];
        for r in res:
            arr_data.append(self.string_to_arr(r));
        return arr_data;
    def save_datas(self, arr):
        if(len(arr)>0):
            for index in range(len(arr)):
                index1 = len(arr)-index-1
                arr[index1].save();
            return True;
        else:
            return False;
    def string_to_arr(self, str):
        preg_i = r'<td.*?>(.*?)</td>';
        item_data = re.findall(preg_i,str,re.S|re.M|re.I);
        cs = Chromosphere();
        cs.issue = self.getValueFromHtml(item_data[1]);
        cs.redone = self.getValueFromHtml(item_data[2]);
        cs.redtwo = self.getValueFromHtml(item_data[3]);
        cs.redthree = self.getValueFromHtml(item_data[4]);
        cs.redfour = self.getValueFromHtml(item_data[5]);
        cs.redfive = self.getValueFromHtml(item_data[6]);
        cs.redsex = self.getValueFromHtml(item_data[7]);
        cs.blueone = self.getValueFromHtml(item_data[8]);
        cs.progressive_prize = self.getValueFromHtml(item_data[10],True);
        cs.first_prize_num = self.getValueFromHtml(item_data[11]);
        cs.first_prize = self.getValueFromHtml(item_data[12],True);
        cs.second_prize_num = self.getValueFromHtml(item_data[13]);
        cs.second_prize = self.getValueFromHtml(item_data[14],True);
        cs.sum_num = self.getValueFromHtml(item_data[15],True);
        cs.open_prize_date = self.getValueFromHtml(item_data[16],True);
        cs.reg_date = time.time();
        return cs;
    def getValueFromHtml(self, html,isString = False):
        td_str = html.replace(r"<td.*?>", "");
        td_str = td_str.replace(r"</td>", "");
        if (isString):
            return td_str;
        else:
            td_str = td_str.replace(",", "");
            return int(td_str);
    def saveExcel(self, list):
        # 返回文件给客户
        response = HttpResponse(content_type='text/xls')
        response['Content-Disposition'] = 'attachment; filename=cs.xls';
        workbook = xlwt.Workbook(encoding='utf-8');
        sheet = workbook.add_sheet('table_cs', cell_overwrite_ok=True);
        titles = [u'序号', u'期号', u'红球1', u'红球2', u'红球3', u'红球4', u'红球5', u'红球6', u'蓝球', u'奖池奖金(元)', u'一等奖注数', u'一等奖奖金(元)', u'二等奖注数',u'二等奖奖金(元)', u'总投注额(元)', u'开奖日期',u'时间戳'];
        # 写上字段信息
        for title in range(0, len(titles)):
            sheet.write(0, title, titles[title])
        for item in range(0, len(list)):
            sheet.write(item+1, 0, list[item].id);
            sheet.write(item+1, 1, list[item].issue);
            sheet.write(item+1, 2, list[item].redone);
            sheet.write(item+1, 3, list[item].redtwo);
            sheet.write(item+1, 4, list[item].redthree);
            sheet.write(item+1, 5, list[item].redfour);
            sheet.write(item+1, 6, list[item].redfive);
            sheet.write(item+1, 7, list[item].redsex);
            sheet.write(item+1, 8, list[item].blueone);
            sheet.write(item+1, 9, list[item].progressive_prize);
            sheet.write(item+1, 10, list[item].first_prize_num);
            sheet.write(item+1, 11, list[item].first_prize);
            sheet.write(item+1, 12, list[item].second_prize_num);
            sheet.write(item+1, 13, list[item].second_prize);
            sheet.write(item+1, 14, list[item].sum_num);
            sheet.write(item+1, 15, list[item].open_prize_date);
            sheet.write(item+1, 16, list[item].reg_date);
        workbook.save(response);
        return response;
    def saveCSV(self, list):
        titles = [u'序号', u'期号', u'红球1', u'红球2', u'红球3', u'红球4', u'红球5', u'红球6', u'蓝球', u'奖池奖金(元)', u'一等奖注数',u'一等奖奖金(元)', u'二等奖注数', u'二等奖奖金(元)', u'总投注额(元)', u'开奖日期', u'时间戳'];
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="cs.csv"'
        response.write(codecs.BOM_UTF8)
        writer = csv.writer(response)
        writer.writerow(titles)
        for item in list:
            writer.writerow([item.id,item.issue,item.redone,item.redtwo,item.redthree,item.redfour,item.redfive,item.redsex,item.blueone,item.progressive_prize,item.first_prize_num,item.first_prize,item.second_prize_num,item.second_prize,item.sum_num,item.open_prize_date,item.reg_date])
        return response
utils = Utils();
