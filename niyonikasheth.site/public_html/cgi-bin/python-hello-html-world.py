#!/usr/bin/env python
import cgi, cgitb
from datetime import date
import time
import os
cgitb.enable()
day = date.today() 
t = time.localtime()
curr_time = time.strftime("%H:%M:%S", t)
ip = os.environ['REMOTE_ADDR']
print "Content-Type: text/html\r\n\r\n"
print
print "<html>"
print "<head>"
print "<title>Hello Python World!</title>"
print "</head>"
print "<body>"
print "<h1>Hello Python!</h1>"
print "<p>This page was created using Python.</p>"
print "<p>Time Generated: %s %s</p>" % (day, curr_time)
print "<p>Your IP Address: %s </p>" % (ip)
print "</body>"
print "</html>"

