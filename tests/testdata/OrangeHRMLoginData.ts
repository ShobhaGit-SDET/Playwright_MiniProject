export interface OrangeHRMLoginData {
  id: string;
  username: string;
  password: string;
  description: string;
  positive: boolean;
  expectedError?: string;
  expectedRequiredCount?: number;
}

export const loginData: OrangeHRMLoginData[] = [
  {
    id: 'positive-valid-admin',
    username: 'Admin',
    password: 'admin123',
    description: 'Valid credentials should log in successfully and land on the dashboard',
    positive: true,
  },
  {
    id: 'negative-wrong-password',
    username: 'Admin',
    password: 'wrongPass',
    description: 'Valid username with invalid password should show invalid credentials error',
    positive: false,
    expectedError: 'Invalid credentials',
  },
  {
    id: 'negative-wrong-username',
    username: 'wrongUser',
    password: 'admin123',
    description: 'Invalid username with valid password should show invalid credentials error',
    positive: false,
    expectedError: 'Invalid credentials',
  },
  {
    id: 'negative-empty-credentials',
    username: '',
    password: '',
    description: 'Missing username and password should show required field validation',
    positive: false,
    expectedRequiredCount: 2,
  },
  {
    id: 'negative-empty-password',
    username: 'Admin',
    password: '',
    description: 'Valid username with missing password should show required password validation',
    positive: false,
    expectedRequiredCount: 1,
  },
];
