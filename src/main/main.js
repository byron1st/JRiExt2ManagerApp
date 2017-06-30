'use strict'

import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import { exec } from 'child_process'

import testMode from './app.mode'

const JRIEXT2 = '/Users/byron1st/Developer/Workspace/Java/jriext2/build/install/jriext2/bin/jriext2'

const KEY_ERROR = 'error'
const KEY_DONE = 'done'

let mainWindow = null
let jriext2 = null

app.on('ready', initialize)

ipcMain.on('send-command', (event, command) => {
  sendToJRiExt2(command)
})

function initialize () {
  executeJRiExt2()
  createMainWindow()
}

function executeJRiExt2 () {
  jriext2 = exec(JRIEXT2, (error) => console.log(error))
  jriext2.stdout.on('data', IPCtoJRiExt2)
  jriext2.on('error', error => console.log(error))
  jriext2.on('close', () => console.log('closed'))
}

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    resizable: false,
    fullscreen: false,
    title: 'JRiExt2 Manager'
  })
  mainWindow.loadURL(path.join('file://', __dirname, '/../mainwindow/index.html'))
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (testMode) {
    // A path to React Developer Tools(Chrome plugin)
    // URL: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
    BrowserWindow.addDevToolsExtension('/Users/byron1st/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.4.0_0')
    mainWindow.webContents.openDevTools()
  }
}

function IPCtoJRiExt2 (data) {
  const message = JSON.parse(data)

  switch (message.key) {
    case KEY_ERROR:
      console.log(message.body)
      break
    case KEY_DONE:
      console.log(message.body)
      break
    default:
      break
  }
}

function sendToJRiExt2 (command) {
  try {
    jriext2.stdin.write(JSON.stringify(command) + '\n')
  } catch (e) {
    console.log(e)
    console.log(command)
  }
}
