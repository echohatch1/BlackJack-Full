/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["android-chrome-192x192.png","8e1ecff400fd6e64ce8cb69e99146cab"],["android-chrome-512x512.png","e15f5e6f82441bee58928d10eb50c250"],["apple-touch-icon-114x114.png","302344c04689c7cfe7470d57dab50f7a"],["apple-touch-icon-120x120.png","2d81d6356380b1b69f8ec1bebf8da037"],["apple-touch-icon-144x144.png","a487ca62d9296ccfebb5778300f1bf9d"],["apple-touch-icon-152x152.png","c1da3742e7cad270a1b1b95bc4b91554"],["apple-touch-icon-180x180.png","29aa2a77fa9335b4f014e4a20b308f9c"],["apple-touch-icon-57x57.png","538c9a9b43186a47598fd8d3e446cb96"],["apple-touch-icon-60x60.png","d61b5b17449cd92497387425630f1f52"],["apple-touch-icon-72x72.png","35232e8d76cc7619972495e312be1531"],["apple-touch-icon-76x76.png","3b5c24d15b9333b0ceaf82500b0ef7b7"],["apple-touch-icon.png","29aa2a77fa9335b4f014e4a20b308f9c"],["blackJackV2.0.js","df7f42893ee40c25e1b85ddc71fd2613"],["browserconfig.xml","e4e40b0c82d228add33b5bcfe276a859"],["favicon-16x16.png","9b2c6bfea4840c8cf62925be0327a090"],["favicon-32x32.png","1793087260909bd8c6b466319be62107"],["favicon.ico","0b944dd2093a5632b64c09a99aea0d46"],["fonts/Montserrat-Regular.ttf","ee6539921d713482b8ccd4d0d23961bb"],["fonts/RozhaOne-Regular.ttf","ab17699bdea8472d844a3f6600c22d6c"],["images/blackjack-felt.jpg","d6736136288394b93d6d0d47c4b7f139"],["images/cards/10C.png","6cf984a4629e525008b2e0e0c96bdf7f"],["images/cards/10D.png","899c437be3afa7ca86eb9d809be105ad"],["images/cards/10H.png","6293832fc242de49811f9902837514d9"],["images/cards/10S.png","6f9da024a9523bd3edd0dfb810a7a14b"],["images/cards/2C.png","25879386e28eebb725d0e297051de0b5"],["images/cards/2D.png","4c9dd2bfa21540ed9482f84a4041064f"],["images/cards/2H.png","ead8ef7cec6d1c945de29b0f365c5579"],["images/cards/2S.png","7ef80934a745f9b5724b09c8d295aeb7"],["images/cards/3C.png","feb3671f890a67c4954122f29a410715"],["images/cards/3D.png","07610397d1d207538b8cd47d32ca9557"],["images/cards/3H.png","7c08a65b0f668bf88fe2339282a025f6"],["images/cards/3S.png","ddd98df307c17f2f48556508923b9a0e"],["images/cards/4C.png","e1cb47cad270ffc2e48f48581de66a02"],["images/cards/4D.png","5df3441048618e623eb981a983a7e453"],["images/cards/4H.png","0c1cc8ebde00526f4fb4a660f51e6291"],["images/cards/4S.png","5e138b146928e56b9457f90659e6509b"],["images/cards/5C.png","c140fc135196050732a08d1edd4fabdb"],["images/cards/5D.png","f43e70050024811d5c82cefb82d0a1e0"],["images/cards/5H.png","968047fa99de1d56f73e818ecaeb0967"],["images/cards/5S.png","795451ac15a3dd7423548f1b7523bdd7"],["images/cards/6C.png","0d357b8bee3b6ae206ed0cfd30aafad2"],["images/cards/6D.png","16f9d55c908bfbd8a15c319861aa0b6b"],["images/cards/6H.png","cd91ba82ded328ac03521f3163e69fef"],["images/cards/6S.png","c2b8f731187dd7fb1ccb173550eab513"],["images/cards/7C.png","bebf8060c90859b6140de307e311ac38"],["images/cards/7D.png","b858efcca40b50199674a2e3204ef88e"],["images/cards/7H.png","4c358322ad0fdb271e2ecaa9a85b6322"],["images/cards/7S.png","add91391a9c8237dbf10f31ea56ab4e2"],["images/cards/8C.png","7b08d9ae68568ca95b628a4a5dbba254"],["images/cards/8D.png","80f00788695454f7ed199cd122efa0aa"],["images/cards/8H.png","d708f1b1e86f2fcd8c5fede360d3c433"],["images/cards/8S.png","3198281d3af55299eb83843432d8a6c5"],["images/cards/9C.png","a45c9a7db93a5a5d06c094e1a4faaa65"],["images/cards/9D.png","a1c9e2438c3be1ccd96fd1a861b36b9e"],["images/cards/9H.png","a71848f4812d503e68b5e758745e2f94"],["images/cards/9S.png","476a991bdd4101f221355c7912c222c9"],["images/cards/AC.png","2c83458c4661dab099c70eb9d0103346"],["images/cards/AD.png","535cd0a206918f7230fe806071167dda"],["images/cards/AH.png","0cca68951838f48d21a9282f7071cc17"],["images/cards/AS.png","b2b1a0d1c0a35b09dce84174cb6f65f6"],["images/cards/JC.png","fd348030ad0103c961b18aeb7fb4d76c"],["images/cards/JD.png","45b1ed8cb836129fa7b47f7411d1748e"],["images/cards/JH.png","ff02b53adf3db588a50c13649c4064db"],["images/cards/JS.png","a56b46939911d6d1e9d581a04171d726"],["images/cards/KC.png","9a43eddf353d7c5910dcfbf07afcc86d"],["images/cards/KD.png","9c6098d0b560853bb4c29ababdde2daa"],["images/cards/KH.png","338d2c369c352dbd3aa1d074a2fb18d6"],["images/cards/KS.png","f46a714d8d28fa694338c15a900190e2"],["images/cards/QC.png","5f26c7df3ddd0b95ba799054aecc0c40"],["images/cards/QD.png","25fe578de6a0498ef2e7aeeb57f7c21d"],["images/cards/QH.png","6c6f599a7e34e947e8a747754f596b5c"],["images/cards/QS.png","22898594d4b5249b69c1beac40d2f875"],["images/cards/aces.png","6e57a90b47fcba5a21040bdbfa80c0c2"],["images/cards/back_cards-07.png","21dca3f662b194c04f145153d78f2c08"],["images/cards/blue_back.png","2df21903a294d5bd4b860bce903474fb"],["images/cards/gray_back.png","085ff70a721ce09c1e7981c2183a57be"],["images/cards/green_back.png","e0967c9e24c1a02bde19faa12cdca76e"],["images/cards/honor_clubs.png","da17ff41467dcc00b9958bbb86d79fd6"],["images/cards/honor_diamond.png","4b54677514a6410c0dac53ef540027bc"],["images/cards/honor_heart-14.png","a10ee0d7dedc8a97a9c491d987cc1750"],["images/cards/honors_spade-14.png","276f86e390c34fd0988b993647805759"],["images/cards/purple_back.png","f0b16a1542003869345ee66e695c2782"],["images/cards/red_back.png","3b530be3a31cfdd4b1df61b74a1c123b"],["images/cards/yellow_back.png","e488299578cd241f7147c318707189c1"],["images/chip.png","afaecb2b6e0847ec540d361610578bd5"],["index.html","17d8231a2152116e7cbcb1502167b764"],["maskable_icon_x1.png","9111905f3f79974f6200d001d2638650"],["mstile-150x150.png","4d2acbc03a424f1d675d36b39057ab92"],["safari-pinned-tab.svg","cdfdf02d8942d6c178fbc6cf1b693522"],["site.webmanifest","dd78faf8b3472db19e301b5aa72e5019"],["styles.css","8f1e1579253cd6b29577bee2a1576c18"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







