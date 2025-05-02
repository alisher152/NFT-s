import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './nft-profile.component.html',
  styleUrls: ['./nft-profile.component.css'],
  standalone: false,
})
export class NftProfileComponent implements OnInit {
  userId!: string;
  user: any;
  currentUser: any;
  userNFTs: any[] = [];
  userCollection: any[] = [];
  isLoading = true;
  isAuthor = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUser = localStorage.getItem('userProfile');

    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      console.log('Текущий пользователь из localStorage:', this.currentUser);
    } else {
      console.log('Текущий пользователь не найден в localStorage');
    }

    if (id) {
      this.userId = id;
      this.loadUserData();
    } else {
      console.error('ID пользователя не найден в маршруте');
      this.isLoading = false;
    }
  }

  async loadUserData() {
    try {
      // Загружаем данные пользователя из localStorage
      const profile = localStorage.getItem('userProfile');
      if (profile) {
        this.user = JSON.parse(profile);
        // Проверяем, является ли текущий пользователь автором профиля
        this.isAuthor = this.currentUser?.id === this.userId;
      } else {
        this.user = {
          username: 'Неизвестный',
          avatar: 'assets/default-avatar.jpg',
          walletAddress: '0x0000...',
          bio: '',
          followers: 0,
          following: 0,
        };
      }

      // Заглушка для NFT и коллекции (заменится бэкендом)
      this.userNFTs = [
        { title: 'NFT 1', image: 'assets/nft1.jpg', price: 0.5 },
        { title: 'NFT 2', image: 'assets/nft2.jpg', price: 0.8 },
      ];
      this.userCollection = [
        { title: 'NFT A', image: 'assets/nftA.jpg', price: 1.2 },
        { title: 'NFT B', image: 'assets/nftB.jpg', price: 0.9 },
      ];

      this.isLoading = false;
    } catch (error) {
      console.error('Ошибка загрузки данных профиля:', error);
      this.isLoading = false;
    }
  }

  getCollectionValue(): number {
    return this.userCollection.reduce((sum, nft) => sum + (nft.price || 0), 0);
  }

  navigateToCreateNFT(): void {
    this.router.navigate(['/create-nft']);
  }

  // Обработка загрузки аватара
  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string; // Обновляем аватар
        // Обновляем данные в localStorage
        const updatedProfile = { ...this.user, avatar: this.user.avatar };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  }
}
