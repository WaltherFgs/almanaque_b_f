import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sabiduria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sabiduria.html',
  styleUrl: './sabiduria.css',
})
export class SabiduriaComponent implements AfterViewInit, OnInit {
  pilares: any[] = [];
  refranes: any[] = [];

  constructor(private el: ElementRef, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPilares().subscribe(data => this.pilares = data);
    this.api.getRefranes().subscribe(data => this.refranes = data);
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
