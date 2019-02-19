import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomRoutingModule } from './custom-routing.module';
import { HomeComponent } from './home/home.component';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomRoutingModule
    ],
    declarations: [
        HomeComponent,
        ReversePipe // TODO: move to shared module
    ]
})
export class CustomModule { }
