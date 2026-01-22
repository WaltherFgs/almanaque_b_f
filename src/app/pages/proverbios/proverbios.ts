import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-proverbios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proverbios.html',
  styleUrl: './proverbios.css',
})
export class ProverbiosComponent implements OnInit, AfterViewInit {
  refranes: any[] = [];

  constructor(
    private el: ElementRef,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('Iniciando carga de refranes...');
    this.apiService.getRefranes().subscribe({
      next: (data) => {
        console.log('Refranes recibidos:', data.length);
        this.refranes = data;
        this.cdr.detectChanges(); // Force update
        setTimeout(() => this.observeElements(), 100);
      },
      error: (err) => console.error('Error cargando refranes desde API:', err)
    });
  }

  ngAfterViewInit(): void {
    // Basic observation for initial elements if any
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
