const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = {
    port: PORT,
    url: BASE_URL,
    //adicional
    imgUrl: `${BASE_URL}/static/images`,
    imgFolder: './src/public/uploads/images'
};
