import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NFTComponent } from './pages/nft/nft.component';
import { NftProfileComponent } from './pages/nft-profile/nft-profile.component';
import { MyNftsComponent } from './pages/my-nfts/my-nfts.component';
import { CreateNftComponent } from './pages/create-nft/create-nft.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
