const { bucket, storage } = require('../plugins/firebase');

/**
 * upload file lên firebase storage
 * @param {*} file 
 * @param {*} options 
 */
const upload = (file, options = {}) => {
  // bucket.upload(file, options);
  const blob = bucket.file(`images/${file.originalname}`)

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  })

  blobWriter.on('error', (err) => {
    console.log(err)
  })

  blobWriter.on('finish', () => {
    console.log('success');
  })

  blobWriter.end(file.buffer)
}

/**
 * upload file lên firebase storage
 * @param {*} file 
 * @param {*} options 
 */
const uploadPhotos = (files, options = {}) => {
  
  let destination = options.destination || '';
  if (destination && destination[destination.length - 1] != '/') {
    destination = destination + '/';
  }
  
  for (const file of files) {
    const blob = bucket.file(`images/${destination}${file.originalname}`)
  
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    })
  
    blobWriter.on('error', (err) => {
      console.log(err)
    })
  
    blobWriter.on('finish', () => {
      console.log('success');
    })
  
    blobWriter.end(file.buffer);
  }
}

/**
 * Lấy link ảnh
 * @param {*} fileName 
 * @param {*} destination 
 */
const getImageLink = (fileName, destination) => {
  destination = destination || '';
  if (destination && destination[destination.length - 1] != '/') {
    destination = destination + '/';
  }
  destination = destination.replaceAll('/', '%2F');
  let link = `https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F${destination}${fileName}?alt=media`
  return link;
}

/**
 * Lấy fire trên storage
 */
const get = async () => {
  let [file] = await bucket.getFiles();
  // let file = await bucket.file('cyberpunk-girl-futuristic-soldiers-uhdpaper.com-4K-4.3077.jpg');
  let metaFile = await file[0].getMetadata();
  return file;
}

module.exports = {
  get,
  upload,
  uploadPhotos,
  getImageLink
}