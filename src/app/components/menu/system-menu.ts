import { HomeComponent } from '../home/home.component';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;
import { ElectronService } from '../../providers/electron.service';

export const initMenuComponent = (appComponent: HomeComponent, es: ElectronService) => {
  const templateMenu: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New chart',
          submenu: [
            {
              label: 'Gapminder data',
              click: () => appComponent.menuActions.gapminderChart()
            },
            {
              label: 'Your data',
              submenu: [
                {
                  label: 'CSV file...',
                  click: () => appComponent.menuActions.openCsvFile()
                },
                {
                  label: 'DDF folder',
                  click: () => appComponent.menuActions.openDdfFolder()
                }
              ]
            }
          ]
        },
        {
          label: 'Add data to the active chart',
          submenu: [
            {
              label: 'CSV file...',
              click: () => appComponent.menuActions.addCsvFile()
            },
            {
              label: 'DDF folder',
              click: () => appComponent.menuActions.ddfFolderClick(
                new MouseEvent('click'), appComponent.onDdfExtFolderChanged.bind(appComponent))
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          label: 'Open...',
          click: () => appComponent.menuActions.open()
        },
        {
          label: 'Save...',
          click: () => appComponent.menuActions.save()
        },
        {
          label: 'Save all tabs...',
          click: () => appComponent.menuActions.saveAllTabs()
        },
        {
          label: 'DDF tools',
          click: () => appComponent.menuActions.openValidationWindow()
        },
        {
          label: 'Export',
          submenu: [
            {
              label: 'for Web...',
              click: () => appComponent.menuActions.exportForWeb()
            },
            {
              label: 'to SVG...',
              click: () => appComponent.menuActions.exportToSvg()
            },
            {
              label: 'to PNG...',
              click: () => appComponent.menuActions.exportToPng()
            }
          ]
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Undo', accelerator: 'CmdOrCtrl+Z'},
        {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z'},
        {type: 'separator'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X'},
        {label: 'Copy', accelerator: 'CmdOrCtrl+C'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item: any, focusedWindow: any): void {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          // accelerator: es.process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item: any, focusedWindow: any): void {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Check for updates...',
          click: () => appComponent.menuActions.checkForUpdates()
        },
        {
          label: 'Learn More',
          click: () => {
            es.shell.openExternal('https://github.com/VS-work/gapminder-offline');
          }
        }
      ]
    }
  ];
  const Menu = es.remote.Menu;

  appComponent.menuComponent = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(appComponent.menuComponent);
};
