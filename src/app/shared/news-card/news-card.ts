// src/app/shared/news-card/news-card.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.html',
  styleUrls: ['./news-card.css']
})
export class NewsCardComponent {
  @Input() article: any;
}
