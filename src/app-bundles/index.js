import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache';

import routesBundle from './routes-bundle';
import authBundle from './auth-bundle';
import downloadBundle from '../cm-plugins/download/cm3-download-bundle';

export default composeBundles(
  routesBundle,
  authBundle,
  downloadBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);