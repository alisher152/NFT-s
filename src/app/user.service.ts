import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  description: string;
  password?: string; // Только для демонстрации - в реальном приложении храните хэш
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
      password: 'temp123', // В реальном приложении не храните пароли в чистом виде
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

  constructor() {
    this.initializeUsers();
    const initialUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private initializeUsers(): void {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.defaultUsers));
    }
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  setUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAllUsers(): User[] {
    const usersData = localStorage.getItem(this.USERS_KEY);
    return usersData ? JSON.parse(usersData) : [...this.defaultUsers];
  }

  register(userData: Omit<User, 'id'> & { password: string }): {
    success: boolean;
    message: string;
  } {
    const users = this.getAllUsers();

    // Проверка на существующего пользователя
    if (users.some((u) => u.name === userData.name)) {
      return { success: false, message: 'Username already exists' };
    }

    if (userData.email && users.some((u) => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      ...userData,
      id: `user${Date.now()}`,
      avatar: userData.avatar || 'assets/default-avatar.jpg',
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  }

  login(credentials: { username: string; password: string }): {
    success: boolean;
    user?: User;
    message: string;
  } {
    const users = this.getAllUsers();
    const user = users.find(
      (u) =>
        (u.name === credentials.username || u.email === credentials.username) &&
        u.password === credentials.password // В реальном приложении сравнивайте хэши
    );

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    this.setUser(user);
    return { success: true, user, message: 'Login successful' };
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  updateUser(updatedUser: Partial<User>): boolean {
    const currentUser = this.getUser();
    if (!currentUser) return false;

    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === currentUser.id);

    if (userIndex === -1) return false;

    const mergedUser = { ...users[userIndex], ...updatedUser };
    users[userIndex] = mergedUser;

    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    this.setUser(mergedUser);

    return true;
  }

  deleteAccount(userId: string): boolean {
    const users = this.getAllUsers();
    const updatedUsers = users.filter((u) => u.id !== userId);

    localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));

    if (this.getUser()?.id === userId) {
      this.logout();
    }

    return users.length !== updatedUsers.length;
  }
}
