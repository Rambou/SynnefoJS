var request = require('request');
var endpoint = process.env.OKEANOS_COMPUTE || 'https://cyclades.okeanos.grnet.gr/compute/v2.0';

var FloatingIP_API = function () {};

module.exports = new FloatingIP_API();

FloatingIP_API.prototype.List = async (user) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/os-floating-ips',
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

FloatingIP_API.prototype.Getdetails = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/os-floating-ips/' + id,
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

FloatingIP_API.prototype.Create = async (user, floating_ip) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/os-floating-ips',
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'floating_ip': floating_ip
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};

FloatingIP_API.prototype.Delete = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/os-floating-ips/' + id,
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