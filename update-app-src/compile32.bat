gcc.exe updater.cpp -o updater-win32.exe
rem "C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p [PWD] ".\updater-win32.exe"
