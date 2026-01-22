import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-brand-slate/80 backdrop-blur-sm" (click)="onCancel()"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-brand-paper border border-brand-gold/20 shadow-2xl max-w-md w-full p-12 text-center reveal-on-scroll active">
          <h3 class="text-brand-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-8">Confirmación Requerida</h3>
          <h2 class="text-3xl font-serif font-bold text-brand-slate mb-6 italic leading-tight">{{ title }}</h2>
          <p class="text-brand-slate/60 font-serif italic mb-12 text-lg leading-relaxed">
            {{ message }}
          </p>
          
          <div class="flex flex-col gap-4">
            <button (click)="onConfirm()" 
              class="w-full py-4 bg-brand-slate text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-brand-gold hover:text-brand-slate transition-all duration-500 border border-brand-gold/10">
              Confirmar Acción
            </button>
            <button (click)="onCancel()" 
              class="w-full py-4 text-brand-slate/40 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-brand-slate transition-all duration-500">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: contents; }
  `]
})
export class ModalComponent {
  @Input() isVisible = false;
  @Input() title = '¿Estás seguro?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
    this.isVisible = false;
  }

  onCancel() {
    this.cancelled.emit();
    this.isVisible = false;
  }
}
