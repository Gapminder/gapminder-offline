call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\partial'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win32'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win32.zip'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Install Gapminder Offline.exe'}"
call npm run build-win
call npm run package-win32
cd .\release

signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\Gapminder Offline.exe"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\d3dcompiler_47.dll"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\ffmpeg.dll"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\libEGL.dll"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\libGLESv2.dll"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\node.dll"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p %1 ".\Gapminder Offline-win32-ia32\xinput1_3.dll"

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Gapminder Offline-win32-ia32' 'Gapminder Offline-win32'}"
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
mkdir "partial\Gapminder Offline-win32"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win32\resources' -destination 'partial\Gapminder Offline-win32\resources' -recurse}"
del /s /q ".\partial\Gapminder Offline-win32\resources\app\ddf--gapminder--systema_globalis"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
cd ..\..

makensis.exe /Darch=win32 gapminder-offline.nsi
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f .\release\gapminder.pfx /p %1 ".\release\Install Gapminder Offline.exe"
