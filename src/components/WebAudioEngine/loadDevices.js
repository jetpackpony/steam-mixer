import { needToRequestAudioPermissions } from '../../store/reducers/webAudioDevices/handlers';

export const loadDevices = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.enumerateDevices()
      .then((list) => {
        if (needToRequestAudioPermissions(list)) {
          reject();
        } else {
          resolve(list);
        }
      });
  });
};