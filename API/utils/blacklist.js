const config = require("../../config.json");
const axios = require("axios");

async function checkBlacklist(uuid) {
    return new Promise((resolve, reject) => {
        const API_URL = config.API.url;

        await axios.get(API_URL,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );

        let blacklisted = false;

        axios.get(API_URL + `?uuid=${uuid}`)
            .then(function (response) {
                if (response.data.banned) {
                    blacklisted = true;
                }
                resolve(blacklisted);
            })
            .catch(function (error) {
                blacklisted = true;
                resolve(blacklisted);
            });
    });
}

module.exports = {
    checkBlacklist
};
