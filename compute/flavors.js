var request = require('request');
var endpoint = process.env.OKEANOS_COMPUTE || 'https://cyclades.okeanos.grnet.gr/compute/v2.0';

var FlavorAPI = function () {};

module.exports = new FlavorAPI();

FlavorAPI.prototype.List = async (user, detailed = false) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/flavors' + detailed ? '/detail' : '',
            headers: {
                'X-Auth-Token': user.token
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};

FlavorAPI.prototype.Getdetails = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/flavors/' + id,
            headers: {
                'X-Auth-Token': user.token
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};