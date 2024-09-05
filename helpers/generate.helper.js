module.exports.generateRandomString = (length) => {
  const characters = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  
  let result = "";

  for(let i = 0; i < length; i++) {
    /** 
     * Math.random(): trả về một khoảng [0, 1)
     * - Khi nhân một số n trong khoảng từ [0, 1) thì ta được một số ngẫu nhiên từ 0 đến n - 1
     * */
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

module.exports.generateRandomNumber = (length) => {
  const characters = "0123456789";
  
  let result = "";

  for(let i = 0; i < length; i++) {
    /** 
     * Math.random(): trả về một khoảng [0, 1)
     * - Khi nhân một số n trong khoảng từ [0, 1) thì ta được một số ngẫu nhiên từ 0 đến n - 1
     * */
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}