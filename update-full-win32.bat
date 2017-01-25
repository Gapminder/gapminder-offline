xcopy /y /s /e "cache\Gapminder Offline-win32-x64" .
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
