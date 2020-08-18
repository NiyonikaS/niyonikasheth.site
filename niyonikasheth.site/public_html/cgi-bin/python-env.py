#!/usr/bin/env python
import cgi, cgitb
import os
print "Content-Type: text/html\r\n\r\n"
print
print "<html>"
print "<head>"
print "<title>Python Environment</title>"
print "</head>"
print "<body>"
print "<h1>Environment Variables</h1><ul>"
for param in os.environ.keys():
   print "<li><b>%20s</b>: %s</li><br>" % (param, os.environ[param])
print "</ul></body>"
print "</html>"

