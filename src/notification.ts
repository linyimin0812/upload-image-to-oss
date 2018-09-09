import NotifySend from 'node-notifier/notifiers/notifysend'

import fs from 'fs'
import path from 'path'

function popUpNotify(data?: Buffer) {
  const options = {
    title   : 'Picture to Link',
    message : 'Upload Message Success',
    icon    : '',
    urgency : 'critical',
    time    : void 0,
    category: void 0,
    hint    : void 0,
  }
  const notifier = new NotifySend()
  // transfer buffer to picture
  if(! data) {
    options.message = 'Error, Please Lookup ~/.upload-picture-to-oss/error.log'
    options.icon    = path.join(__dirname, '../', './images/error.png')
    notifier.notify(options)
    return
  }
  const iconName = `/tmp/${new Date().getTime()}.png`
  fs.writeFileSync(iconName, data)
  options.icon = iconName
  notifier.notify(options)
}
export default popUpNotify