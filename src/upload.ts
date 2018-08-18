
import OSS from 'ali-oss'
import cuid from 'cuid'
import dotenv from 'dotenv'
import { default as Keypress, TwoKeys, ThreeKeys } from 'keypress-event'
import { getContentFromCliboard, copyContentToClipboard } from './clipboard'

dotenv.config()


let client = new OSS({
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
  bucket: process.env.bucket,
})


// upload image
async function put(data: Buffer): Promise<string> {
  try {
    const imageName = `${cuid()}.png`
    let result = await client.put(imageName, data)
    // copy the url to clipboard
    copyContentToClipboard(result.url)
    // Change object acl to 'public-read', so we can view the picture by link
    client.putACL(imageName, 'public-read')
      .then((result: any) => [
      ])
      .catch((err: Error) => {
        console.log(err)
      })
    return result.url
  } catch (err) {
    throw err
  }
}

function start(shortcut: TwoKeys | ThreeKeys) {
  Keypress.registerShortcut(shortcut, () => {
    try {
      const buffer = getContentFromCliboard()
      put(buffer)
    } catch(err) {
      console.log(err)
    }
  })
  Keypress.start()
}

export default start
