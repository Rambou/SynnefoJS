var request = require('request');
var endpoint = process.env.OKEANOS_COMPUTE || 'https://cyclades.okeanos.grnet.gr/compute/v2.0';

var ServerAPI = function () {};

module.exports = new ServerAPI();

ServerAPI.prototype.List = async (user, detailed = false) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers' + (detailed ? '/detail' : ''),
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

ServerAPI.prototype.Create = async (user, server) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/servers',
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'server': server
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

ServerAPI.prototype.GetStats = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/stats',
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

ServerAPI.prototype.GetDiagnostics = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/diagnostics',
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

ServerAPI.prototype.GetDetails = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id,
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

ServerAPI.prototype.Rename = async (user, server_id, server) => {
    return new Promise(resolve => {
        request({
            method: 'PUT',
            url: endpoint + '/servers/' + server_id,
            headers: {
                'X-Auth-Token': user.token
            },
            json: {
                'server': server
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};

ServerAPI.prototype.Delete = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/servers/' + server_id,
            headers: {
                'X-Auth-Token': user.token
            }
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(body);
        });
    });
};

ServerAPI.prototype.ListConnections = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/ips',
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

ServerAPI.prototype.GetConnection = async (user, server_id, network_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/ips' + network_id,
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

ServerAPI.prototype.ListMetadata = async (user, server_id) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/metadata',
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

ServerAPI.prototype.UpdateMetadata = async (user, server_id, metadata) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/servers/' + server_id,
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

ServerAPI.prototype.GetMetaItem = async (user, server_id, key) => {
    return new Promise(resolve => {
        request({
            method: 'GET',
            url: endpoint + '/servers/' + server_id + '/metadata' + key,
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

ServerAPI.prototype.UpdateMetaItem = async (user, server_id, key) => {
    return new Promise(resolve => {
        request({
            method: 'PUT',
            url: endpoint + '/servers/' + server_id + '/metadata' + key,
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

ServerAPI.prototype.DeleteMetaItem = async (user, server_id, key) => {
    return new Promise(resolve => {
        request({
            method: 'DELETE',
            url: endpoint + '/servers/' + server_id + '/metadata' + key,
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

ServerAPI.prototype.Actions = async (user, server_id, action) => {
    return new Promise(resolve => {
        request({
            method: 'POST',
            url: endpoint + '/servers/' + server_id + '/action',
            headers: {
                'X-Auth-Token': user.token
            },
            json: action
        }, function (error, res, body) {
            if (error) {
                throw new Error(error);
            }

            return resolve(JSON.parse(body));
        });
    });
};