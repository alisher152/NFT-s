import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth service';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  description: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly CURRENT_USER_KEY = 'currentUser';
  private readonly USERS_KEY = 'nftUsers';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private defaultUsers: User[] = [
    {
      id: 'user1',
      name: 'KKSpecial',
      email: 'kkspecial@example.com',
      avatar: 'assets/avatar1.jpg',
      description:
        'Digital artist & NFT collector. Passionate about the metaverse.',
      password: 'temp123',
    },
    {
      id: 'user2',
      name: 'Anonymous-User-9de72',
      email: 'anonymous@example.com',
      avatar: 'assets/default-avatar.jpg',
      description: 'A mysterious creator of unique NFTs.',
      password: 'temp123',
    },
  ];

  constructor(private authService: AuthService) {
    this.initializeUsers();
    const initialUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private initializeUsers(): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.defaultUsers));
      console.log('UserService: Initialized default users in localStorage');
    }
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!userData) {
      console.warn('UserService: No current user in localStorage');
      return null;
    }
    try {
      const user = JSON.parse(userData);
      console.log('UserService: Loaded current user from localStorage:', user);
      return user;
    } catch (error) {
      console.error(
        'UserService: Error parsing current user from localStorage:',
        error
      );
      return null;
    }
  }

  setUser(user: User): void {
    if (!user || !user.id) {
      console.error('UserService: Invalid user data:', user);
      return;
    }
    this.currentUserSubject.next(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    // Генерируем и сохраняем токен для AuthService
    const fakeToken = `fake-token-${user.id}-${Date.now()}`;
    this.authService.login(fakeToken);
    console.log(
      'UserService: Set current user and generated token:',
      user,
      fakeToken
    );
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAllUsers(): User[] {
    const usersData = localStorage.getItem(this.USERS_KEY);
    if (!usersData) {
      console.warn(
        'UserService: No users found in localStorage, returning default users'
      );
      return [...this.defaultUsers];
    }
    try {
      const users = JSON.parse(usersData);
      console.log('UserService: Retrieved all users:', users);
      return users;
    } catch (error) {
      console.error(
        'UserService: Error parsing users from localStorage:',
        error
      );
      return [...this.defaultUsers];
    }
  }

  getUserById(id: string): User | undefined {
    if (!id) {
      console.error('UserService: Invalid user ID:', id);
      return undefined;
    }
    const user = this.getAllUsers().find((u) => u.id === id);
    if (!user) {
      console.warn('UserService: User not found for ID:', id);
    }
    return user;
  }

  register(userData: Omit<User, 'id'> & { password: string }): {
    success: boolean;
    message: string;
  } {
    if (!userData.name || !userData.password) {
      console.error(
        'UserService: Missing required fields for registration:',
        userData
      );
      return { success: false, message: 'Username and password are required' };
    }

    const users = this.getAllUsers();

    if (users.some((u) => u.name === userData.name)) {
      console.warn('UserService: Username already exists:', userData.name);
      return { success: false, message: 'Username already exists' };
    }

    if (userData.email && users.some((u) => u.email === userData.email)) {
      console.warn('UserService: Email already registered:', userData.email);
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      ...userData,
      id: `user${Date.now()}`,
      avatar: userData.avatar || 'assets/default-avatar.jpg',
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    console.log('UserService: User registered successfully:', newUser);
    return { success: true, message: 'Registration successful' };
  }

  login(credentials: { username: string; password: string }): {
    success: boolean;
    user?: User;
    message: string;
  } {
    if (!credentials.username || !credentials.password) {
      console.error('UserService: Missing credentials for login:', credentials);
      return { success: false, message: 'Username and password are required' };
    }

    const users = this.getAllUsers();
    const user = users.find(
      (u) =>
        (u.name === credentials.username || u.email === credentials.username) &&
        u.password === credentials.password
    );

    if (!user) {
      console.warn('UserService: Invalid login credentials:', credentials);
      return { success: false, message: 'Invalid credentials' };
    }

    this.setUser(user);
    return { success: true, user, message: 'Login successful' };
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.authService.logout();
    console.log('UserService: User logged out');
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.currentUserSubject.value;
    console.log('UserService: Authentication status:', isAuth);
    return isAuth;
  }

  updateUser(updatedUser: Partial<User>): boolean {
    const currentUser = this.getUser();
    if (!currentUser) {
      console.error('UserService: No current user to update');
      return false;
    }

    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === currentUser.id);

    if (userIndex === -1) {
      console.error('UserService: Current user not found in users list');
      return false;
    }

    const mergedUser = { ...users[userIndex], ...updatedUser };
    users[userIndex] = mergedUser;

    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    this.setUser(mergedUser);
    console.log('UserService: User updated:', mergedUser);
    return true;
  }

  deleteAccount(userId: string): boolean {
    if (!userId) {
      console.error('UserService: Invalid user ID for deletion:', userId);
      return false;
    }

    const users = this.getAllUsers();
    const updatedUsers = users.filter((u) => u.id !== userId);

    if (users.length === updatedUsers.length) {
      console.warn('UserService: User not found for deletion:', userId);
      return false;
    }

    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));
    if (this.getUser()?.id === userId) {
      this.logout();
    }
    console.log('UserService: User account deleted:', userId);
    return true;
  }
}
