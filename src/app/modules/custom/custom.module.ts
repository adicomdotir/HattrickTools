import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomRoutingModule } from './custom-routing.module';
import { HomeComponent } from './home/home.component';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';
import { TrainingComponent } from './training/training.component';
import { HealingComponent } from './healing/healing.component';
import { StadiumComponent } from './stadium/stadium.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomRoutingModule
    ],
    declarations: [
        HomeComponent,
        ReversePipe,
        TrainingComponent,
        HealingComponent,
        StadiumComponent // TODO: move to shared module
    ]
})
export class CustomModule { }
