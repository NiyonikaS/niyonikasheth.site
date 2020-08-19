#!/usr/bin/env python
import cgi, cgitb
import os, sys
import sha, time, Cookie, shelve

userInput = sys.stdin.read()
display = ""
username = ""
try:
    cookies = Cookie.SimpleCookie(os.environ["HTTP_COOKIE"])
    display = cookies["username"].value
except KeyError:
    display = ""
# if no cookie set
if (display == ""):
    # check if user entered name
    if (len(userInput)>0):
        userInput = userInput.split("=")
        username = userInput[1]
        # make cookie
        cookie = Cookie.SimpleCookie()
        # sid = sha.new(repr(time.time())).hexdigest()
        cookie["username"]=username
        print cookie.output()
        # save username
        # session_dir = os.environ['DOCUMENT_ROOT'] + '/tmp/.session'
        # session = shelve.open('/var/www/niyonikasheth.site/public.html/session')
        # session['username'] = username
        # set display
        display = username
    # empty cookie and userInput
    else:
        display = "Did not set a username"
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

