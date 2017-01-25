cd cache
mv ddf--gapminder--systema_globalis* ddf--gapminder--systema_globalis
robocopy ddf--gapminder--systema_globalis ..\resources\app\ddf--gapminder--systema_globalis
cd ..
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
