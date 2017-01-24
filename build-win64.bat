call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\partial'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win64'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\release\Gapminder Offline-win64.zip'}"
call npm run build-win
call npm run package-win
cd .\release
call sign64.bat
call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Gapminder Offline-win32-x64' 'Gapminder Offline-win64'}"
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
mkdir "partial\Gapminder Offline-win64"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win64\resources' -destination 'partial\Gapminder Offline-win64\resources' -recurse}"
del /s /q ".\partial\Gapminder Offline-win64\resources\app\ddf--gapminder--systema_globalis"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
cd ..\..
