#!/usr/bin/env python
import cgi, cgitb
import os
parse_query = cgi.parse()
print "Content-Type: text/html\r\n\r\n"
print
print "<html>"
print "<head>"
print "<title>Python Get Echo</title>"
print "</head>"
print "<body>"
print "<h1>GET Request Echo</h1>"
print "<p><b>Query:</b> %s</p> <ul>" % os.environ["QUERY_STRING"]
for key in parse_query:
   print "<li><b>%20s</b>: %s</li><br>" % (key, " ".join(parse_query[key]))
print "</ul></body>"
print "</html>"

