import { get } from 'lodash';

export default function exportData(state) {
  return {
    fraSluttbrukersystem: 'katteveiviser',
    eiendomByggested: {
      etasje: parseInt(get(state, 'living.floor'), 10),
    },
    ansvarsrett: {
      noeGreier: 'her',
    },
  };
}
