xcopy /y /s /e "cache\ddf--gapminder--systema_globalis-*\*" ".\resources\app\ddf--gapminder--systema_globalis"
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
