import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../../services/news-api';

// SearchComponent: Kullanıcının arama yaptığı sayfayı temsil eder
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  query: string = ''; // Kullanıcının aradığı kelime
  articles: any[] = [];// API’den gelen haberlerin listesi
  isLoading = false;// Yüklenme durumu (true = yükleniyor, false = bitti)

  // ActivatedRoute: URL’deki query parametrelerini okumak için
  // NewsApiService: Haber API’sine istek atmak için
  constructor(private route: ActivatedRoute, private newsApi: NewsApiService) {}

  // Bileşen açıldığında (sayfa yüklendiğinde) çalışır
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchNews();
      }
    });
  }
// Arama fonksiyonu — API üzerinden arama yapar
  searchNews() {
    this.isLoading = true;
    this.newsApi.searchNews(this.query).subscribe({
      next: (res) => {
        this.articles = res.articles || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Arama başarısız', err);
        this.isLoading = false;
      }
    });
  }
}
