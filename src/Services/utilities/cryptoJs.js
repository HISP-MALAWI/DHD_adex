import CryptoJS from "crypto-js";

class useCrypto {
  constructor() {
    this.key = "tkhmsp-so-fanny!-the-secret-is-kept-open";
  }

  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }
  decrypt(data) {
    if (data == null) {
      return null;
    } else {
      var bytes = CryptoJS.AES.decrypt(data, this.key);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  }
}

export default useCrypto;
