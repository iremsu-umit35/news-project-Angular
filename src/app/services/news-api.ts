// src/app/services/news-api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsApiService {
  private apiKey = '676f017549224f488970f1835f9db971';
  private baseUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  // 🔹 Anasayfa haberleri
  getTopHeadlines(page: number = 1, pageSize: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('country', 'us')
      .set('page', page)
      .set('pageSize', pageSize)
      .set('apiKey', this.apiKey);
    return this.http.get(this.baseUrl, { params });
  }

  // 🔹 Kategoriye göre
  getNewsByCategory(category: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('country', 'us')
      .set('category', category)
      .set('page', page)
      .set('apiKey', this.apiKey);
    return this.http.get(this.baseUrl, { params });
  }

  
  // 🔹 Arama
  searchNews(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('country', 'us')
      .set('q', query)
      .set('page', page)
      .set('apiKey', this.apiKey);
    return this.http.get(this.baseUrl, { params });
  }

  
}

// (örn. component içindeki çağrı)
// this.isLoading = true;
// this.newsApi.getNewsByCategory(this.selectedCategory, this.selectedCountry)
//   .subscribe({
//     next: (res: any) => {
//       this.articles = res.articles || [];
//       this.isLoading = false;
//     },
//     error: (err: any) => {
//       console.error('Kategori haberleri yüklenemedi', err);
//       this.isLoading = false;
//     }
//   });

