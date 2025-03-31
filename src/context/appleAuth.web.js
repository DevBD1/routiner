export const appleAuth = {
  performRequest: () => {
    throw new Error('Apple Sign In is not available on web platform');
  },
  Operation: {
    LOGIN: 'LOGIN'
  },
  Scope: {
    EMAIL: 'email',
    FULL_NAME: 'fullName'
  }
}; 