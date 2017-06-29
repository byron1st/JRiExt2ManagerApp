const CMD = {
  INST: 'inst',
  EXECUTE: 'execute',
  QUIT: 'quit'
}

export const instrument = (targetClassPath, ettypeDefFilePath) => {
  return {
    cmd: CMD.INST,
    args: [targetClassPath, ettypeDefFilePath]
  }
}

export const execute = (mainClassName, outputFilePath, errorFilePath) => {
  return {
    cmd: CMD.EXECUTE,
    args: [mainClassName, outputFilePath, errorFilePath]
  }
}

export const quit = () => {
  return {
    cmd: CMD.QUIT
  }
}
