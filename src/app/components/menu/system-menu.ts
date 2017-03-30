import { AppComponent } from '../../app.component';

declare const electron: any;

export const initMenuComponent = (appComponent: AppComponent) => {
  const templateMenu = [
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
                  // click: () => appComponent.menuActions.ddfFolderClick(new MouseEvent('click'), appComponent.onDdfFolderChanged.bind(appComponent))
                  click: () => appComponent.menuActions.openDdfFolder()
                }
              ]
            }
          ]
        },
        {
          label: 'Add your data',
          submenu: [
            {
              label: 'CSV file...',
              click: () => appComponent.menuActions.addCsvFile()
            },
            {
              label: 'DDF folder',
              click: () => appComponent.menuActions.ddfFolderClick(new MouseEvent('click'), appComponent.onDdfExtFolderChanged.bind(appComponent))
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
          label: 'Export for Web...',
          click: () => appComponent.menuActions.exportForWeb()
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
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item: any, focusedWindow: any): void {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click (item: any, focusedWindow: any): void {
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
            electron.shell.openExternal('https://github.com/VS-work/gapminder-offline');
          }
        }
      ]
    }
  ];
  const Menu = electron.remote.Menu;

  appComponent.menuComponent = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(appComponent.menuComponent);
};
