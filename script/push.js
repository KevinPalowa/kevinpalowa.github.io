const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPEc9-kCDOxqb5BFjidLuyoFVp_YEn0tZQJHs02WF9q3NoHIt5FlFtjy_opIliJtc1hojGmo9wjYuAIZDOWClI4",
    "privateKey": "ckVgZvnYdldVayHgkAeQwlNH2Ohbq9eosZFEiaNKurs>"
};



webPush.setVapidDetails(
    'mailto:kevinpalowa@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c4sx2r_-ODc:APA91bECDpuq6WTz72ITN6D7CvPwUAZP91aBFRWiTSB88PhDLS_bj615MckG9FlFuapR1m5U6Ox4wGkExRUILankYpPy42vmyG0Hoev0OGpKALGzeKe6vMRr78AhC-XhiHAxJIWphhJj",
    "keys": {
        "p256dh": "BNR+syHa4f5knO/ECZ/rfHDtJt0XHbQWKEUFZNw+gBTXsw0CLR/zwgI7vBIMP8YnnfV0p3Rar9nwRPtV4YtYzC0=",
        "auth": "Y4yYbqSqvlXSM6N72nMviA=="
    }
};
const payload = 'Your favorite team playing!';

const options = {
    gcmAPIKey: '929077644810',
    TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);