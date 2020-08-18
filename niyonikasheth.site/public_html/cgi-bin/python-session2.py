#!/usr/bin/env python
import cgi, cgitb
import os, sys
import Cookie
cookies = Cookie.SimpleCookie(os.environ["HTTP_COOKIE"])
username = cookies["username"].value
if (username == ""):
    username = "Did not set a username"
print "Content-Type: text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Python Session 2</title>"
print "</head>"
print "<body>"
print "<h1>Python Session 2</h1>"
print "<p><b>Name:</b> %s</p>" % username
print "<p><a href='../python-start-demo.html'>CGI Form</a></p>"
print "<p><a href='python-session1.py'>Session Page 1</a></p>"
print "<form action='python-destroy-session.py' method='GET'>"
print "<input type='submit' value='Destroy Session'/>"
print "</form>"
print "</body>"
print "</html>"

