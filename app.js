const getAudioDevices = require('./getAudioDevices');

(async () => {
    console.log(await getAudioDevices());
})();