import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache';

import routesBundle from './routes-bundle';
import authBundle from './auth-bundle';

export default composeBundles(
  routesBundle,
  authBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);