import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// YENİ: Oluşturduğumuz header bileşenini buraya import ediyoruz.
// Doğru yoldan import ettiğinizden emin olun.
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true, // Zaten bu şekilde olmalı
  imports: [
    RouterOutlet,
    HeaderComponent // YENİ: HeaderComponent'i buraya ekleyin
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { // Sizin sınıf adınız 'App' olduğu için onu kullanıyoruz
  title = 'gazete-projesi';
}