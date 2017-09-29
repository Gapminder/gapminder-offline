;--------------------------------
;Include Modern UI

  !include "MUI2.nsh"
  !include "FileAssociation.nsh"
  ;!include "FileFunc.nsh"

;--------------------------------
;General

  ;Name and file
  AutoCloseWindow true
  Name "Gapminder Tools Offline"
  OutFile ".\release\Install Gapminder Offline.exe"

  RequestExecutionLevel user

  ;Default installation folder
  InstallDir "$PROFILE\Gapminder Offline"
  
;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING

  !define MUI_ICON "src\app\app-icon.ico"

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
  
  file "release\Gapminder Offline-${arch}\blink_image_resources_200_percent.pak"
  file "release\Gapminder Offline-${arch}\content_resources_200_percent.pak"
  file "release\Gapminder Offline-${arch}\content_shell.pak"
  file "release\Gapminder Offline-${arch}\d3dcompiler_47.dll"
  file "release\Gapminder Offline-${arch}\ffmpeg.dll"
  file "release\Gapminder Offline-${arch}\Gapminder Offline.exe"
  file "release\Gapminder Offline-${arch}\icudtl.dat"
  file "release\Gapminder Offline-${arch}\invisible.vbs"
  file "release\Gapminder Offline-${arch}\libEGL.dll"
  file "release\Gapminder Offline-${arch}\libGLESv2.dll"
  file "release\Gapminder Offline-${arch}\LICENSE"
  file "release\Gapminder Offline-${arch}\LICENSES.chromium.html"
  file "release\Gapminder Offline-${arch}\natives_blob.bin"
  file "release\Gapminder Offline-${arch}\node.dll"
  file "release\Gapminder Offline-${arch}\snapshot_blob.bin"
  file "release\Gapminder Offline-${arch}\ui_resources_200_percent.pak"
  file "release\Gapminder Offline-${arch}\update-app-${arch}.exe"
  file "release\Gapminder Offline-${arch}\update-dataset-${arch}.exe"
  file "release\Gapminder Offline-${arch}\version"
  file "release\Gapminder Offline-${arch}\views_resources_200_percent.pak"
  file /r "release\Gapminder Offline-${arch}\resources"
  file /r "release\Gapminder Offline-${arch}\locales"

  
  ;Store installation folder
  ;WriteRegStr HKCU "Software\Gapminder Offline" "" $INSTDIR
  
  ;Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ; ExecWait '"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /t http://timestamp.comodoca.com/authenticode /f gapminder.pfx /p main "$INSTDIR\Uninstall.exe"'

  ${registerExtension} "$INSTDIR\Gapminder Offline.exe" ".gmstat" "GapminderStat_File"

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

  Delete "$INSTDIR\blink_image_resources_200_percent.pak"
  Delete "$INSTDIR\content_resources_200_percent.pak"
  Delete "$INSTDIR\content_shell.pak"
  Delete "$INSTDIR\d3dcompiler_47.dll"
  Delete "$INSTDIR\ffmpeg.dll"
  Delete "$INSTDIR\Gapminder Offline.exe"
  Delete "$INSTDIR\icudtl.dat"
  Delete "$INSTDIR\invisible.vbs"
  Delete "$INSTDIR\libEGL.dll"
  Delete "$INSTDIR\libGLESv2.dll"
  Delete "$INSTDIR\LICENSE"
  Delete "$INSTDIR\LICENSES.chromium.html"
  Delete "$INSTDIR\natives_blob.bin"
  Delete "$INSTDIR\node.dll"
  Delete "$INSTDIR\snapshot_blob.bin"
  Delete "$INSTDIR\ui_resources_200_percent.pak"
  Delete "$INSTDIR\update-app-${arch}.exe"
  Delete "$INSTDIR\update-dataset-${arch}.exe"
  Delete "$INSTDIR\version"
  Delete "$INSTDIR\views_resources_200_percent.pak"
  RMDir /r "$INSTDIR\resources"
  RMDir /r "$INSTDIR\locales"

  Delete "$INSTDIR\Uninstall.exe"
  Delete "$desktop\Gapminder Tools Offline.lnk"
  Delete "$SMPROGRAMS\Gapminder Tools Offline\Gapminder Tools Offline.lnk"
  Delete "$SMPROGRAMS\Gapminder Tools Offline\Uninstall Gapminder Tools Offline.lnk"
  RMDir "$SMPROGRAMS\Gapminder Tools Offline"

  RMDir "$INSTDIR"

  DeleteRegKey /ifempty HKCU "Software\Gapminder Offline"

  ${unregisterExtension} ".gmstat" "GapminderStat_File"

SectionEnd

Function .onInit
  SectionSetFlags ${SecMain} 17
FunctionEnd
