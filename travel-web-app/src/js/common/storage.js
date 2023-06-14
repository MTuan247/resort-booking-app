/**
 * Lấy link ảnh
 * @param {*} fileName 
 * @param {*} destination 
 */
export const getImageLink = (fileName, destination) => {
  destination = destination || '';
  if (destination && destination[destination.length - 1] != '/') {
    destination = destination + '/';
  }
  destination = destination.replaceAll('/', '%2F');
  let link = `https://firebasestorage.googleapis.com/v0/b/travel-web-app-6fd3b.appspot.com/o/images%2F${destination}${fileName}?alt=media`
  return link;
}