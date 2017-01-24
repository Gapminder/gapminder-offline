call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\partial'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win32'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win32.zip'}"
call npm run build-win
call npm run package-win32
cd .\release
call sign32.bat
call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Gapminder Offline-win32-ia32' 'Gapminder Offline-win32'}"
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
mkdir "partial\Gapminder Offline-win32"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win32\resources' -destination 'partial\Gapminder Offline-win32\resources' -recurse}"
del /s /q ".\partial\Gapminder Offline-win32\resources\app\ddf--gapminder--systema_globalis"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
cd ..\..
