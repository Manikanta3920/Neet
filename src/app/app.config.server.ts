import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Remove or comment out mergeApplicationConfig
// export const config = mergeApplicationConfig(appConfig, serverConfig);

// Instead, just export appConfig without SSR
export const config = appConfig;