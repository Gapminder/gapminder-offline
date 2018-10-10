#include <sys/types.h>
#include <sys/stat.h>
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int dirExists(const char *path){
  struct stat info;

  if (stat(path, &info ) != 0) {
    return 0;
  } else if (info.st_mode & S_IFDIR) {
    return 1;
  } else {
    return 0;
  }
}

int main() {
  Sleep(300);

  const char *appPath = "cache-app";
  const char *dsPath = "cache-ds";

  if (dirExists(appPath)) {
    system("cd cache-app & robocopy . .. /XF gapminder-updater-win64.exe gapminder-updater-win32.exe /E & cd .. & rmdir /s /q cache-app & del .\\release-app.zip");
  }

  if (dirExists(dsPath)) {
    system("cd cache-ds & powershell.exe -nologo -noprofile -command \"& {Get-ChildItem -Filter ddf--gapminder--systema_globalis* | Rename-Item -NewName ddf--gapminder--systema_globalis}\" & robocopy ddf--gapminder--systema_globalis ..\\resources\\ddf--gapminder--systema_globalis /E & cd .. & rmdir /s /q cache-ds");
  }

  system("start \"\" \".\\Gapminder Offline.exe\"");

  return 0;
}
