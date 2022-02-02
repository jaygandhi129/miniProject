@echo off
set /p COMMIT="Enter Commit Message: "
echo Your name is: %COMMIT%
git add .
echo Commiting changes...
git commit -m "%COMMIT%"

PAUSE