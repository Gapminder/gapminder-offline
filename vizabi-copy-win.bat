copy .\node_modules\vizabi-ddfcsv-reader\dist\vizabi-ddfcsv-reader.js .\src\app\export-template\libs

copy .\node_modules\vizabi\build\dist\vizabi.js .\src\app\libs
copy .\node_modules\vizabi\build\dist\vizabi.js .\src\app\export-template\libs
copy .\node_modules\vizabi\build\dist\vizabi.css .\src\app\libs
copy .\node_modules\vizabi\build\dist\vizabi.css .\src\app\export-template\libs

xcopy .\node_modules\vizabi\build\dist\assets\cursors\* .\src\app\assets\cursors\ /E /Y
xcopy .\node_modules\vizabi\build\dist\assets\cursors\* .\src\app\export-template\assets\cursors\ /E /Y

xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\preview-data\translation\ /E /Y
``
xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\assets\translation\ /E /Y
xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\export-template\assets\translation\ /E /Y

copy .\node_modules\vizabi-barrankchart\build\barrankchart.css .\src\app\libs
copy .\node_modules\vizabi-barrankchart\build\barrankchart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-barrankchart\build\barrankchart.js .\src\app\libs
copy .\node_modules\vizabi-barrankchart\build\barrankchart.js .\src\app\export-template\libs

copy .\node_modules\vizabi-bubblechart\build\bubblechart.css .\src\app\libs
copy .\node_modules\vizabi-bubblechart\build\bubblechart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-bubblechart\build\bubblechart.js .\src\app\libs
copy .\node_modules\vizabi-bubblechart\build\bubblechart.js .\src\app\export-template\libs

copy .\node_modules\vizabi-bubblemap\build\bubblemap.css .\src\app\libs
copy .\node_modules\vizabi-bubblemap\build\bubblemap.css .\src\app\export-template\libs
copy .\node_modules\vizabi-bubblemap\build\bubblemap.js .\src\app\libs
copy .\node_modules\vizabi-bubblemap\build\bubblemap.js .\src\app\export-template\libs

copy .\node_modules\vizabi-mountainchart\build\mountainchart.css .\src\app\libs
copy .\node_modules\vizabi-mountainchart\build\mountainchart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-mountainchart\build\mountainchart.js .\src\app\libs
copy .\node_modules\vizabi-mountainchart\build\mountainchart.js .\src\app\export-template\libs

copy .\node_modules\vizabi-linechart\build\linechart.css .\src\app\libs
copy .\node_modules\vizabi-linechart\build\linechart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-linechart\build\linechart.js .\src\app\libs
copy .\node_modules\vizabi-linechart\build\linechart.js .\src\app\export-template\libs
