;--------------------------------
;Include Modern UI

  !include "MUI2.nsh"

;--------------------------------
;General

  ;Name and file
  AutoCloseWindow true
  Name "Gapminder Tools Offline"
  OutFile ".\app-builds\Install Gapminder Offline.exe"

  RequestExecutionLevel admin

  ;Default installation folder
  InstallDir "$PROFILE\Gapminder Offline"

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING

  !define MUI_ICON "src\app-icon.ico"

;--------------------------------
;Pages

  ;;!insertmacro MUI_PAGE_LICENSE "${NSISDIR}\Docs\Modern UI\License.txt"
  !insertmacro MUI_PAGE_COMPONENTS
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES

  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES

;--------------------------------
;Languages

  !insertmacro MUI_LANGUAGE "English"

;--------------------------------
;Installer Sections

Section "Gapminder Tools Offline" SecMain

  SetOutPath "$INSTDIR"

  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-console-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-datetime-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-debug-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-errorhandling-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-file-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-file-l1-2-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-file-l2-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-handle-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-heap-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-interlocked-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-libraryloader-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-localization-l1-2-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-memory-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-namedpipe-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-processenvironment-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-processthreads-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-processthreads-l1-1-1.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-profile-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-rtlsupport-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-string-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-synch-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-synch-l1-2-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-sysinfo-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-timezone-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-core-util-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-conio-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-convert-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-environment-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-filesystem-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-heap-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-locale-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-math-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-multibyte-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-private-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-process-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-runtime-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-stdio-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-string-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-time-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\api-ms-win-crt-utility-l1-1-0.dll"
  file "app-builds\Gapminder Offline-${arch}\blink_image_resources_200_percent.pak"
  file "app-builds\Gapminder Offline-${arch}\content_resources_200_percent.pak"
  file "app-builds\Gapminder Offline-${arch}\content_shell.pak"
  file "app-builds\Gapminder Offline-${arch}\d3dcompiler_47.dll"
  file "app-builds\Gapminder Offline-${arch}\ffmpeg.dll"
  file "app-builds\Gapminder Offline-${arch}\Gapminder Offline.exe"
  file "app-builds\Gapminder Offline-${arch}\gapminder-updater-${arch}.exe"
  file "app-builds\Gapminder Offline-${arch}\invisible.vbs"
  file "app-builds\Gapminder Offline-${arch}\icudtl.dat"
  file "app-builds\Gapminder Offline-${arch}\libEGL.dll"
  file "app-builds\Gapminder Offline-${arch}\libGLESv2.dll"
  file "app-builds\Gapminder Offline-${arch}\LICENSE.electron.txt"
  file "app-builds\Gapminder Offline-${arch}\LICENSES.chromium.html"
  file "app-builds\Gapminder Offline-${arch}\msvcp140.dll"
  file "app-builds\Gapminder Offline-${arch}\natives_blob.bin"
  file "app-builds\Gapminder Offline-${arch}\node.dll"
  file "app-builds\Gapminder Offline-${arch}\pdf_viewer_resources.pak"
  file "app-builds\Gapminder Offline-${arch}\snapshot_blob.bin"
  file "app-builds\Gapminder Offline-${arch}\ucrtbase.dll"
  file "app-builds\Gapminder Offline-${arch}\ui_resources_200_percent.pak"
  file "app-builds\Gapminder Offline-${arch}\vcruntime140.dll"
  file "app-builds\Gapminder Offline-${arch}\views_resources_200_percent.pak"
  file /r "app-builds\Gapminder Offline-${arch}\resources"
  file /r "app-builds\Gapminder Offline-${arch}\locales"


  ;Store installation folder
  WriteRegStr HKCU "Software\Gapminder Offline" "" $INSTDIR

  ;Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ; ExecWait '"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p main "$INSTDIR\Uninstall.exe"'

  WriteRegStr HKCR ".gmstat" "" "Gapminder.gmstat"
  WriteRegStr HKCR "Gapminder.gmstat" "" "Gapminder Statistics File"
  WriteRegStr HKCR "Gapminder.gmstat\shell" "" "open"
  WriteRegStr HKCR "Gapminder.gmstat\shell\open\command" "" '"$INSTDIR\Gapminder Offline.exe" "%1"'
  WriteRegStr HKCR "Gapminder.gmstat\DefaultIcon" "" "$INSTDIR\resources\app-icon.ico"

  WriteRegStr HKCR "Applications\Gapminder Offline.exe" "" ""
  WriteRegStr HKCR "Applications\Gapminder Offline.exe" "FriendlyAppName" "Gapminder Offline"
  WriteRegStr HKCR "Applications\Gapminder Offline.exe\shell\open" "" $ContextMenuEntry_PlayWith
  WriteRegStr HKCR "Applications\Gapminder Offline.exe\shell\open\command" "" '"$INSTDIR\Gapminder Offline.exe" "%1"'

  CreateShortcut "$desktop\Gapminder Tools Offline.lnk" "$INSTDIR\Gapminder Offline.exe"
  CreateDirectory "$SMPROGRAMS\Gapminder Tools Offline"
  CreateShortcut "$SMPROGRAMS\Gapminder Tools Offline\Gapminder Tools Offline.lnk" "$INSTDIR\Gapminder Offline.exe"
  CreateShortcut "$SMPROGRAMS\Gapminder Tools Offline\Uninstall Gapminder Tools Offline.lnk" "$INSTDIR\Uninstall.exe"

  writeUninstaller "$INSTDIR\uninstall.exe"

  Exec "$INSTDIR\Gapminder Offline.exe"
