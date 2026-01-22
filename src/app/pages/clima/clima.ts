import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clima.html',
  styleUrl: './clima.css',
})
export class ClimaComponent implements OnInit {
  settings: any = {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => this.settings = s);
  }
}
