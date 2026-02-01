
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/For-her/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-LV4GI5RC.js",
      "chunk-JGNLAZXI.js"
    ],
    "route": "/For-her"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H2LCCMYD.js"
    ],
    "route": "/For-her/progress"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GT4H4WHH.js",
      "chunk-JGNLAZXI.js"
    ],
    "route": "/For-her/timer"
  },
  {
    "renderMode": 2,
    "redirectTo": "/For-her",
    "route": "/For-her/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 592, hash: '13e059437f879f1cbb293f6b1e5b06737de477e78bfd95eda05fe6c33e41f5e4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1105, hash: 'e1365eecfed9884d1c62a0d779f1a445b09c3b4110f053ae2675c4785226b0c9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 37197, hash: '2bc00c051e40d95350820621ebdba96c93af6196f0080221d30ea42592c9eae9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'progress/index.html': {size: 33328, hash: 'ed114cd75f51e02bdefe093721aa8398e7f1c3e2074f82a9bf61f660cffbfd72', text: () => import('./assets-chunks/progress_index_html.mjs').then(m => m.default)},
    'timer/index.html': {size: 30081, hash: '95c35594982a549226092073ea8e3aa271a5eaa176002c8648eb616c109a6d36', text: () => import('./assets-chunks/timer_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
