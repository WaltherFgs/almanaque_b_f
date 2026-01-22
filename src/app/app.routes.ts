import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ReflexionesComponent } from './pages/reflexiones/reflexiones';
import { ClimaComponent } from './pages/clima/clima';
import { ConsejosComponent } from './pages/consejos/consejos';
import { ProverbiosComponent } from './pages/proverbios/proverbios';
import { TareasComponent } from './pages/tareas/tareas';
import { SabiduriaComponent } from './pages/sabiduria/sabiduria';
import { AcontecimientosComponent } from './pages/acontecimientos/acontecimientos';
import { ActualidadComponent } from './pages/actualidad/actualidad';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'reflexiones', component: ReflexionesComponent },
    { path: 'clima', component: ClimaComponent },
    { path: 'consejos', component: ConsejosComponent },
    { path: 'proverbios', component: ProverbiosComponent },
    { path: 'tareas', component: TareasComponent },
    { path: 'sabiduria', component: SabiduriaComponent },
    { path: 'acontecimientos', component: AcontecimientosComponent },
    { path: 'actualidad', component: ActualidadComponent },
    { path: '**', redirectTo: '' }
];
