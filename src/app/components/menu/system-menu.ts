import { HomeComponent } from '../home/home.component';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import { ElectronService } from '../../providers/electron.service';
import { langConfigTemplate } from '../../../lang-config';

export const initMenuComponent = (appComponent: HomeComponent, es: ElectronService) => {
  const templateMenu: MenuItemConstructorOptions[] = [
    {
      label: appComponent.translate.instant('File'),
      submenu: [
        {
          label: appComponent.translate.instant('New chart'),
          submenu: [
            {
              label: appComponent.translate.instant('Gapminder data'),
              click: () => appComponent.menuActions.gapminderChart()
            },
            {
              label: appComponent.translate.instant('Your data'),
              submenu: [
                {
                  label: appComponent.translate.instant('CSV file...'),
                  click: () => appComponent.menuActions.openCsvFile()
                },
                {
                  label: appComponent.translate.instant('Excel file...'),
                  click: () => appComponent.menuActions.openExcelFile()
                },
                {
                  label: appComponent.translate.instant('DDF folder'),
                  click: () => appComponent.menuActions.openDdfFolder()
                }
              ]
            }
          ]
        },
        {
          label: appComponent.translate.instant('Add data to the active chart'),
          submenu: [
            {
              label: appComponent.translate.instant('CSV file...'),
              click: () => appComponent.menuActions.addCsvFile()
            },
            {
              label: appComponent.translate.instant('Excel file...'),
              click: () => appComponent.menuActions.addExcelFile()
            },
            {
              label: appComponent.translate.instant('DDF folder'),
              click: () => appComponent.menuActions.ddfFolderClick(
                new MouseEvent('click'), appComponent.onDdfExtFolderChanged.bind(appComponent))
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: appComponent.translate.instant('Open...'),
          click: () => appComponent.menuActions.open()
        },
        {
          label: appComponent.translate.instant('Save...'),
          click: () => appComponent.menuActions.save()
        },
        {
          label: appComponent.translate.instant('Save all tabs...'),
          click: () => appComponent.menuActions.saveAllTabs()
        },
        {
          label: appComponent.translate.instant('DDF tools'),
          click: () => appComponent.menuActions.openValidationWindow()
        },
        {
          label: appComponent.translate.instant('Export'),
          submenu: [
            {
              label: appComponent.translate.instant('for Web...'),
              click: () => appComponent.menuActions.exportForWeb()
            },
            {
              label: appComponent.translate.instant('to SVG...'),
              click: () => appComponent.menuActions.exportToSvg()
            },
            {
              label: appComponent.translate.instant('to PNG...'),
              click: () => appComponent.menuActions.exportToPng()
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: appComponent.translate.instant('Quit'),
          role: 'quit'
        }
      ]
    },
    {
      label: appComponent.translate.instant('Edit'),
      submenu: [
        {label: appComponent.translate.instant('Undo'), accelerator: 'CmdOrCtrl+Z', role: 'undo'},
        {label: appComponent.translate.instant('Redo'), accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo'},
        {type: 'separator'},
        {label: appComponent.translate.instant('Cut'), accelerator: 'CmdOrCtrl+X', role: 'cut'},
        {label: appComponent.translate.instant('Copy'), accelerator: 'CmdOrCtrl+C', role: 'copy'},
        {label: appComponent.translate.instant('Paste'), accelerator: 'CmdOrCtrl+V', role: 'paste'},
        {label: appComponent.translate.instant('Select All'), accelerator: 'CmdOrCtrl+A', role: 'selectall'}
      ]
    },
    {
      label: appComponent.translate.instant('Languages'),
      submenu: []
    },
    {
      label: appComponent.translate.instant('View'),
      submenu: [
        {
          label: appComponent.translate.instant('Reload'),
          accelerator: 'CmdOrCtrl+R',
          click(item: any, focusedWindow: any): void {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: appComponent.translate.instant('Toggle Developer Tools'),
          // accelerator: es.process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item: any, focusedWindow: any): void {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        },
        {
          label: 'Capture the screen',
          click: () => appComponent.menuActions.prepareScreenCapture()
        },
        {
          type: 'separator'
        },
        {
          label: appComponent.translate.instant('Actual Size'),
          role: 'resetzoom'
        },
        {
          label: appComponent.translate.instant('Zoom In'),
          role: 'zoomin'
        },
        {
          label: appComponent.translate.instant('Zoom Out'),
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          label: appComponent.translate.instant('Toggle Full Screen'),
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: appComponent.translate.instant('Window'),
      role: 'window',
      submenu: [
        {
          label: appComponent.translate.instant('Minimize'),
          role: 'minimize'
        },
        {
          label: appComponent.translate.instant('Close'),
          role: 'close'
        }
      ]
    },
    {
      label: appComponent.translate.instant('Help'),
      role: 'help',
      submenu: [
        {
          label: appComponent.translate.instant('Check for updates...'),
          click: () => appComponent.menuActions.checkForUpdates()
        },
        {
          label: appComponent.translate.instant('Learn More'),
          click: () => {
            es.shell.openExternal('https://github.com/VS-work/gapminder-offline');
          }
        }
      ]
    }
  ];
  const Menu = es.remote.Menu;

  templateMenu[2].submenu = langConfigTemplate.map(langDescriptor => ({
    label: langDescriptor.label,
    click: () => appComponent.menuActions.setLanguage([langDescriptor.id])
  }));

  appComponent.menuComponent = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(appComponent.menuComponent);
};
