from django.test import TestCase
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
# Create your tests here.

if __name__ == '__main__':
    url = "https://datachart.500.com/ssq/history/newinc/history.php?start=18001&end=19037"
    res = requests.get(url)
    res.encoding = 'utf-8'
    print(res.text)


