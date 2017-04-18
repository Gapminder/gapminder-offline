call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\partial'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win64'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win64.zip'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Install Gapminder Offline.exe'}"
call npm run build-win
call npm run package-win
cd .\release

"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\Gapminder Offline.exe"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\d3dcompiler_47.dll"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\ffmpeg.dll"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\libEGL.dll"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\libGLESv2.dll"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\node.dll"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-x64\xinput1_3.dll"

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Gapminder Offline-win32-x64' 'Gapminder Offline-win64'}"
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
mkdir "partial\Gapminder Offline-win64"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win64\resources' -destination 'partial\Gapminder Offline-win64\resources' -recurse}"
del /s /q ".\partial\Gapminder Offline-win64\resources\app\ddf--gapminder--systema_globalis"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
cd ..\..

makensis.exe /Darch=win64 gapminder-offline.nsi
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f .\release\gapminder.pfx /p %1 ".\release\Install Gapminder Offline.exe"
