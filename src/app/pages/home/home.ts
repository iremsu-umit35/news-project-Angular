import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiService } from '../../services/news-api';
import { RouterModule } from '@angular/router';

// HomeComponent: Ana sayfada haberleri listeleyen bileşen
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
    // Haber listesi (slider ve normal haberler için ayrı ayrı tutuluyor)
  articles: any[] = [];// Sayfadaki normal haberler
  sliderArticles: any[] = []; // Slider’da gösterilecek ilk 3 haber
  // Yüklenme durumu ve sayfalama için değişkenler
  isLoading = true;
  currentPage = 1;
  pageSize = 10; // Her sayfada gösterilecek haber sayısı
  totalResults = 0;

    // Haberleri almak için NewsApiService servisini kullanıyoruz
  constructor(private newsApi: NewsApiService) {}

    // Bileşen açıldığında (ngOnInit), haberleri yükle
  ngOnInit(): void {
    this.loadNews();
  }
  // Haberleri yükleyen fonksiyon
  loadNews(page: number = 1) {
    this.isLoading = true;
      // Haberleri yükleyen fonksiyon
    this.newsApi.getTopHeadlines(page, this.pageSize).subscribe(
      (res: any) => {
        console.log('API cevabı:', res);
        // Eğer API'den haberler geldiyse
        if (res && res.articles && res.articles.length > 0) {
          this.totalResults = res.totalResults || 0;
          this.sliderArticles = res.articles.slice(0, 3);//ilk üç haberi sildere göster
          this.articles = res.articles.slice(3);
        } else {
          this.sliderArticles = [];
          this.articles = [];
          this.totalResults = 0;
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.error('Haberler yüklenemedi', err);
        this.sliderArticles = [];
        this.articles = [];
        this.totalResults = 0;
        this.isLoading = false;
      }
    );
  }
  // Sayfa değiştirildiğinde çağrılır
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadNews(page);
  }
  // Sayfa değiştirildiğinde çağrılır
  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize) || 1;
  }
}
