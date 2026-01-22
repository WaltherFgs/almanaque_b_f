import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-acontecimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acontecimientos.html',
  styleUrl: './acontecimientos.css'
})
export class AcontecimientosComponent implements OnInit, AfterViewInit {
  acontecimientos: any[] = [];
  expandedEvents: { [key: string]: boolean } = {};

  constructor(
    private el: ElementRef,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.apiService.getAcontecimientos().subscribe(data => {
      this.acontecimientos = data;
      this.cdr.detectChanges(); // Force update
      setTimeout(() => this.observeElements(), 100);
    });
  }

  ngAfterViewInit(): void {
    this.observeElements();
  }

  toggleEvent(id: string) {
    this.expandedEvents[id] = !this.expandedEvents[id];
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
