#include<stdio.h>
#include<stdlib.h>
#include<windows.h>

int main() {
  Sleep(300);

  system("cd cache-app & robocopy . .. /XF updater-win64.exe updater-win32.exe /E & cd .. & rmdir /s /q cache-app & del .\\release-app.zip");

  system("cd cache-ds & powershell.exe -nologo -noprofile -command \"& {Get-ChildItem -Filter ddf--gapminder--systema_globalis* | Rename-Item -NewName ddf--gapminder--systema_globalis}\" & robocopy ddf--gapminder--systema_globalis ..\\resources\\ddf--gapminder--systema_globalis /E & cd .. & rmdir /s /q cache-ds");

  system("del .\\update-required");
  system("del .\\updating");
  system("start \"\" \".\\Gapminder Offline.exe\"");

  return 0;
}
