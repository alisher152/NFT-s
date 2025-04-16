import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: {
    id: string;
    name: string;
    avatar: string;
    description: string;
  } | null = null;

  private users = [
    {
      id: 'user1',
      name: 'KKSpecial',
      avatar: 'assets/avatar1.jpg',
      description:
        'Digital artist & NFT collector. Passionate about the metaverse.',
    },
    {
      id: 'user2',
      name: 'Anonymous-User-9de72',
      avatar: 'assets/default-avatar.jpg',
      description: 'A mysterious creator of unique NFTs.',
    },
    // добавляй сюда других пользователей
  ];

  setUser(user: {
    id: string;
    name: string;
    avatar: string;
    description: string;
  }) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) this.currentUser = JSON.parse(user);
    }
    return this.currentUser;
  }

  getAllUsers() {
    return this.users;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
