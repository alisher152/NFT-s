import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NFTComponent } from './pages/nft/nft.component';
import { NftProfileComponent } from './pages/nft-profile/nft-profile.component';
import { MyNftsComponent } from './pages/my-nfts/my-nfts.component';
import { CreateNftComponent } from './pages/create-nft/create-nft.component';

const routes: Routes = [
  { path: '', redirectTo: '/nft', pathMatch: 'full' }, // Исправлено: перенаправление на /nft
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nft', component: NFTComponent },
  { path: 'profile', component: NftProfileComponent },
  { path: 'my-nfts', component: MyNftsComponent },
  { path: 'create-nft', component: CreateNftComponent },
  { path: '**', redirectTo: '/nft' }, // Исправлено: перенаправление на /nft при 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
