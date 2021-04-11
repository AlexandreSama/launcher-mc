// Importation des modules
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { Client, Authenticator } = require("minecraft-launcher-core");

// Variables globales
let mainWindow;

// Création de la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    title: "AliusLauncher",
    icon: path.join(__dirname, "/asset/img/slashdev.png"),
    width: 1280,
    height: 720,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: true
    },
  });

  mainWindow.loadURL(path.join(__dirname, "asset/pages/html/login.html"));
}

// Quand l'application est chargée, afficher la fenêtre
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Si toutes les fenêtres sont fermées, quitter l'application
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Quand un utilisateur tente de se connecter
ipcMain.on("login", (evt, data) => {
  Authenticator.getAuth(data.user, data.pass)
    .then((e) => {
      console.log("SEX !")
      mainWindow.loadURL(path.join(__dirname, "asset/pages/html/app.html"));
    })
    .catch(() => {
      console.log("ANAL")
      evt.sender.send("err", "Erreur de connexion");
    });
});