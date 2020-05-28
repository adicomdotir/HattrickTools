import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';
import { HealingComponent } from './healing/healing.component';
import { StadiumComponent } from './stadium/stadium.component';
import { CustomRatingComponent } from './custom-rating/custom-rating.component';
import { PositionDetailComponent } from './position-detail/position-detail.component';
import { ComparePlayerComponent } from './compare-player/compare-player.component';
import { Player2playerComponent } from './compare-player/player2player/player2player.component';
import { Player2rangeComponent } from './compare-player/player2range/player2range.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'rating', component: HomeComponent
    },
    {
        path: 'training', component: TrainingComponent
    },
    {
        path: 'healing', component: HealingComponent
    },
    {
        path: 'stadium', component: StadiumComponent
    },
    {
        path: 'custom-rating', component: CustomRatingComponent
    },
    {
        path: 'compare', component: ComparePlayerComponent,
        children: [
            { path: '', component: Player2playerComponent },
            { path: 'p2p', component: Player2playerComponent },
            { path: 'range', component: Player2rangeComponent }
        ]
    },
    {
        path: 'detail/:id', component: PositionDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomRoutingModule { }
