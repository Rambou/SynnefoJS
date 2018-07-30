var request = require('request');
var endpoint = process.env.OKEANOS_COMPUTE || 'https://cyclades.okeanos.grnet.gr/compute/v2.0';

var KeypairAPI = function () {};

module.exports = new KeypairAPI();

KeypairAPI.prototype.List = async (user) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/os-keypairs',
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

KeypairAPI.prototype.CreateOrImport = async (user, keypair) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/os-keypairs',
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'keypair': keypair
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            try {
                return resolve(JSON.parse(body));
            } catch (err) {
                return resolve(body);
            }
        });
    });
};

KeypairAPI.prototype.GetDetails = async (user, keypair_name) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/os-keypairs/' + keypair_name,
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

KeypairAPI.prototype.Delete = async (user, keypair_name) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/os-keypairs/' + keypair_name,
            headers: {
                'X-Auth-Token': user.token
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            try {
                return resolve(JSON.parse(body));
            } catch (err) {
                return resolve(body);
            }
        });
    });
};