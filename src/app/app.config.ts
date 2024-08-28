import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { firebaseApp$, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDIjdjHzl6rzqXiTMQ3_17J4G3GLgY8BVs",
  authDomain: "chatterbox-aa1af.firebaseapp.com",
  projectId: "chatterbox-aa1af",
  storageBucket: "chatterbox-aa1af.appspot.com",
  messagingSenderId: "34184236018",
  appId: "1:34184236018:web:754cfe8f6532820875796b",
  measurementId: "G-MXPB4NQ8LY"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideHttpClient(withFetch())]
};
