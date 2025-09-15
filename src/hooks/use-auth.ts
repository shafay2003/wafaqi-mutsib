"use client";

// This is a mock authentication hook.
// In a real application, this would involve context providers,
// session management, and actual authentication logic.

type UserRole = 'Administrator' | 'Editor' | 'Viewer';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

// You can change the role here to test the RBAC functionality.
// Try changing it to "Editor" or "Viewer" to see how the navigation changes.
const mockUser: User = {
  id: 'user-1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator', 
};

export const useAuth = () => {
  // In a real app, you would get the user from a context or session.
  const user = mockUser;

  return { user };
};
