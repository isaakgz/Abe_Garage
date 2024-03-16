const bcrypt = require('bcryptjs');


//function to hash the password
const hashPassword = async (password) => {

    //generate the salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}



//function to compare the password
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    //return the result
   return  isMatch ? true : false;

}

module.exports = {hashPassword, comparePassword};