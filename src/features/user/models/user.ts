/**
 * User model and mock data for the user profile endpoint.
 * In a real application, this would interface with a database or authentication system.
 */

export interface UserProfile {
  email: string;
  name: string;
  stack: string;
}

/**
 * Returns mock user profile data.
 * In a real application, this would fetch data from a database or authentication middleware.
 */
export function getUserProfileData(): UserProfile {
  return {
    email: "theayokayzy1@gmail.com",
    name: "Ola-Akande Ayokunle",
    stack: "Nodejs/Express/TypeScript",
  };
}
