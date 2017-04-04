#include<stdio.h>
#include<stdlib.h>
#include<windows.h>

int main() {
  Sleep(3000);
  system("cd cache & robocopy . .. /XF update-app-win64.exe update-dataset-*.exe /E & cd .. & rmdir /s /q cache & del .\\release.zip & del .\\update-required & start \"\" \".\\Gapminder Offline.exe\"");

  return 0;
}
