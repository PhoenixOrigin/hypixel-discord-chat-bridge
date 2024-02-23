const config = require("../../config.json");
const axios = require("axios");

async function checkBlacklist(uuid) {
    return new Promise((resolve, reject) => {
        const API_URL = config.API.url;

        await axios.get(API_URL,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${config.API.token}`
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
                blacklisted = false;
                resolve(blacklisted);
            });
    });
}

module.exports = {
    checkBlacklist
};
