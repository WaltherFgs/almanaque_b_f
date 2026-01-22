import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-actualidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualidad.html',
  styleUrl: './actualidad.css'
})
export class ActualidadComponent implements OnInit, AfterViewInit {
  articulos: any[] = [];
  columnistas: any[] = [];

  constructor(private el: ElementRef, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getArticulos().subscribe(data => {
      this.articulos = data.filter(a => a.tipo === 'actualidad');
      setTimeout(() => this.observeElements(), 100);
    });

    this.apiService.getAutores().subscribe(data => {
      this.columnistas = data.slice(0, 3);
    });
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  private observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const highlights = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    highlights.forEach((h: HTMLElement) => observer.observe(h));
  }
}
