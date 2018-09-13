import { default as Keypress, TwoKeys, ThreeKeys } from 'keypress-event'
import { getContentFromCliboard } from './clipboard'
import { log } from 'brolog'
import dotenv from 'dotenv'
import putToOSS from './upolad/oss-upload'
import putToApache from './upolad/apache-upload'

dotenv.config()
function start(shortcut: TwoKeys | ThreeKeys) {
  log.info('Register Shortcut: %s', shortcut.join('+'))
  Keypress.registerShortcut(shortcut, () => {
    try {
      const buffer = getContentFromCliboard()
      log.info('Shortcut trigger and get content form clipboard success')
      selectServer(process.env.mode!, buffer)
    } catch (err) {
      log.error('Shortcut trigger and get content form clipboard failed, the reason is %s', err)
    }
  })
  Keypress.start()
}

function selectServer(mode: string, data: Buffer) {
  switch (mode) {
    case 'OSS': {
      log.info('Upload Picture to OSS')
      putToOSS(data)
      break
    }
    case 'Apache': {
      log.info('Upload Picture to Apache')
      putToApache(data)
      break
    }
    default: {
      throw new Error('You are not Specifed the Server')
    }
  }
}

export default start
