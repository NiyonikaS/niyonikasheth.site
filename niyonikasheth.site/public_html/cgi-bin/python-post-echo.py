#!/usr/bin/env python
import cgi, cgitb
import os
import sys
body = sys.stdin.read().split("&")
print "Content-Type: text/html\r\n\r\n"
print
print "<html>"
print "<head>"
print "<title>Python POST Echo</title>"
print "</head>"
print "<body>"
print "<h1>POST Request Echo</h1><ul>"
for s in body:
   pair = s.split("=")
   print "<li><b>%s</b>: %s</li><br>" % (pair[0], pair[1])
print "</ul></body>"
print "</html>"

