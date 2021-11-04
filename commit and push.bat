@echo off

set /p name=Enter commit name: 

git add .
git commit -m "%name%"
git push -u origin main

pause