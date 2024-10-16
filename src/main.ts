import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';  // Correctly importing the app config
import { AppComponent } from './app/app.component';  // Correctly importing the AppComponent

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
