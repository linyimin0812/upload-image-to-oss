
import OSS from 'ali-oss'
import cuid from 'cuid'
import dotenv from 'dotenv'
import { log } from 'brolog'
import popUpNotify from '../notification'
import { copyContentToClipboard } from '../clipboard'

dotenv.config()

let client = new OSS({
  region         : process.env.region,
  accessKeyId    : process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
  bucket         : process.env.bucket,
})


// upload image
async function put(data: Buffer): Promise<string> {
  try {
    const imageName = `${cuid()}.png`
    let result = await client.put(imageName, data)
    log.info('Upload image to OSS success')
    // copy the url to clipboard
    copyContentToClipboard(result.url)
    log.info('Copy Content: %s To Clipboard', result.url)
    popUpNotify(data)
    // Change object acl to 'public-read', so we can view the picture by link
    client.putACL(imageName, 'public-read')
      .then((result: any) => {
        log.info('Change image ACL to public-read success')
      })
      .catch((err: Error) => {
        log.error('Change image ACL to pulic-read failed, The reason is %s', JSON.stringify(err, null, 2))
      })
    return result.url
  } catch (err) {
    popUpNotify()
    log.error('Upload image to OSS failed, the reason is %s', JSON.stringify(err, null, 2))
    throw err
  }
}

export default put

