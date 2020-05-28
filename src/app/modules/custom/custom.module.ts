import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomRoutingModule } from './custom-routing.module';
import { HomeComponent } from './home/home.component';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';
import { TrainingComponent } from './training/training.component';
import { HealingComponent } from './healing/healing.component';
import { StadiumComponent } from './stadium/stadium.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomRatingComponent } from './custom-rating/custom-rating.component';
import { PositionDetailComponent } from './position-detail/position-detail.component';
import { PlayerBoxComponent } from './custom-rating/player-box/player-box.component';
import { ComparePlayerComponent } from './compare-player/compare-player.component';
import { Player2playerComponent } from './compare-player/player2player/player2player.component';
import { Player2rangeComponent } from './compare-player/player2range/player2range.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CustomRoutingModule,
		TranslateModule
	],
	declarations: [
		HomeComponent,
		ReversePipe,
		TrainingComponent,
		HealingComponent,
		StadiumComponent,
		CustomRatingComponent,
		PositionDetailComponent,
		PlayerBoxComponent,
		ComparePlayerComponent,
		Player2playerComponent,
		Player2rangeComponent
	]
})
export class CustomModule { }
