import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "futebol-e9b81.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "futebol-e9b81",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "futebol-e9b81.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "266352859586",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

export class FirebaseClientConfigError extends Error {
  constructor(missingKeys: string[]) {
    super(`Firebase client config missing: ${missingKeys.join(", ")}`);
    this.name = "FirebaseClientConfigError";
  }
}

export function isFirebaseClientConfigError(
  error: unknown,
): error is FirebaseClientConfigError {
  return error instanceof FirebaseClientConfigError;
}

export function getFirebaseClientApp(): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export function assertFirebaseClientConfig(): void {
  const missingKeys = [
    ["NEXT_PUBLIC_FIREBASE_API_KEY", firebaseConfig.apiKey],
    ["NEXT_PUBLIC_FIREBASE_DATABASE_URL", firebaseConfig.databaseURL],
    ["NEXT_PUBLIC_FIREBASE_APP_ID", firebaseConfig.appId],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new FirebaseClientConfigError(missingKeys);
  }
}
