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

export const executeJRiExt2 = (exec) => {
  const { mainClassName, uniqueName, outputPath } = exec
  return {
    cmd: CMD.EXEC,
    args: [mainClassName, uniqueName, outputPath]
  }
}

export const stopExecJRiExt2 = ({ processKey }) => {
  return {
    cmd: CMD.STOP,
    args: [processKey]
  }
}

export const quit = () => {
  return {
    cmd: CMD.QUIT
  }
}
