gcc.exe updater.cpp -o updater-win64.exe
rem "C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p [PWD] ".\updater-win64.exe"
