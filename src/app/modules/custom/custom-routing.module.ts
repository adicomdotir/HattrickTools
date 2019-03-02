import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'rating', component: HomeComponent
    },
    {
        path: 'training', component: TrainingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomRoutingModule { }
