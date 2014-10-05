#!/bin/bash

echo "make the dirs"

sudo mkdir /var/lib/tomcat7/webapps/ROOT/WEB-INF
sudo mkdir /var/lib/tomcat7/webapps/ROOT/WEB-INF/classes


echo "copy file"
sudo cp HelloWorld.class /var/lib/tomcat7/webapps/ROOT/WEB-INF/classes

echo "ls"
ls /var/lib/tomcat7/webapps/ROOT/WEB-INF/classes



cat /var/lib/tomcat7/webapps/ROOT/WEB-INF/web.xml



echo press enter

read input

