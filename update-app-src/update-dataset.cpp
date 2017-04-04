#include<stdio.h>
#include<stdlib.h>
#include<windows.h>

int main() {
  Sleep(3000);
  system("cd cache & powershell.exe -nologo -noprofile -command \"& {Get-ChildItem -Filter ddf--gapminder--systema_globalis* | Rename-Item -NewName ddf--gapminder--systema_globalis}\" & robocopy ddf--gapminder--systema_globalis ..\\resources\\app\\ddf--gapminder--systema_globalis /E & cd .. & rmdir /s /q cache & del .\\update-required & start \"\" \".\\Gapminder Offline.exe\"");

  return 0;
}
