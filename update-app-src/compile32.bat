gcc.exe update-app.cpp -o update-app-win32.exe
gcc.exe update-dataset.cpp -o update-dataset-win32.exe
"C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p main ".\update-dataset-win32.exe"
"C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p main ".\update-app-win32.exe"
