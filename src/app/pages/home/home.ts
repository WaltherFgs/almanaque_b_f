import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit, OnInit {
  settings: any = {};
  columnistas: any[] = [];

  constructor(private el: ElementRef, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => this.settings = s);
    this.api.getAutores().subscribe(a => this.columnistas = a.slice(0, 3));
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const highlights = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    highlights.forEach((h: HTMLElement) => observer.observe(h));
  }
}
