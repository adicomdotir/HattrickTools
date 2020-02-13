import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player';

@Component({
    selector: 'app-player-box',
    templateUrl: './player-box.component.html',
    styleUrls: ['./player-box.component.css']
})
export class PlayerBoxComponent implements OnInit {

    @Input() player: Player;

    constructor() { }

    ngOnInit() { }

    getLoyaltyText(pl: Player) {
        if (pl.motherClub) {
            return '&#10084;';
        }
        return pl.loyalty;
    }

}
