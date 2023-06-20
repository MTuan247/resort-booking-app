/**
 * Validate Email
 * @param {*} text 
 * @returns 
 */
export const validateEmail = (text) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text);
}

/**
 * Validate Phone
 * @param {*} text 
 * @returns 
 */
export const validatePhone = (text) => {
  const reg =  /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  return reg.test(text);
}