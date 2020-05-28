import { Component, OnInit } from '@angular/core';
import { POSITIONS } from 'src/app/config/position';

@Component({
    selector: 'app-player2player',
    templateUrl: './player2player.component.html',
    styleUrls: ['./player2player.component.css']
})
export class Player2playerComponent implements OnInit {
    playerOne;
    playerTwo;
    position = -1;
    labels = [];
    valuesPlayerOne = [];
    valuesPlayerTwo = [];
    ratios = [];

    constructor() { }

    ngOnInit() { }

    clearPlayers() {
        let id = Math.round(Math.random() * 8999 + 1000);
        this.playerOne = id;
        id = Math.round(Math.random() * 8999 + 1000);
        this.playerTwo = id;
        this.generateInput();
    }

    generateInput() {
        this.labels = [];
        this.valuesPlayerOne = [];
        this.valuesPlayerTwo = [];
        this.ratios = [];
        const currentPosition = POSITIONS[this.position];
        for (const key in currentPosition) {
            if (currentPosition.hasOwnProperty(key)) {
                const ratio = currentPosition[key];
                this.valuesPlayerOne.push(0);
                this.valuesPlayerTwo.push(0);
                this.ratios.push(ratio);
                this.labels.push(key);
            }
        }
    }

    calculatorPlayerOne() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            total += this.valuesPlayerOne[i] * this.ratios[i];
        }
        return total.toFixed(3);
    }

    calculatorPlayerTwo() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            total += this.valuesPlayerTwo[i] * this.ratios[i];
        }
        return total.toFixed(3);
    }
}
