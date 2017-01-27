cd cache
robocopy "Gapminder Offline-win32-x64" .. /E
cd ..
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
