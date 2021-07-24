import getBundle from './cm3-download-bundle';

const cm3NsiDownloadPlugin={
    pluginName: 'NSI Download Plugin',
    enabled: true,
    bundle: getBundle,
    components:[]
  }


export {cm3NsiDownloadPlugin as default}