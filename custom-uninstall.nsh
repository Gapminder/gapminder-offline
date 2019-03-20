var desktopLinkInstall
var startMenuDir
var startMenuLinkInstall
var startMenuLinkUnInstall

!macro setUninstallLinkVars
  StrCpy $desktopLinkInstall "$desktop\Gapminder Tools Offline.lnk"
  StrCpy $startMenuDir "$SMPROGRAMS\Gapminder Tools Offline"
  StrCpy $startMenuLinkInstall "$startMenuDir\Gapminder Tools Offline.lnk"
  StrCpy $startMenuLinkUnInstall "$startMenuDir\Uninstall Gapminder Tools Offline.lnk"
!macroend

!macro customHeader

!macroend

!macro preInit
  SetRegView 64
	WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	SetRegView 32
	WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
!macroend

!macro customInit
  !insertmacro setUninstallLinkVars
!macroend

!macro customInstall
  CreateShortcut "$desktopLinkInstall" "$INSTDIR\Gapminder Tools Offline.exe"
  CreateDirectory "$startMenuDir"
  CreateShortcut "$startMenuLinkInstall" "$INSTDIR\Gapminder Tools Offline.exe"
  CreateShortcut "$startMenuLinkUnInstall" "$INSTDIR\Uninstall Gapminder Tools Offline.exe"
!macroend

!macro customUnInit
  !insertmacro setUninstallLinkVars
!macroend

!macro customUnInstall
  RMDir /r "$LocalAppdata\gapminder-offline-updater"
  RMDir /r "$startMenuDir"

  Delete "$desktopLinkInstall"
  Delete "$startMenuLinkInstall"
  Delete "$startMenuLinkUnInstall"
  Delete "$startMenuDir"

  SetRegView 64
	DeleteRegKey HKLM "${INSTALL_REGISTRY_KEY}"
	DeleteRegKey HKCU "${INSTALL_REGISTRY_KEY}"
	SetRegView 32
	DeleteRegKey HKLM "${INSTALL_REGISTRY_KEY}"
	DeleteRegKey HKCU "${INSTALL_REGISTRY_KEY}"

	RMDir /r "$LocalAppData\Programs\${PRODUCT_FILENAME}"
!macroend
