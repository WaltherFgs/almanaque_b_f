import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-columnistas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './columnistas.html',
    styleUrl: './columnistas.css',
})
export class ColumnistasComponent implements AfterViewInit, OnInit {
    columnistas: any[] = [];

    constructor(private el: ElementRef, private api: ApiService) { }

    ngOnInit(): void {
        this.api.getAutores().subscribe(data => this.columnistas = data);
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
