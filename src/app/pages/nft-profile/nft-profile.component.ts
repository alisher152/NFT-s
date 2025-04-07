import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './nft-profile.component.html',
  styleUrls: ['./nft-profile.component.css'],
  standalone: false,
})
export class NftProfileComponent implements OnInit {
  defaultAvatarUrl: string = 'assets/default-avatar.jpg';
  customAvatarUrl: string | null = null;
  isEditing = false;
  name = 'Летучий Феникс';
  about = '';
  selectedFileName: string | null = null;
  private usedNames: Set<string> = new Set();

  // Полные словари для генерации имен
  private firstNames = [
    'Александр',
    'Алексей',
    'Анатолий',
    'Андрей',
    'Антон',
    'Аркадий',
    'Арсений',
    'Артем',
    'Богдан',
    'Борис',
    'Вадим',
    'Валентин',
    'Валерий',
    'Василий',
    'Виктор',
    'Виталий',
    'Владимир',
    'Владислав',
    'Всеволод',
    'Вячеслав',
    'Геннадий',
    'Георгий',
    'Герман',
    'Глеб',
    'Григорий',
    'Даниил',
    'Денис',
    'Дмитрий',
    'Евгений',
    'Егор',
    'Иван',
    'Игорь',
    'Илья',
    'Кирилл',
    'Константин',
    'Лев',
    'Леонид',
    'Максим',
    'Марат',
    'Марк',
    'Матвей',
    'Михаил',
    'Никита',
    'Николай',
    'Олег',
    'Павел',
    'Петр',
    'Роман',
    'Руслан',
    'Семен',
    'Сергей',
    'Станислав',
    'Степан',
    'Тарас',
    'Тимофей',
    'Тимур',
    'Федор',
    'Филипп',
    'Эдуард',
    'Юрий',
    'Яков',
    'Ярослав',
    'Алина',
    'Алиса',
    'Алла',
    'Анастасия',
    'Ангелина',
    'Анна',
    'Антонина',
    'Валентина',
    'Валерия',
    'Варвара',
    'Василиса',
    'Вера',
    'Вероника',
    'Виктория',
    'Галина',
    'Дарья',
    'Диана',
    'Евгения',
    'Екатерина',
    'Елена',
    'Елизавета',
    'Жанна',
    'Зоя',
    'Инна',
    'Ирина',
    'Карина',
    'Кира',
    'Клавдия',
    'Ксения',
    'Лариса',
    'Лидия',
    'Любовь',
    'Людмила',
    'Маргарита',
    'Марина',
    'Мария',
    'Милана',
    'Надежда',
    'Наталья',
    'Нина',
    'Оксана',
    'Олеся',
    'Ольга',
    'Полина',
    'Раиса',
    'Регина',
    'Светлана',
    'София',
  ];

  private lastNames = [
    'Иванов',
    'Смирнов',
    'Кузнецов',
    'Попов',
    'Васильев',
    'Петров',
    'Соколов',
    'Михайлов',
    'Новиков',
    'Федоров',
    'Морозов',
    'Волков',
    'Алексеев',
    'Лебедев',
    'Семенов',
    'Егоров',
    'Павлов',
    'Козлов',
    'Степанов',
    'Николаев',
    'Орлов',
    'Андреев',
    'Макаров',
    'Никитин',
    'Захаров',
    'Зайцев',
    'Соловьев',
    'Борисов',
    'Яковлев',
    'Григорьев',
    'Романов',
    'Воробьев',
    'Сергеев',
    'Кузьмин',
    'Фролов',
    'Александров',
    'Дмитриев',
    'Королев',
    'Гусев',
    'Киселев',
    'Ильин',
    'Максимов',
    'Поляков',
    'Сорокин',
    'Виноградов',
    'Ковалев',
    'Белов',
    'Медведев',
    'Антонов',
    'Тарасов',
    'Жуков',
    'Баранов',
    'Филиппов',
    'Комаров',
    'Давыдов',
    'Беляев',
    'Герасимов',
    'Богданов',
    'Осипов',
    'Сидоров',
    'Матвеев',
    'Титов',
    'Марков',
    'Миронов',
    'Крылов',
    'Куликов',
    'Карпов',
    'Власов',
    'Мельников',
    'Денисов',
    'Гаврилов',
    'Тихонов',
    'Казаков',
    'Афанасьев',
    'Данилов',
    'Савельев',
    'Тимофеев',
    'Фомин',
    'Чернов',
    'Абрамов',
    'Мартынов',
    'Ефимов',
    'Щербаков',
    'Назаров',
    'Калинин',
    'Исаев',
    'Чернышев',
    'Быков',
    'Маслов',
    'Родионов',
    'Коновалов',
    'Лазарев',
    'Воронин',
    'Климов',
    'Филатов',
    'Пономарев',
    'Голубев',
    'Кудрявцев',
    'Прохоров',
    'Наумов',
  ];

