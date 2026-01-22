import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-consejos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consejos.html',
  styleUrl: './consejos.css',
})
export class ConsejosComponent implements OnInit {
  consejos: any[] = [];
  settings: any = {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getConsejos().subscribe(data => this.consejos = data);
    this.api.getSettings().subscribe(s => this.settings = s);
  }

  getConsejosByCategoria(categoria: string) {
    return this.consejos.filter(c => c.categoria === categoria);
  }
}
