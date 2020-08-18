#!/usr/bin/env python
import cgi, cgitb
import os, sys
print "Set-Cookie:username = ;"
print "Content-Type: text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Session Destroyed</title>"
print "</head>"
print "<body>"
print "<h1>Session Destroyed</h1>"
print "<p><a href='../python-start-demo.html'>CGI Form</a></p>"
print "<p><a href='python-session1.py'>Session Page 1</a></p>"
print "<form action='python-destroy-session.py' method='GET'>"
print "<input type='submit' value='Destroy Session'/>"
print "</form>"
print "</body>"
print "</html>"