SectionEnd

;--------------------------------
;Descriptions

  ;Language strings
  LangString DESC_SecMain ${LANG_ENGLISH} "This software allows you to show animated statistics from your own laptop. You can use it without internet access. Updates automatically when new data is available"

  ;Assign language strings to sections
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${SecMain} $(DESC_SecMain)
  !insertmacro MUI_FUNCTION_DESCRIPTION_END

;--------------------------------
;Uninstaller Section

Section "Uninstall"

  Delete "$INSTDIR\api-ms-win-core-console-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-datetime-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-debug-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-errorhandling-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-file-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-file-l1-2-0.dll"
  Delete "$INSTDIR\api-ms-win-core-file-l2-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-handle-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-heap-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-interlocked-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-libraryloader-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-localization-l1-2-0.dll"
  Delete "$INSTDIR\api-ms-win-core-memory-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-namedpipe-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-processenvironment-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-processthreads-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-processthreads-l1-1-1.dll"
  Delete "$INSTDIR\api-ms-win-core-profile-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-rtlsupport-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-string-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-synch-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-synch-l1-2-0.dll"
  Delete "$INSTDIR\api-ms-win-core-sysinfo-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-timezone-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-core-util-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-conio-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-convert-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-environment-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-filesystem-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-heap-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-locale-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-math-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-multibyte-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-private-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-process-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-runtime-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-stdio-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-string-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-time-l1-1-0.dll"
  Delete "$INSTDIR\api-ms-win-crt-utility-l1-1-0.dll"
  Delete "$INSTDIR\blink_image_resources_200_percent.pak"
  Delete "$INSTDIR\content_resources_200_percent.pak"
  Delete "$INSTDIR\content_shell.pak"
  Delete "$INSTDIR\d3dcompiler_47.dll"
  Delete "$INSTDIR\ffmpeg.dll"
  Delete "$INSTDIR\Gapminder Offline.exe"
  Delete "$INSTDIR\gapminder-updater-${arch}.exe"
  Delete "$INSTDIR\invisible.vbs"
  Delete "$INSTDIR\icudtl.dat"
  Delete "$INSTDIR\libEGL.dll"
  Delete "$INSTDIR\libGLESv2.dll"
  Delete "$INSTDIR\LICENSE.electron.txt"
  Delete "$INSTDIR\LICENSES.chromium.html"
  Delete "$INSTDIR\msvcp140.dll"
  Delete "$INSTDIR\natives_blob.bin"
  Delete "$INSTDIR\node.dll"
  Delete "$INSTDIR\pdf_viewer_resources.pak"
  Delete "$INSTDIR\snapshot_blob.bin"
  Delete "$INSTDIR\ucrtbase.dll"
  Delete "$INSTDIR\ui_resources_200_percent.pak"
  Delete "$INSTDIR\vcruntime140.dll"
  Delete "$INSTDIR\views_resources_200_percent.pak"

  RMDir /r "$INSTDIR\resources"
  RMDir /r "$INSTDIR\locales"

  Delete "$INSTDIR\Uninstall.exe"
  Delete "$desktop\Gapminder Tools Offline.lnk"
  Delete "$SMPROGRAMS\Gapminder Tools Offline\Gapminder Tools Offline.lnk"
  Delete "$SMPROGRAMS\Gapminder Tools Offline\Uninstall Gapminder Tools Offline.lnk"
  RMDir "$SMPROGRAMS\Gapminder Tools Offline"

  RMDir "$INSTDIR"

  DeleteRegKey HKCU "Software\Gapminder Offline"

  DeleteRegKey HKCR "Gapminder.gmstat\shell\Play\command"
  DeleteRegKey HKCR "Gapminder.gmstat\shell"
  DeleteRegKey HKCR "Gapminder.gmstat\DefaultIcon"
  DeleteRegKey HKCR "Gapminder.gmstat"

  DeleteRegKey HKCR "Applications\Gapminder Offline.exe"
  DeleteRegKey HKCR "Applications\Gapminder Offline.exe"
  DeleteRegKey HKCR "Applications\Gapminder Offline.exe\shell\open"
  DeleteRegKey HKCR "Applications\Gapminder Offline.exe\shell\open\command"

  Delete "$INSTDIR\updating"
  Delete "$INSTDIR\update-required"

SectionEnd

Function .onInit
  SectionSetFlags ${SecMain} 17
FunctionEnd
