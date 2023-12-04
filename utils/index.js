const bcrypt = require("bcrypt");
const ImageKit = require("imagekit");

const encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(5);

    return bcrypt.hash(password, salt);
};

const encryptEmail = async() => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomText = "";

    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }

    return randomText;
};

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

module.exports = {
    encryptPassword,
    encryptEmail,
    imageKit,
};