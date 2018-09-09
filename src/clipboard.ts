import popUpNotify from './notification'
import { spawnSync, exec } from 'child_process'
import { logger } from './logger'
interface Command {
  command: string,
  args   : string[],
}

// const pasteText: Command = {
//   command: 'xclip',
//   args: ["-selection", "clipboard", '-o'],
// }

const pasteImage: Command = {
  command: 'xclip',
  args   : ['-selection', 'clipboard', '-t', 'image/png', '-o'],
}
const log = logger()
export function getContentFromCliboard(): Buffer {
  const result = spawnSync(pasteImage.command, pasteImage.args)
  const stdout = result.stdout
  if (result.status === 0 && stdout.length > 0) {
    log.info('Get Image from clipboard success!')
    return Buffer.from(result.stdout)
  }
  popUpNotify()
  log.error('Get Image from clipboard error!')
  throw new Error('The type of clipboard\' content is not image')
}

export function copyContentToClipboard(data: string) {
    exec(`printf ${data} | xclip -sel clip`)
}