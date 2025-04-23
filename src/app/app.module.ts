import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Добавлено для HTTP-запросов
import { RouterModule } from '@angular/router'; // Добавлено для навигации

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NFTComponent } from './pages/nft/nft.component';
import { NftProfileComponent } from './pages/nft-profile/nft-profile.component';
import { MyNftsComponent } from './pages/my-nfts/my-nfts.component';
import { CreateNftComponent } from './pages/create-nft/create-nft.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './auth service'; // Исправлено имя файла (убрал пробел)

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NFTComponent,
    NftProfileComponent,
    MyNftsComponent,
    CreateNftComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule, // Добавлено для навигации
  ],
  providers: [
    AuthService, // Добавлен сервис в провайдеры
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
