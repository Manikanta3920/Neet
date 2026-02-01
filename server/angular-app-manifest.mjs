
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
    'index.html': {size: 37199, hash: '2d00e01948e964668dd47f665ad961b77f4cf84a22d2f900d3ce96a32f4455c4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'progress/index.html': {size: 33346, hash: '870d4eac8f0fa3b624bf774c05a50a52be01ce817daf7e208c3bffb2e937760d', text: () => import('./assets-chunks/progress_index_html.mjs').then(m => m.default)},
    'timer/index.html': {size: 30088, hash: 'b23e6ee4d16c4b223653245c6db41bcbf8454d120724faf313c02cfa002b1b2c', text: () => import('./assets-chunks/timer_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
