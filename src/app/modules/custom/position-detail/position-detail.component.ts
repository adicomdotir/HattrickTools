import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/models/player';
import { Location } from '@angular/common';

@Component({
    selector: 'app-position-detail',
    templateUrl: './position-detail.component.html',
    styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {
    index = -1;
    player: Player;
    players: Player[];

    constructor(private route: ActivatedRoute, private location: Location) {
        this.route.paramMap.subscribe(params => {
            this.index = Number(params['params'].id) - 1;
        });
    }

    ngOnInit() {
        this.players = JSON.parse(localStorage.getItem('POSITION'));
        this.player = this.players[this.index];
    }

    savePlayer() {
        this.players[this.index] = this.player;
        localStorage.setItem('POSITION', JSON.stringify(this.players));
        this.location.back();
    }
}
