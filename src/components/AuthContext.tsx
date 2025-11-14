import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sahaaya_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate API call - In production, this will use Supabase
      // Hash password (in production, done server-side)
      const hashedPassword = btoa(userData.password); // Simple encoding for demo
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('sahaaya_users') || '[]');
      const userExists = existingUsers.some((u: any) => u.email === userData.email);
      
      if (userExists) {
        return false;
      }

      // Create user profile
      const newUser: UserProfile = {
        id: crypto.randomUUID(),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        bloodGroup: userData.bloodGroup,
        emergencyContactName: userData.emergencyContactName,
        emergencyContactPhone: userData.emergencyContactPhone,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials
      const userWithPassword = {
        ...newUser,
        password: hashedPassword,
      };
      
      existingUsers.push(userWithPassword);
      localStorage.setItem('sahaaya_users', JSON.stringify(existingUsers));
      
      // Set current user
      localStorage.setItem('sahaaya_user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - In production, this will use Supabase
      const existingUsers = JSON.parse(localStorage.getItem('sahaaya_users') || '[]');
      const hashedPassword = btoa(password);
      
      const foundUser = existingUsers.find(
        (u: any) => u.email === email && u.password === hashedPassword
      );

      if (!foundUser) {
        return false;
      }

      // Remove password from user object
      const { password: _, ...userProfile } = foundUser;
      
      localStorage.setItem('sahaaya_user', JSON.stringify(userProfile));
      setUser(userProfile);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('sahaaya_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
