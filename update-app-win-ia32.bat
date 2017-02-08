cd cache
robocopy . .. /E
cd ..
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
