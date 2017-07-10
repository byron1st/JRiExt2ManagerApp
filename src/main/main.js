'use strict'

import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import { exec } from 'child_process'
import fs from 'fs'

import testMode from './app.mode'
import { buildExecutionTraceDB } from './db'
import extract from './extractor'
import buildDotString from './dotBuilder'

const JRIEXT2 = '/Users/byron1st/Developer/Workspace/Java/jriext2/build/install/jriext2/bin/jriext2'
// const JRIEXT2 = path.join(__dirname, '/../../public/jriext2/bin/jriext2')

let mainWindow = null
let jriext2 = null

app.on('ready', initialize)

ipcMain.on('send-command', (event, command) => {
  sendToJRiExt2(command)
})

ipcMain.on('get-jriext2-pid', (event) => {
  event.returnValue = jriext2.pid
})

ipcMain.on('extract-model', (event, ettypeList, execList, mappingConditionScript, filename) => {
  const extractor = require(mappingConditionScript)

  buildExecutionTraceDB(ettypeList, execList).then(db => {
    extract(extractor, db).then(elementSet => {
      const dotString = buildDotString(elementSet)
      fs.writeFileSync(filename, dotString)
      sendToRenderer('extract-model-done', filename)
    })
  })
})

function initialize () {
  executeJRiExt2()
  createMainWindow()
}

function executeJRiExt2 () {
  jriext2 = exec(JRIEXT2, (error) => console.log(error))
  jriext2.stdout.on('data', getResponseFromJRiExt2)
  jriext2.on('error', error => sendToRenderer('error-response', error.message))
  // TODO: console.log를 다른 error 방법으로 변경.
  jriext2.on('close', () => console.log('closed'))
}

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    fullscreen: false,
    resizable: false,
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

function getResponseFromJRiExt2 (data) {
  const KEY_ERROR = 'error'
  const KEY_DONE_INST = 'done.inst'
  const KEY_DONE_EXEC = 'done.exec'
  const KEY_TERM_EXEC = 'term.exec'
  const KEY_DONE_QUIT = 'done.quit'

  const response = JSON.parse(data)
  switch (response.key) {
    case KEY_ERROR:
      sendToRenderer('error-response', response.body[0])
      break
    case KEY_DONE_INST:
      sendToRenderer('done-inst', response.body[0])
      break
    case KEY_DONE_EXEC:
      sendToRenderer('done-exec', response.body)
      break
    case KEY_TERM_EXEC:
      sendToRenderer('term-exec', response.body)
      break
    case KEY_DONE_QUIT:
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

function sendToRenderer (channel, args) {
  if (mainWindow) {
    mainWindow.webContents.send(channel, args)
  }
}
