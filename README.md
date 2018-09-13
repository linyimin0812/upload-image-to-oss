A tool to upload picture(copy or cut) which stored in clipboad to OSS, and return a url link, we can use this url to visit the picture, which may be convenient when add a picture in markdown.

### usage

- Copy the follow content to .env in project's root directory, and specify the server information

```
# Server Mode: We support "OSS" and "Apache Server" Now
## You can specify "OSS" or "Apache"
mode=OSS

# Aliyun Object Storage Service (OSS)
## bucket 所在的区域, 默认 oss-cn-hangzhou
region=******
## 通过阿里云控制台创建的access key。
accessKeyId=******
## 通过阿里云控制台创建的access secret
accessKeySecret=******
## 通过控制台创建的bucket, 或通过putBucket创建
bucket=******

# Apache Sever
## Server IP, 默认是localhost
serverIP=localhost
## Server的ssh端口, 默认是22
sshPort=22
## Server 的账户
account=******
## 账户对应的密码
password=******
## 图片所处的目录, 默认是/var/www/html/images
imagesDirectory=/var/www/html/images
## 访问图片的url, 设置之后可以访问到所有图片,并可以修改图片名称
imagesUrl=/images
## Apache Server 对应的端口, 默认是80
serverPort=80
```

---

This plugin support OSS and Apache Server, specify the infomation of server which you choose to store the pictures.

If you choose **mode equal to OSS**, then the Picture will upload to the OSS
else **mode equal to Apache**, and the Picture will upload to the Apache Server

---

- Install xclip package
```shell
$ sudo apt-get install xclip
```

If want to upload the pictures to apache server, you should install sshpass plugin.
```shell
$ sudo apt-get install sshpass
```

More detail information about [xclip](https://github.com/astrand/xclip)

More detail information about [sshpass](https://gist.github.com/arunoda/7790979)

- Install upload-image-to-oss

```shell
$ npm i upload-image-to-oss
```

---

- Specify shortcut to upload picture when copy a cut a picture

```typescript
import start from 'upload-image-to-oss'

start(['ctrl', 'alt', 'u'])
```

--- 

When the type of content stored in clipboard is picture, and if you press `ctrl+alt+u`,the picture will be uploaded to the specified OSS, and the link will store in clipboard, so you can use `ctrl+v` to get the link.

### CHANGELOG
---
**v1.0.7**(20 Aug 2018)
1. Specify shortcut to upload image which stored in clipboard.
2. Give a Pop-up notification after uploaded the  picture(copy or cut) stored in clipboard to OSS
3. Log in ~/.upload-image-to-oss

**v1.0.8**(22 Aug 2018)
1. Support Upload picture to Apache Server

**v1.0.9**(09 Sep 2018)
1. Fixed any three will trigger when specify a three key shortcut bug.

**v1.0.10**(13 Sep 2018)

1. Repalce wiston with brolog