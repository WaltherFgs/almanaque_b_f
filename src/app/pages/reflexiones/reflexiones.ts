import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reflexiones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflexiones.html',
  styleUrl: './reflexiones.css'
})
export class ReflexionesComponent implements OnInit, AfterViewInit {
  articulos: any[] = [];

  constructor(private el: ElementRef, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getArticulos().subscribe(data => {
      // Filtrar solo los de tipo reflexion para esta página
      this.articulos = data.filter(a => a.tipo === 'reflexion');
      setTimeout(() => this.observeElements(), 100);
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
