from django.db import models

# Create your models here.
class Chromosphere(models.Model):
    # id = models.IntegerField();
    issue = models.IntegerField();
    redone = models.IntegerField();
    redtwo = models.IntegerField();
    redthree = models.IntegerField();
    redfour = models.IntegerField();
    redfive = models.IntegerField();
    redsex = models.IntegerField();
    blueone = models.IntegerField();
    progressive_prize = models.CharField(max_length=10);
    first_prize_num = models.IntegerField();
    first_prize = models.CharField(max_length=10);
    second_prize_num = models.IntegerField();
    second_prize = models.CharField(max_length=10);
    sum_num = models.CharField(max_length=10);
    open_prize_date = models.CharField(max_length=60);
    reg_date = models.IntegerField();
    def __unicode__(self):
        return self.issue;