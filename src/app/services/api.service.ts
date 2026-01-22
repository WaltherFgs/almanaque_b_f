import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    // Refranes
    getRefranes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/refranes`);
    }

    addRefran(refran: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/refranes`, refran);
    }

    // Acontecimientos
    getAcontecimientos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/acontecimientos`);
    }

    addAcontecimiento(acontecimiento: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/acontecimientos`, acontecimiento);
    }

    // Articulos
    getArticulos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/articulos`);
    }

    addArticulo(articulo: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/articulos`, articulo);
    }

    deleteRefran(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/refranes/${id}`);
    }

    deleteAcontecimiento(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/acontecimientos/${id}`);
    }

    deleteArticulo(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/articulos/${id}`);
    }

    updateRefran(id: number, refran: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/refranes/${id}`, refran);
    }

    updateAcontecimiento(id: number, acontecimiento: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/acontecimientos/${id}`, acontecimiento);
    }

    updateArticulo(id: number, articulo: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/articulos/${id}`, articulo);
    }

    // Autores
    getAutores(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/autores`);
    }
    addAutor(autor: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/autores`, autor);
    }
    updateAutor(id: number, autor: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/autores/${id}`, autor);
    }
    deleteAutor(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/autores/${id}`);
    }

    // Consejos
    getConsejos(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/consejos`);
    }
    addConsejo(consejo: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/consejos`, consejo);
    }
    updateConsejo(id: number, consejo: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/consejos/${id}`, consejo);
    }
    deleteConsejo(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/consejos/${id}`);
    }

    // Tareas
    getTareas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/tareas`);
    }
    addTarea(tarea: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/tareas`, tarea);
    }
    updateTarea(id: number, tarea: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/tareas/${id}`, tarea);
    }
    deleteTarea(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/tareas/${id}`);
    }

    // Pilares
    getPilares(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/pilares`);
    }
    updatePilar(id: number, pilar: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/pilares/${id}`, pilar);
    }

    // Settings
    getSettings(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/settings`);
    }
    saveSetting(clave: string, valor: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/settings`, { clave, valor });
    }
}
