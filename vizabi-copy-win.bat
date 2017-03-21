copy .\node_modules\vizabi-ddfcsv-reader\dist\vizabi-ddfcsv-reader.js .\src\app\export-template\libs

copy .\node_modules\vizabi\build\dist\vizabi.js .\src\app\libs
copy .\node_modules\vizabi\build\dist\vizabi.js .\src\app\export-template\libs
copy .\node_modules\vizabi\build\dist\vizabi.css .\src\app\libs
copy .\node_modules\vizabi\build\dist\vizabi.css .\src\app\export-template\libs

xcopy .\node_modules\vizabi\build\dist\assets\cursors\* .\src\app\assets\cursors/ /e
xcopy .\node_modules\vizabi\build\dist\assets\cursors\* .\src\app\export-template\assets\cursors/ /e

xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\preview-data\translation/ /e

xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\assets\translation/ /e
xcopy .\node_modules\vizabi\build\dist\assets\translation\* .\src\app\export-template\assets\translation/ /e

rem copy .\node_modules\vizabi-barrankchart\build\dist\barrankchart.css .\src\app\libs
rem copy .\node_modules\vizabi-barrankchart\build\dist\barrankchart.css .\src\app\export-template\libs
rem copy .\node_modules\vizabi-barrankchart\build\dist\barrankchart.js .\src\app\libs
rem copy .\node_modules\vizabi-barrankchart\build\dist\barrankchart.js .\src\app\export-template\libs

copy .\node_modules\vizabi-bubblechart\build\dist\bubblechart.css .\src\app\libs
copy .\node_modules\vizabi-bubblechart\build\dist\bubblechart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-bubblechart\build\dist\bubblechart.js .\src\app\libs
copy .\node_modules\vizabi-bubblechart\build\dist\bubblechart.js .\src\app\export-template\libs

copy .\node_modules\vizabi-bubblemap\build\dist\bubblemap.css .\src\app\libs
copy .\node_modules\vizabi-bubblemap\build\dist\bubblemap.css .\src\app\export-template\libs
copy .\node_modules\vizabi-bubblemap\build\dist\bubblemap.js .\src\app\libs
copy .\node_modules\vizabi-bubblemap\build\dist\bubblemap.js .\src\app\export-template\libs

copy .\node_modules\vizabi-mountainchart\build\dist\mountainchart.css .\src\app\libs
copy .\node_modules\vizabi-mountainchart\build\dist\mountainchart.css .\src\app\export-template\libs
copy .\node_modules\vizabi-mountainchart\build\dist\mountainchart.js .\src\app\libs
copy .\node_modules\vizabi-mountainchart\build\dist\mountainchart.js .\src\app\export-template\libs

rem copy .\node_modules\vizabi-linechart\build\dist\linechart.css .\src\app\libs
rem copy .\node_modules\vizabi-linechart\build\dist\linechart.css .\src\app\export-template\libs
rem copy .\node_modules\vizabi-linechart\build\dist\linechart.js .\src\app\libs
rem copy .\node_modules\vizabi-linechart\build\dist\linechart.js .\src\app\export-template\libs
