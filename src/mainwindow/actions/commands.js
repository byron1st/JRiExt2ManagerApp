const CMD = {
  INST: 'cmd.inst',
  EXEC: 'cmd.exec',
  STOP: 'cmd.stop',
  QUIT: 'cmd.quit'
}

export const instrument = (classpath, ettypeList) => {
  return {
    cmd: CMD.INST,
    args: [classpath, ettypeList]
  }
}

export const execute = (mainClassName, outputFilePath, errorFilePath) => {
  return {
    cmd: CMD.EXEC,
    args: [mainClassName, outputFilePath, errorFilePath]
  }
}

export const quit = () => {
  return {
    cmd: CMD.QUIT
  }
}
