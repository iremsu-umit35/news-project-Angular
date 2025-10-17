// src/app/services/news-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  // PDF'te verilen API Anahtarı
  private apiKey = '676f017549224f488970f1835f9db971'; // [cite: 29]
  private apiUrl = 'https://newsapi.org/v2/top-headlines'; // [cite: 18]

  constructor(private http: HttpClient) { }

  // Sayfalama ve kategoriye göre haber getiren genel bir fonksiyon
  getNews(options: { category?: string; query?: string; page?: number; pageSize?: number }): Observable<any> {
    const { category, query, page = 1, pageSize = 20 } = options;

    let params = `?country=tr&apiKey=${this.apiKey}&page=${page}&pageSize=${pageSize}`;

    if (category) {
      params += `&category=${category}`; // [cite: 10]
    }
    if (query) {
      params += `&q=${query}`; // [cite: 18]
    }

    return this.http.get(this.apiUrl + params);
  }
}