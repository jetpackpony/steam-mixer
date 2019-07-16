const R = require('ramda');

const isAudioDevice = device => device.kind === "audioinput" || device.kind === "audiooutput";
const isDefaultDevice = device => device.deviceId !== "default";
const filterAudioDefault = R.compose(R.filter(isAudioDevice), R.filter(isDefaultDevice));
const breakIntoCategories = R.reduce((res, el) => {
    el.kind === "audioinput"
        ? res.inputs.push(el)
        : el.kind === "audiooutput"
            ? res.outputs.push(el)
            : null;
    return res;
}, { inputs: [], outputs: []});

const getAudioDevices = () =>
    navigator.mediaDevices.enumerateDevices()
        .then(filterAudioDefault)
        .then(breakIntoCategories);


module.exports = getAudioDevices;