gcc.exe update-app.cpp -o update-app-win64.exe
gcc.exe update-dataset.cpp -o update-dataset-win64.exe
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f ---.pfx /p main ".\update-dataset-win64.exe"
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f ---.pfx /p main ".\update-app-win64.exe"
