/*
* Bu bileşen, belirli bir kategoriye ait haberleri listelemekten sorumludur.
 * URL'den (örn: /category/sports) kategori adını okur,
 * NewsApiService aracılığıyla ilgili haberleri çeker ve kullanıcıya sunar.
 * * Ek olarak, kullanıcıların bu haberleri anlık olarak filtreleyebilmesi için
 * çeşitli filtreleme (görsel, tarih, arama metni) özellikleri içerir.
*/
/** * --- Ana Fonksiyonlar ---
 * * - ngOnInit(): 
 * Bileşen yüklendiğinde çalışır. 'ActivatedRoute' servisini kullanarak URL'yi dinler.
 * URL'deki 'category' parametresi değiştiğinde (örn: 'sports'tan 'business'a geçildiğinde)
 * 'categoryName' değişkenini günceller ve 'loadCategoryNews()' metodunu tetikler.
 * * - loadCategoryNews(): 
 * API'den o anki 'categoryName' değişkenine göre haberleri çeker.
 * Gelen veriyi 'articles' (orijinal liste) ve 'filteredArticles' (gösterilen liste) 
 * dizilerine aktarır. Yükleme sırasında 'isLoading' bayrağını yönetir.
 * * - applyFilters(): 
 * Bu bileşendeki ana filtreleme mantığını içerir. Orijinal 'articles' listesini
 * filtreler (showImages, onlyRecent, searchQuery) ve sonucu 'filteredArticles' dizisine yazar.
 * HTML'de *ngFor ile 'filteredArticles' dizisi kullanılır.
 * * - onSearchChange(): 
 * Arama kutusuna (searchQuery) bir şey yazıldığında tetiklenen yardımcı metottur.
 * Tek görevi 'applyFilters()' metodunu çağırmaktır.
 */


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel için
import { NewsApiService } from '../../services/news-api';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  articles: any[] = [];
  filteredArticles: any[] = [];
  isLoading = true;

  // filtreler
  showImages: boolean = false;
  onlyRecent: boolean = false;
  searchQuery: string = ''; 

  constructor(private route: ActivatedRoute, private newsApi: NewsApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || 'general';
      console.log('Seçilen kategori:', this.categoryName);
      this.loadCategoryNews();
    });
  }

  /**
   * API servisimiz üzerinden seçili kategoriye ait haberleri çeken metot.
   */
  loadCategoryNews() {
    this.isLoading = true;
    this.newsApi.getNewsByCategory(this.categoryName).subscribe({
      next: (res) => {
        this.articles = res.articles || [];
        this.filteredArticles = [...this.articles]; // başlangıçta filtre uygulanmamış tüm haberler
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Kategori haberleri yüklenemedi', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Filtreler değiştiğinde (checkbox tıklandığında veya arama yapıldığında)
   * ana listeyi ('articles') filtreleyip sonucu 'filteredArticles'a yazan metot.
   */
  applyFilters() {
    const query = this.searchQuery.toLowerCase().trim(); 

    this.filteredArticles = this.articles.filter(article => {
      let ok = true;

      // Görsel filtresi
      if (this.showImages) {
        ok = ok && !!article.urlToImage;
      }

      // Son 24 saat filtresi
      if (this.onlyRecent) {
        const publishedDate = new Date(article.publishedAt);
        const now = new Date();
        const diffHours = (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60);
        ok = ok && diffHours <= 24;
      }

      //  Arama filtresi
      if (query) {
        const title = article.title?.toLowerCase() || '';
        const desc = article.description?.toLowerCase() || '';
        ok = ok && (title.includes(query) || desc.includes(query));
      }

      return ok;
    });
  }

  // Anlık arama (kutuya yazdıkça çalışır)
  onSearchChange() {
    this.applyFilters();
  }
}
