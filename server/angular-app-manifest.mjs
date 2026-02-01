
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
    'timer/index.html': {size: 30081, hash: '95c35594982a549226092073ea8e3aa271a5eaa176002c8648eb616c109a6d36', text: () => import('./assets-chunks/timer_index_html.mjs').then(m => m.default)},
    'index.html': {size: 37195, hash: '28c17f07840c3b2ff56a4111467c06386792e8be0fab40359cb8c72902ffb5d3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'progress/index.html': {size: 33343, hash: '05d4ce982cd647ddfa1719cb2717bb3542baca89545d8b8839b305b522d3cfcc', text: () => import('./assets-chunks/progress_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
