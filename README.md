# SynnefoJS
A Synnefo SDK for NodeJS. This module could be used to e.x. Create server at Okeanos Cloud.

Below there's an example usage.
```
var Synnefo = require('./index');
const fs = require('fs');

const userList = [{
    "name": "user1",
    "username": "username1",
    "password": "password",
    "organization": "aegean",
    "token": "mytoken",
    "api_username": "cloudstack_api_username",
    "api_password": "cloudstack_api_password"
}, {
    "name": "user2",
    "username": "username2",
    "password": "password",
    "organization": "aegean",
    "token": "mytoken",
    "api_username": "cloudstack_api_username",
    "api_password": "cloudstack_api_password"
}];
var tokens = [];

(async function Create_Cluster() {
    // for each user
    for (let user of userList) {
        // retrieve Floating IPs
        var ips = await Synnefo.Compute.FloatingIP.List(user);

        // Get floating_network_id
        var network_id = await Synnefo.Compute.FloatingIP.Getdetails(user, ips.floating_ips[0].id);

        // list all keys
        var keyList = await Synnefo.Compute.Keypairs.List(user);

        // list all servers
        var list = await Synnefo.Compute.Servers.List(user, true);

        // delete keys if exist
        if (keyList.keypairs.length > 0) {
            for (let key of keyList.keypairs) {
                await Synnefo.Compute.Keypairs.Delete(user, key.keypair.name);
                console.log('Key ' + key.keypair.name + ' deleted!');
            }
        }

        // Import key
        await Synnefo.Compute.Keypairs.CreateOrImport(user, {
            name: 'Mykey',
            public_key: 'ssh-rsa A661f23f2A222f230BmTXaFCf2252BFH hostuser@testKey'
        }).then(res => {
            console.log(res);
        });

        // if server's exist then delete them
        if (list.servers.length > 0) {
            // for each server
            for (let server of list.servers) {
                await Synnefo.Compute.Servers.Delete(user, server.id).then(res => {
                    console.log(res)
                });
            }
            console.log('user ' + user.name + ' has servers!');
        }

        // create Server
        var res = await Synnefo.Compute.Servers.Create(user, {
            name: 'Rancher Node',
            imageRef: 'ccfb0b8b-3f40-4f1d-b78c-b5c59e59e5ad',
            project: '2f2f23f32f2-922f-23f26bb',
            flavorRef: 9,
            metadata: {
                OS: 'ubuntu',
                users: 'user'
            },
            'SNF:key_names': ['MyKey'],
            networks: [{
                uuid: network_id.floatingip.floating_network_id,
                'fixed_ip': ips.floating_ips[0].ip
            }]
        });

        await tokens.push({
            IP: ips.floating_ips[0].ip,
            Password: res.server.adminPass
        });

        await fs.writeFile(
            process.env.CREDENTIALS_FILE || './credentials.json',
            JSON.stringify(tokens),

            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        );

    }

})();
```
