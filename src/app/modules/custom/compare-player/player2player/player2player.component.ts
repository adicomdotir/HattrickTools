import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { POSITIONS, POSITION_ROLES } from 'src/app/config/position';

@Component({
    selector: 'app-player2player',
    templateUrl: './player2player.component.html',
    styleUrls: ['./player2player.component.css']
})
export class Player2playerComponent implements OnInit {
    @ViewChild('rmenu') rmenu: ElementRef;
    playerOne;
    playerTwo;
    position = -1;
    labels = [];
    valuesPlayerOne = [];
    valuesPlayerTwo = [];
    ratios = [];
    top = 0;
    left = 0;
    positionRoles = [];
    positionIcon: string[] = ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'];

    constructor(private renderer: Renderer2) { }

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
        const currentPosition = POSITIONS[this.position - 1][this.getPositionIcon(this.position)];

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

    positionSelect(positionId) {
        if (positionId !== undefined && positionId !== -1) {
            this.position = positionId;
            this.top = event['y'];
            this.left = event['x'];
            this.renderer.removeClass(this.rmenu.nativeElement, 'hide');
            this.positionRoles = [];
            POSITION_ROLES[positionId - 1].forEach(x => this.positionRoles.push(x));
        } else {
            this.renderer.addClass(this.rmenu.nativeElement, 'hide');
        }
    }

    subMenuClick(role) {
        this.positionIcon = this.positionIcon.map(x => '-1');
        this.positionIcon[this.position - 1] = role;
        this.renderer.addClass(this.rmenu.nativeElement, 'hide');
        this.clearPlayers();
    }

    getPositionIcon(positionId) {
        return this.positionIcon[positionId - 1] === '-1' ? '&nbsp;' : this.briefPositionIcon(this.positionIcon[positionId - 1]);
    }

    briefPositionIcon(role: string) {
        const str = role.split(' ').reduce((pv, cv, ci, arr) => {
            return pv + cv.charAt(0);
        }, '');
        return str;
    }
}
