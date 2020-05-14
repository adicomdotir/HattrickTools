import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-compare-player',
    templateUrl: './compare-player.component.html',
    styleUrls: ['./compare-player.component.css']
})
export class ComparePlayerComponent implements OnInit {

    players: any[] = [];
    position = -1;

    constructor() { }

    ngOnInit() {
    }

    addNewPlayer() {
        const id = Math.round(Math.random() * 8999 + 1000);
        this.players.push(id);
    }

    clearPlayers() {
        this.players = [];
    }

}
