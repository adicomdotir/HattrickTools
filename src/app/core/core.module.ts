import { NgModule } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [RouterModule, CommonModule, TranslateModule],
	exports: [HeaderComponent],
	providers: [],
	declarations: [HeaderComponent]

})
export class CoreModule {

}
