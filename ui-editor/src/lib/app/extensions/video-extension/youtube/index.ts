import {ExtendedYoutube} from './extend';

export const ConfiguredYoutube = () =>
  ExtendedYoutube.configure({
    controls: false,
    nocookie: false,
  });

export default ConfiguredYoutube;
