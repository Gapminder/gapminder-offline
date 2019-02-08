call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\app-builds'}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force '.\dist'}"
call npm run electron:windows

rem ############

call powershell.exe -nologo -noprofile -command "& {Copy-Item 'extra-data\*' -destination 'app-builds\win-unpacked\resources\' -recurse -Force -Verbose}"

mkdir .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-ddfcsv-reader\dist\vizabi-ddfcsv-reader.js .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-csv-reader\dist\vizabi-csv-reader.js .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-excel-reader\dist\vizabi-excel-reader.js .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi\build\vizabi.js .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi\build\vizabi.css .\app-builds\win-unpacked\resources\export-template\libs

xcopy .\node_modules\vizabi\build\assets\cursors\* .\app-builds\win-unpacked\resources\export-template\assets\cursors\ /E /Y
xcopy .\node_modules\vizabi\build\assets\translation\* .\app-builds\win-unpacked\resources\preview-data\translation\ /E /Y
xcopy .\node_modules\vizabi\build\assets\translation\* .\app-builds\win-unpacked\resources\export-template\assets\translation\ /E /Y

copy .\node_modules\vizabi-barrankchart\build\barrankchart.css .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-barrankchart\build\barrankchart.js .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-bubblechart\build\bubblechart.css .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-bubblechart\build\bubblechart.js .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-bubblemap\build\bubblemap.css .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-bubblemap\build\bubblemap.js .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-mountainchart\build\mountainchart.css .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-mountainchart\build\mountainchart.js .\app-builds\win-unpacked\resources\export-template\libs

copy .\node_modules\vizabi-linechart\build\linechart.css .\app-builds\win-unpacked\resources\export-template\libs
copy .\node_modules\vizabi-linechart\build\linechart.js .\app-builds\win-unpacked\resources\export-template\libs
copy .\src\app-icon.ico .\app-builds\win-unpacked\resources

copy .\updater-win64.exe .\app-builds\win-unpacked\gapminder-updater-win64.exe
copy .\invisible.vbs .\app-builds\win-unpacked\invisible.vbs

rem ############

cd .\app-builds

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'win-unpacked' 'Gapminder Offline-win64'}"

"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 ".\Gapminder Offline-win64\Gapminder Offline.exe"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 ".\Gapminder Offline-win64\gapminder-updater-win64.exe"

call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
mkdir "partial\Gapminder Offline-win64"
call powershell.exe -nologo -noprofile -command "& {Copy-Item 'Gapminder Offline-win64\resources' -destination 'partial\Gapminder Offline-win64\resources' -recurse}"
call powershell.exe -nologo -noprofile -command "& {Remove-Item -Recurse -Force 'partial\Gapminder Offline-win64\resources\ddf--gapminder--systema_globalis'}"
rem del /s /q ".\partial\Gapminder Offline-win64\resources\ddf--gapminder--systema_globalis"
cd partial
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('Gapminder Offline-win64', 'Gapminder Offline-win64.zip'); }"
cd ../..

makensis.exe /Darch=win64 gapminder-offline.nsi

cd .\app-builds

call powershell.exe -nologo -noprofile -command "& {Rename-Item 'Install Gapminder Offline.exe' 'Install Gapminder Offline-64.exe'}"

"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f ..\gapminder.pfx /p %1 "Install Gapminder Offline-64.exe"

cd ..

node ./hash-maker.js "app-builds/partial/Gapminder Offline-win64" app-builds/win64-partial-hash.json win64
node ./hash-maker.js "app-builds/Gapminder Offline-win64" app-builds/win64-hash.json win64
