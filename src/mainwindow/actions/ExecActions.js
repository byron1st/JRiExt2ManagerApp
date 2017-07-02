import { ipcRenderer } from 'electron'

import { executeJRiExt2 } from './commands'
import { changeExecStatus } from './ExecStatusActions'
import { EXEC_STATUS } from './types'

export const startExec = ({ exec, index }) => {
  // TODO: 나중에 JRiExt2에 무관하게 변경.
  const command = executeJRiExt2(exec)
  ipcRenderer.send('send-command', command)

  return (dispatch) => {
    dispatch(changeExecStatus({ index, execStatus: EXEC_STATUS.EXEC_ONGOING }))
  }
}
