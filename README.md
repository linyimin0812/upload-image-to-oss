A tool to upload picture(copy or cut) which stored in clipboad to OSS, and return a url link, we can use this url to visit the picture, which may be convenient when add a picture in markdown.

### usage

- Create a .env in project's root directory, and specify the OSS information

```shell
$ touch .env
$ vim .env
# configuration information

# bucket 所在的区域, 默认 oss-cn-hangzhou
region=******

# 通过阿里云控制台创建的access key。
accessKeyId=******

# 通过阿里云控制台创建的access secret
accessKeySecret=******

# 通过控制台创建的bucket, 或通过putBucket创建
bucket=******
```
- Install xclip package
```shell
$ sudo apt-get install xclip
```

- Install upload-image-to-oss

```shell
$ npm i upload-image-to-oss
```

- Specify shortcut to upload picture when copy a cut a picture

```typescript
import start from 'upload-image-to-oss'

start(['ctrl', 'alt', 'u'])
```

When the type of content stored in clipboard is picture, and if you press `ctrl+alt+u`,the picture will be uploaded to the specified OSS, and the link will store in clipboard, so you can use `ctrl+v` to get the link.
