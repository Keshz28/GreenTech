import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import your routes (assuming you have them in a separate file)
import { Routes } from '@angular/router';
import { routes } from './app.routes';

// Export the application-wide configuration
export const appConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),  // Setup routes
    provideHttpClient(),  // Setup HTTP client for services
    importProvidersFrom(FormsModule) // Additional providers can be added here if needed
  ]
};

