import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'

import routesBundle from './routes-bundle';

export default composeBundles(
  routesBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);