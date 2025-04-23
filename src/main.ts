import { AppModule } from './app/app.module';
import '@angular/compiler'; // Добавьте в начало файла
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
