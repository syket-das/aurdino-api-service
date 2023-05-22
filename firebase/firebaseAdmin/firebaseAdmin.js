import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const serviceAccount = {
  type: 'service_account',
  project_id: 'lpu-lms',
  private_key_id: 'b074beb001135664777551f2c70f45612e9477c0',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDguSvZ8ODP9uEk\ncEuOSKA/9rybIRCZxGj3lSYpTDPaxoyQYAPuY0i5JU8G1lZc4pNS/3TIsAwu0Htv\n0+SuYIXRf4gzUvPqzQUkdIbVpmpGrLJAbicS4N/R4uhEHYC8NV0VIYDByzaqIfW0\nzkaE5dsp4jri2yi1RODvj+00DpMGXiX1is2gpLrvj0wL6khxdlJxpO10Ry6lZ+Ts\nJnhXjpsWwfmYtvJhrJB9YqKRSFZZKh3udV+87NTGMkOr3O3Ru2OYagZw/ZOA4I5c\n3TRvyDAwndK+Wnsc6lUOK0k0Zvv6uqAII315mH7xH2gb3Q/DzlOoIX0W1ZX7+tOd\nXJcMP1SZAgMBAAECggEAAl/1QULHqW2h5aKZ1c7ZggY06jca/Q5Y5Uw/oJOZf7Ag\nolJKxa0/F+p3mj+lHtWrz2Z7i4xlZeWWTFv9pcRyMut+sGYpxZCK7klHTIDgoiRn\nPNbn1aNSkjNW7N4FSIKQMYM5YF2UqLnI+4hrhoeEUv4STRKaV0dl+3ohUa8ZaX7g\n+gfT5P8zQvAK9xC6k5FPJdnYjWrnYTwcXlU41+WWvxHQ4fh19fsXa51RO7ZRSH0g\n1BlyPNVXy3O6ixTkD3lZHUYUR8xNtXoKp9DtB+WxO6vldSBp3AD+eHIR7mnHnb2J\nLAfPGdhemOAFQ5TKilhZUseGcXKwgon3AB7k+I7adQKBgQDznMoXo1lkyX9cs0Io\nxwZgt5Nz4wOK8bRi4AZRvHn34QNMQagFXXR7pI1KFpIuegq57BW9yhabZaOcCXZC\nVIREXc+b+WqAdmRk3OP7Y/R9EwVTSdAyVHlmrLNUYoENEK7oMt8EiXLG8DpARwTU\nKJbaPcPUzTCE5bZKS3/6Ew5xRQKBgQDsJn5jz7urmwe/IZJbAU/cWi6mWW90Nvwx\n09i/OCMXtU5TuNJktLqovw5i+Nwq9jn6rD2QSauTrHIx6mFRv+flXhPpcyOBRagR\nhsgWdW2SZFzoqxPailX1JhjaThvD6AyNJaNrPE1aJm5EmBzJAFIeKWXMpQSKFl6U\nr2Low+fpRQKBgHfYbW9dlA/KNRb0tRp8dv3Dsg2z471KFVUDIvi5AUPZ9ZZhQniJ\nNlHRbRTCr92feoFmzHdW4PJH+Uo9OWl+TKeZgxYXiLZ0CAW6yYmV7eROJDOKP5tT\nBXpmgb6EyzoTOAjRZffEaqvF6NJQXebFpRjug9W/sBvhKmG4bNgo4dUFAoGACBmp\n7DKL9W7z7RJxur1ox94wC3S15f6c1/i0TprWWVHWxfho/xtT68Xh8HMo2jBn/Lk7\nw19Di2U25Y9slylGAxAfDrrsVNrW0QMWie6tO4BFz5VOsQhdunL8F0DmoumqxIyt\n9lezL4xx69hr5Fkmd/Jjk4l1hmcOB3ucoO9XXSECgYEAr/sqG6lMNlNtP84tFvzw\nx7J5v2vkE+aK5xnEEKAv9galuFZxdSBF40iMmuflKo0wzcZT+DFefl9vIyjUezPu\n5bPp8M+58oQa/4eClkSWORlBjeUxi4aOgj7cVA5d/YlW8LA7qAsIHlqY+IMQAPSu\nhPrSfvD+bWXvQkLs03Z/Bnk=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-eumhr@lpu-lms.iam.gserviceaccount.com',
  client_id: '104809398307697336901',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eumhr%40lpu-lms.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDB = admin.firestore();

export { adminDB };
