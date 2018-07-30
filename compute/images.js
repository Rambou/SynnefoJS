var request = require('request');
var endpoint = process.env.OKEANOS_COMPUTE || 'https://cyclades.okeanos.grnet.gr/compute/v2.0';

var ImageAPI = function () {};

module.exports = new ImageAPI();

ImageAPI.prototype.List = async (user, detailed = false) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/images' + detailed ? '/detail' : '',
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

ImageAPI.prototype.Getdetails = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/images/' + id,
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

ImageAPI.prototype.Delete = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/images/' + id,
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

ImageAPI.prototype.ListMetadata = async (user, id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/images/' + id + '/metadata',
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

ImageAPI.prototype.UpdateMetadata = async (user, id, metadata) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/images/' + id + '/metadata',
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'metadata': metadata
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};

ImageAPI.prototype.GetImageMetadata = async (user, id, key) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/images/' + id + '/metadata/' + key,
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

ImageAPI.prototype.UpdateImageMetadata = async (user, id, key, metadata) => {
    return new Promise(resolve => {
        request({
            method: 'PUT',
            url: endpoint + '/images/' + id + '/metadata/' + key,
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'metadata': metadata
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};

ImageAPI.prototype.DeleteImageMetadata = async (user, id, key) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/images/' + id + '/metadata/' + key,
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