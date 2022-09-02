import {
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache';

import routesBundle from './routes-bundle';
import downloadBundle from '../cm-plugins/download/cm3-download-bundle';

export default composeBundles(
  routesBundle,
  downloadBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);
