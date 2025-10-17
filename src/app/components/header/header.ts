import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',// Bu bileşenin HTML'de <app-header></app-header> olarak kullanılmasını sağlar
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',//html dosyasının yolu
  styleUrls: ['./header.css'] //css dosyasının yolu
})
// HeaderComponent bileşenini tanımlar
export class HeaderComponent {
  searchTerm: string = '';

  // 'private router: Router' sayesinde 'this.router' üzerinden yönlendirme yapabileceğiz.
  constructor(private router: Router) {}

  // Arama işlemini gerçekleştirir ve arama sonuçları sayfasına yönlendirir
  performSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}
