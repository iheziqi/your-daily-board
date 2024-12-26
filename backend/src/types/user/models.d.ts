/**
 * users table
 */
interface DUser {
  id?: number;
  email: string;
  admin?: number;
  is_verified?: number;
}

/**
 * users_verifying table
 */
interface DUserVerifying {
  email: string;
  token: string;
}

/**
 * users_authentication table
 */
interface DUserAuthentication {
  email: string;
  authentication_code: number;
  expiration_timestamp: number;
}
