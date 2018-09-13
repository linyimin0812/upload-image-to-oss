import fs from'fs'
import cuid from 'cuid'
import dotenv from 'dotenv'
import { execSync } from 'child_process'
import { log } from 'brolog'
import popUpNotify from '../notification'
import { copyContentToClipboard } from '../clipboard'

dotenv.config()

const apacheConfig = {
  serverIP       : process.env.serverIP || 'localhost',
  sshPort        : process.env.sshPort || '22',
  account        : process.env.account,
  password       : process.env.password,
  imagesDirectory: process.env.imagesDirectory,
  serverPort     : process.env.serverPort,
  imagesUrl      : process.env.imagesUrl,
}

function checkConfig(config) {
  if (! config.account) {
    throw new Error('Please Specify a User Account')
  }
  if (! config.password) {
    throw new Error('Please Specify the User Account\' password')
  }
  if(! config.imagesDirectory) {
    log.info('checkConfig: %s', JSON.stringify(config, null, 2))
    throw new Error('Please Specify Apache Server\'s work directory')
  }
  if(! config.imageUrl) {
    log.warn('You are not specifing Apache Server\'s images path, use /images as  default path')
  }
}

// upload image
async function put(data: Buffer): Promise<string> {
  try {
    checkConfig(apacheConfig)
    const imageName = `${cuid()}.png`
    const imagePath = `/tmp/${imageName}`
    fs.writeFileSync(imagePath, data)
    const command = `sshpass -p '${apacheConfig.password}' scp -P ${apacheConfig.sshPort} ${imagePath} ${apacheConfig.account}@${apacheConfig.serverIP}:${apacheConfig.imagesDirectory}`
    execSync(command)
    log.info('Upload image to Apache Server success')
    // copy the url to clipboard
    const resultUrl = `http://${apacheConfig.serverIP}:${apacheConfig.serverPort}${apacheConfig.imagesUrl}/${imageName}`
    copyContentToClipboard(resultUrl)
    log.info('Copy Content: %s To Clipboard', resultUrl)
    popUpNotify(data)
    return resultUrl
  } catch (err) {
    popUpNotify()
    log.error('Upload image to OSS failed, the reason is %s', JSON.stringify(err, null, 2))
    throw err
  }
}

export default put
