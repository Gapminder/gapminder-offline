ren cache\ddf--gapminder--systema_globalis-* cache\ddf--gapminder--systema_globalis
robocopy "cache\ddf--gapminder--systema_globalis-*" ".\resources\app\ddf--gapminder--systema_globalis" /E
rmdir /s /q cache
del .\update-required
start "" ".\Gapminder Offline.exe"
exit
