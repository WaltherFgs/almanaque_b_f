import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../../components/modal/modal';
import { NotificationService } from '../../services/notification';
import { NotificationComponent } from '../../components/notification/notification';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, ModalComponent, NotificationComponent],
    templateUrl: './admin.html',
    styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
    refranes: any[] = [];
    newRefran = { texto: '', categoria: '' };

    articulos: any[] = [];
    newArticulo = { titulo: '', contenido: '', tipo: 'actualidad', autor_id: 1 };

    acontecimientos: any[] = [];
    newAcontecimiento = { anio: '', titulo: '', descripcion: '', detalle: '', ubicacion: '' };

    // Nuevos tipos de contenido
    autores: any[] = [];
    newAutor = { nombre: '', biografia: '', especialidad: '', frase_destacada: '' };

    consejos: any[] = [];
    newConsejo = { categoria: 'hogar', texto: '' };

    tareas: any[] = [];
    newTarea = { seccion: 'patria', titulo: '', texto: '' };

    pilares: any[] = [];
    settings: any = {};

    activeTab: string = 'refranes';

    // Modal State
    modalVisible = false;
    modalTitle = '';
    modalMessage = '';
    itemToDelete: { id: number, type: string } | null = null;

    // Edit Mode State
    editModes: { [key: string]: boolean } = {
        refranes: false,
        articulos: false,
        acontecimientos: false,
        autores: false,
        consejos: false,
        tareas: false,
        pilares: false
    };
    editingId: number | null = null;

    constructor(
        private apiService: ApiService,
        private notification: NotificationService
    ) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll() {
        this.loadRefranes();
        this.loadArticulos();
        this.loadAcontecimientos();
        this.loadAutores();
        this.loadConsejos();
        this.loadTareas();
        this.loadPilares();
        this.loadSettings();
    }

    // --- CARGADORES ---
    loadRefranes() { this.apiService.getRefranes().subscribe(data => this.refranes = data); }
    loadArticulos() { this.apiService.getArticulos().subscribe(data => this.articulos = data); }
    loadAcontecimientos() { this.apiService.getAcontecimientos().subscribe(data => this.acontecimientos = data); }
    loadAutores() { this.apiService.getAutores().subscribe(data => this.autores = data); }
    loadConsejos() { this.apiService.getConsejos().subscribe(data => this.consejos = data); }
    loadTareas() { this.apiService.getTareas().subscribe(data => this.tareas = data); }
    loadPilares() { this.apiService.getPilares().subscribe(data => this.pilares = data); }
    loadSettings() { this.apiService.getSettings().subscribe(data => this.settings = data); }

    // --- GUARDADO ---
    saveRefran() {
        if (!this.newRefran.texto || !this.newRefran.categoria) return;
        const action = this.editingId ? this.apiService.updateRefran(this.editingId, this.newRefran) : this.apiService.addRefran(this.newRefran);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Refrán actualizado' : 'Refrán publicado');
                this.resetForm('refranes');
                this.loadRefranes();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    saveArticulo() {
        if (!this.newArticulo.titulo || !this.newArticulo.contenido) return;
        const action = this.editingId ? this.apiService.updateArticulo(this.editingId, this.newArticulo) : this.apiService.addArticulo(this.newArticulo);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Artículo actualizado' : 'Artículo publicado');
                this.resetForm('articulos');
                this.loadArticulos();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    saveAcontecimiento() {
        if (!this.newAcontecimiento.titulo || !this.newAcontecimiento.descripcion) return;
        const action = this.editingId ? this.apiService.updateAcontecimiento(this.editingId, this.newAcontecimiento) : this.apiService.addAcontecimiento(this.newAcontecimiento);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Hito actualizado' : 'Hito registrado');
                this.resetForm('acontecimientos');
                this.loadAcontecimientos();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    saveAutor() {
        if (!this.newAutor.nombre) return;
        const action = this.editingId ? this.apiService.updateAutor(this.editingId, this.newAutor) : this.apiService.addAutor(this.newAutor);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Autor actualizado' : 'Autor registrado');
                this.resetForm('autores');
                this.loadAutores();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    saveConsejo() {
        if (!this.newConsejo.texto) return;
        const action = this.editingId ? this.apiService.updateConsejo(this.editingId, this.newConsejo) : this.apiService.addConsejo(this.newConsejo);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Consejo actualizado' : 'Consejo registrado');
                this.resetForm('consejos');
                this.loadConsejos();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    saveTarea() {
        if (!this.newTarea.texto) return;
        const action = this.editingId ? this.apiService.updateTarea(this.editingId, this.newTarea) : this.apiService.addTarea(this.newTarea);
        action.subscribe({
            next: () => {
                this.notification.show(this.editingId ? 'Tarea actualizada' : 'Tarea registrada');
                this.resetForm('tareas');
                this.loadTareas();
            },
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    updatePilar(pilar: any) {
        this.apiService.updatePilar(pilar.id, pilar).subscribe({
            next: () => this.notification.show('Pilar actualizado'),
            error: () => this.notification.show('Error al actualizar pilar', 'error')
        });
    }

    saveSetting(clave: string, valor: string) {
        this.apiService.saveSetting(clave, valor).subscribe({
            next: () => this.notification.show('Configuración guardada'),
            error: () => this.notification.show('Error al guardar', 'error')
        });
    }

    // --- EDICIÓN ---
    editRefran(refran: any) { this.newRefran = { ...refran }; this.startEdit(refran.id, 'refranes'); }
    editArticulo(articulo: any) { this.newArticulo = { ...articulo }; this.startEdit(articulo.id, 'articulos'); }
    editAcontecimiento(event: any) { this.newAcontecimiento = { ...event }; this.startEdit(event.id, 'acontecimientos'); }
    editAutor(autor: any) { this.newAutor = { ...autor }; this.startEdit(autor.id, 'autores'); }
    editConsejo(consejo: any) { this.newConsejo = { ...consejo }; this.startEdit(consejo.id, 'consejos'); }
    editTarea(tarea: any) { this.newTarea = { ...tarea }; this.startEdit(tarea.id, 'tareas'); }

    startEdit(id: number, type: string) {
        this.editingId = id;
        this.editModes[type] = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- ELIMINACIÓN ---
    deleteRefran(id: number) { this.prepareDelete(id, 'refran', '¿Eliminar Refrán?', 'Este refrán desaparecerá permanentemente.'); }
    deleteArticulo(id: number) { this.prepareDelete(id, 'articulo', '¿Eliminar Artículo?', 'Esta pieza será retirada de los archivos.'); }
    deleteAcontecimiento(id: number) { this.prepareDelete(id, 'acontecimiento', '¿Eliminar Hito?', 'Este hito será borrado de la memoria.'); }
    deleteAutor(id: number) { this.prepareDelete(id, 'autor', '¿Eliminar Autor?', 'Todos sus artículos quedarán sin autor asignado.'); }
    deleteConsejo(id: number) { this.prepareDelete(id, 'consejo', '¿Eliminar Consejo?', 'Esta guía será retirada permanentemente.'); }
    deleteTarea(id: number) { this.prepareDelete(id, 'tarea', '¿Eliminar Tarea?', 'Este compromiso ciudadano será borrado.'); }

    prepareDelete(id: number, type: string, title: string, message: string) {
        this.modalTitle = title;
        this.modalMessage = message;
        this.itemToDelete = { id, type };
        this.modalVisible = true;
    }

    performDelete() {
        if (!this.itemToDelete) return;
        const { id, type } = this.itemToDelete;
        let action: Observable<any>;

        switch (type) {
            case 'refran': action = this.apiService.deleteRefran(id); break;
            case 'articulo': action = this.apiService.deleteArticulo(id); break;
            case 'acontecimiento': action = this.apiService.deleteAcontecimiento(id); break;
            case 'autor': action = this.apiService.deleteAutor(id); break;
            case 'consejo': action = this.apiService.deleteConsejo(id); break;
            case 'tarea': action = this.apiService.deleteTarea(id); break;
            default: return;
        }

        action.subscribe({
            next: () => {
                this.loadAll();
                this.modalVisible = false;
                this.itemToDelete = null;
                this.notification.show('Registro eliminado correctamente');
            },
            error: () => {
                this.notification.show('Error al eliminar', 'error');
                this.modalVisible = false;
            }
        });
    }

    resetForm(type: string) {
        if (type === 'refranes') this.newRefran = { texto: '', categoria: '' };
        if (type === 'articulos') this.newArticulo = { titulo: '', contenido: '', tipo: 'actualidad', autor_id: 1 };
        if (type === 'acontecimientos') this.newAcontecimiento = { anio: '', titulo: '', descripcion: '', detalle: '', ubicacion: '' };
        if (type === 'autores') this.newAutor = { nombre: '', biografia: '', especialidad: '', frase_destacada: '' };
        if (type === 'consejos') this.newConsejo = { categoria: 'hogar', texto: '' };
        if (type === 'tareas') this.newTarea = { seccion: 'patria', titulo: '', texto: '' };

        this.editingId = null;
        this.editModes[type] = false;
    }

    setTab(tab: string) {
        this.activeTab = tab;
        this.editingId = null;
    }
}