  private nicknames = [
    'Ветер',
    'Молния',
    'Тигр',
    'Орел',
    'Лис',
    'Медведь',
    'Сокол',
    'Волк',
    'Рысак',
    'Гром',
    'Ураган',
    'Град',
    'Вихрь',
    'Шторм',
    'Цунами',
    'Вулкан',
    'Клинок',
    'Щит',
    'Меч',
    'Лучник',
  ];

  private adjectives = [
    'Красный',
    'Синий',
    'Быстрый',
    'Умный',
    'Смелый',
    'Летучий',
    'Темный',
    'Светлый',
    'Великий',
    'Могучий',
    'Стальной',
    'Золотой',
    'Серебряный',
    'Бронзовый',
    'Яростный',
    'Бесконечный',
    'Вечный',
    'Неуловимый',
    'Невидимый',
    'Загадочный',
    'Стремительный',
    'Беспощадный',
    'Неудержимый',
    'Непобедимый',
    'Легендарный',
    'Мифический',
    'Таинственный',
    'Забытый',
    'Древний',
    'Бессмертный',
  ];

  private nouns = [
    'Дракон',
    'Феникс',
    'Волк',
    'Ястреб',
    'Титан',
    'Самурай',
    'Маг',
    'Воин',
    'Странник',
    'Мудрец',
    'Рыцарь',
    'Паладин',
    'Чародей',
    'Некромант',
    'Алхимик',
    'Пират',
    'Викинг',
    'Кочевник',
    'Охотник',
    'Следопыт',
    'Пророк',
    'Оракул',
    'Демиург',
    'Творец',
    'Разрушитель',
    'Защитник',
    'Хранитель',
    'Посланник',
    'Избранный',
    'Спаситель',
  ];

  get avatarUrl(): string {
    return this.customAvatarUrl || this.defaultAvatarUrl;
  }

  ngOnInit() {
    this.loadSavedData();
  }

  generateRandomName() {
    let attempts = 0;
    const maxAttempts = 100;
    let newName = '';

    while (attempts < maxAttempts) {
      const randomType = Math.floor(Math.random() * 3);

      switch (randomType) {
        case 0:
          newName = `${this.getRandomItem(
            this.firstNames
          )} ${this.getRandomItem(this.lastNames)}`;
          break;
        case 1:
          newName = `${this.getRandomItem(
            this.firstNames
          )} ${this.getRandomItem(this.nicknames)}`;
          break;
        case 2:
          newName = `${this.getRandomItem(
            this.adjectives
          )} ${this.getRandomItem(this.nouns)}`;
          break;
      }

      if (Math.random() < 0.3) {
        newName += ` ${Math.floor(Math.random() * 1000)}`;
      }

      if (!this.usedNames.has(newName)) {
        this.usedNames.add(newName);
        this.name = newName;
        return;
      }
      attempts++;
    }
    this.name = newName;
  }

  private getRandomItem(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    localStorage.setItem('userName', this.name);
    localStorage.setItem('userAbout', this.about);
    this.isEditing = false;
  }

  removeAvatar() {
    if (this.customAvatarUrl) {
      URL.revokeObjectURL(this.customAvatarUrl);
    }
    this.customAvatarUrl = null;
    this.selectedFileName = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      if (this.customAvatarUrl) {
        URL.revokeObjectURL(this.customAvatarUrl);
      }
      const file = input.files[0];
      this.customAvatarUrl = URL.createObjectURL(file);
      this.selectedFileName = file.name;
    }
  }

  private loadSavedData() {
    this.name = localStorage.getItem('userName') || this.name;
    this.about = localStorage.getItem('userAbout') || this.about;
    this.usedNames.add(this.name);
  }
}
