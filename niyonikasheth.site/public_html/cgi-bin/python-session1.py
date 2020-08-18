#!/usr/bin/env python
import cgi, cgitb
import os, sys
import Cookie
userInput = sys.stdin.read()
display = ""
username = ""
if (len(userInput)>0):
    userInput = userInput.split("=")
    username = userInput[1]
    display = username
if (username == ""):
    cookies = Cookie.SimpleCookie(os.environ["HTTP_COOKIE"])
    username = cookies["username"].value
    display = username
    if (username == ""):
        display = "Did not set a username"
cookie = Cookie.SimpleCookie()
cookie["username"]=username
print cookie.output()
print "Content-Type: text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Python Session 1</title>"
print "</head>"
print "<body>"
print "<h1>Python Session 1</h1>"
print "<p><b>Name:</b> %s</p>" % display
print "<p><a href='../python-start-demo.html'>CGI Form</a></p>"
print "<p><a href='python-session2.py'>Session Page 2</a></p>"
print "<form action='python-destroy-session.py' method='GET'>"
print "<input type='submit' value='Destroy Session'/>"
print "</form>"
print "</body>"
print "</html>"

