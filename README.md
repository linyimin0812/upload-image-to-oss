A tool to upload picture(copy or cut) which stored in clipboad to OSS, and return a url link, we can use this url to visit the picture, which may be convenient when add a picture in markdown.

### usage

- Copy the .env.template file to .env in project's root directory, and specify the server information

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