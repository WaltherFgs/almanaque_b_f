import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class TareasComponent implements AfterViewInit, OnInit {
  tareas: any[] = [];

  constructor(private el: ElementRef, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getTareas().subscribe(data => this.tareas = data);
  }

  getTareasBySeccion(seccion: string) {
    return this.tareas.filter(t => t.seccion === seccion);
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
