const crypto = require("crypto");



 // Generate a unique hash
 const generateHash = (email) => {
    const randomValue = Math.random().toString();

    const hash = crypto.createHash("sha256");
    hash.update(randomValue + email);
    return hash.digest('hex').slice(0, 32)
 }


module.exports = generateHash;

