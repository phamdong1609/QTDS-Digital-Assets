@echo off
echo === FINDING ALL || OPERATORS ===
echo.
findstr /S /N /C:"||" library\*.html
echo.
echo === FINDING ALL {{{ TRIPLE BRACES ===
echo.
findstr /S /N /C:"{{{" library\*.html
echo.
pause