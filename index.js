var Compute = function () {};

module.exports.Compute = new Compute();

Compute.prototype.Flavors = require('./compute/flavors');
Compute.prototype.FloatingIP = require('./compute/floating_ip');
Compute.prototype.Images = require('./compute/images');
Compute.prototype.Keypairs = require('./compute/keypairs');
Compute.prototype.Servers = require('./compute/servers');