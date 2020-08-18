#!/usr/bin/env python
import cgi, cgitb
from datetime import date
import time
import os
import json
cgitb.enable()
day = date.today() 
curr_day = day.strftime("%B %d, %Y")
t = time.localtime()
curr_time = time.strftime("%H:%M:%S", t)
ip = os.environ['REMOTE_ADDR']
info = {"Message":"Hello World from Python!", "Today's Date":curr_day,  "Time Generated":curr_time, "Your IP Address":ip}
print "Content-Type: application/json\r\n\r\n"
print json.dumps(info)

