import popUpNotify from './notification'
import { spawnSync, exec } from 'child_process'
interface Command {
  command: string,
  args: string[],
}

const pasteText: Command = {
  command: 'xclip',
  args: ["-selection", "clipboard", '-o'],
}

const pasteImage: Command = {
  command: 'xclip',
  args: ['-selection', 'clipboard', '-t', 'image/png', '-o'],
}

export function getContentFromCliboard(): Buffer {
  const result = spawnSync(pasteImage.command, pasteImage.args)
  const stdout = result.stdout
  if (result.status === 0 && stdout.length > 0) {
    return Buffer.from(result.stdout)
  }
  popUpNotify()
  throw new Error('The type of clipboard\' content is not image')
}

export function copyContentToClipboard(data: string) {
    exec(`printf ${data} | xclip -sel clip`)
}