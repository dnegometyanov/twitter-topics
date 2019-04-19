import Oauth = require('OAuth');
import https = require('https');

// TODO investigate it https://stackoverflow.com/questions/38434864/typescript-cannot-find-module-http-on-visual-studio-code

var oauth2 = new Oauth.OAuth2('XXX', 'YYY', 'https://api.twitter.com/', null, 'oauth2/token', null);
oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
}, function (e, access_token) {
    console.log(access_token); //string that we can use to authenticate request

    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/statuses/user_timeline.json?screen_name=marcdemesel&count=2',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    };

    https.get(options, function (result) {
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function (data) {
            buffer += data;
        });
        result.on('end', function () {
            var tweets = JSON.parse(buffer);
            console.log(tweets); // the tweets!
        });
    });
});