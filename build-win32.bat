call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\app-builds'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\dist'}"
call npm run electron:windows32

rem ############

call powershell.exe -nologo -noprofile -command "& {Copy-Item 'extra-data\*' -destination 'app-builds\win-ia32-unpacked\resources\' -recurse -Force -Verbose}"

mkdir .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-ddfcsv-reader\dist\vizabi-ddfcsv-reader.js .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-csv-reader\dist\vizabi-csv-reader.js .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-excel-reader\dist\vizabi-excel-reader.js .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi\build\vizabi.js .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi\build\vizabi.css .\app-builds\win-ia32-unpacked\resources\export-template\libs

xcopy .\node_modules\vizabi\build\assets\cursors\* .\app-builds\win-ia32-unpacked\resources\export-template\assets\cursors\ /E /Y
xcopy .\node_modules\vizabi\build\assets\translation\* .\app-builds\win-ia32-unpacked\resources\preview-data\translation\ /E /Y
xcopy .\node_modules\vizabi\build\assets\translation\* .\app-builds\win-ia32-unpacked\resources\export-template\assets\translation\ /E /Y

copy .\node_modules\vizabi-barrankchart\build\barrankchart.css .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-barrankchart\build\barrankchart.js .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-bubblechart\build\bubblechart.css .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-bubblechart\build\bubblechart.js .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-bubblemap\build\bubblemap.css .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-bubblemap\build\bubblemap.js .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-mountainchart\build\mountainchart.css .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-mountainchart\build\mountainchart.js .\app-builds\win-ia32-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-linechart\build\linechart.css .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-linechart\build\linechart.js .\app-builds\win-ia32-unpacked\resources\export-template\libs
copy .\src\app-icon.ico .\app-builds\win-ia32-unpacked\resources

copy .\updater-win32.exe .\app-builds\win-ia32-unpacked\gapminder-updater-win32.exe
copy .\invisible.vbs .\app-builds\win-ia32-unpacked\invisible.vbs

rem ############

cd .\app-builds

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'win-ia32-unpacked' 'Gapminder Offline-win32'}"

signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 ".\Gapminder Offline-win32\Gapminder Offline.exe"
signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 ".\Gapminder Offline-win32\gapminder-updater-win32.exe"

call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
mkdir "partial\Gapminder Offline-win32"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win32\resources' -destination 'partial\Gapminder Offline-win32\resources' -recurse}"
rem del /s /q ".\partial\Gapminder Offline-win32\resources\ddf--gapminder--systema_globalis"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force 'partial\Gapminder Offline-win32\resources\ddf--gapminder--systema_globalis'}"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win32', 'Gapminder Offline-win32.zip'); }"
cd ../..

makensis.exe /Darch=win32 gapminder-offline.nsi

cd .\app-builds

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Install Gapminder Offline.exe' 'Install Gapminder Offline-32.exe'}"

signtool.exe sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 "Install Gapminder Offline-32.exe"

cd ..

node ./hash-maker.js "app-builds/partial/Gapminder Offline-win32" app-builds/win32-partial-hash.json win32
node ./hash-maker.js "app-builds/Gapminder Offline-win32" app-builds/win32-hash.json win32
