#include<stdio.h>
#include<stdlib.h>

int main() {
  system("cd cache & robocopy . .. /XF update-app-win64.exe update-dataset-win64.exe /E & cd .. & rmdir /s /q cache & del .\\release.zip & del .\\update-required & start \"\" \".\\Gapminder Offline.exe\"");

  return 0;
}
