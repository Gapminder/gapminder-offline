cd cache
robocopy "Gapminder Offline-win32-ia32" .. /E
cd ..
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
