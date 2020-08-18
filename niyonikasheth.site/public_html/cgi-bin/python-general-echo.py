#!/usr/bin/env python
import cgi, cgitb
import os
import sys
method = os.environ["REQUEST_METHOD"]
protocol = os.environ["SERVER_PROTOCOL"]
query = os.environ["QUERY_STRING"].split("&")
body = sys.stdin.read().split("&")
print "Content-Type: text/html\r\n\r\n"
print
print "<html>"
print "<head>"
print "<title>Python General Echo</title>"
print "</head>"
print "<body>"
print "<h1>General Request Echo</h1>"
print "<p><b>Request Method:</b> %s</p>" % method
print "<p><b>Protocol:</b> %s</p> " % protocol
print "<p><b>Query:</b> </p> <ul>" 
for s in query:
   pair = s.split("=")
   print "<li><b>%s</b>: %s</li><br>" % (pair[0], pair[1])
print "</ul>"
print "<p><b>Message Body:</b> </p> <ul>" 
for s in body:
   pair = s.split("=")
   print "<li><b>%s</b>: %s</li><br>" % (pair[0], pair[1])
print "</ul>"
print "</body>"
print "</html>"

