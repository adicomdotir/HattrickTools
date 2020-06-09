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
    currentPositionNameArray = [];

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
        this.currentPositionNameArray = [];
        const currentPosition = POSITIONS[this.position - 1][this.getPositionIcon(this.position)];

        for (const key in currentPosition) {
            if (currentPosition.hasOwnProperty(key)) {
                this.currentPositionNameArray.push(key);
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
            if (this.currentPositionNameArray[i] === 'PLAYMAKING') {
                total += (this.valuesPlayerOne[i] * this.ratios[i]) * 3;
            } else {
                total += this.valuesPlayerOne[i] * this.ratios[i];
            }
        }
        return total.toFixed(3);
    }

    calculatorAttackPlayerOne() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'WING' ||
                this.currentPositionNameArray[i] === 'PASSING' ||
                this.currentPositionNameArray[i] === 'SCORING') {
                total += this.valuesPlayerOne[i] * this.ratios[i];
            }
        }
        return total.toFixed(3);
    }

    calculatorMidfieldPlayerOne() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'PLAYMAKING') {
                total += this.valuesPlayerOne[i] * this.ratios[i];
            }
        }
        total *= 3;
        return total.toFixed(3);
    }

    calculatorDefencePlayerOne() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'GOALKEEPER' ||
                this.currentPositionNameArray[i] === 'DEFENDING') {
                total += this.valuesPlayerOne[i] * this.ratios[i];
            }
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

    calculatorAttackPlayerTwo() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'WING' ||
                this.currentPositionNameArray[i] === 'PASSING' ||
                this.currentPositionNameArray[i] === 'SCORING') {
                total += this.valuesPlayerTwo[i] * this.ratios[i];
            }
        }
        return total.toFixed(3);
    }

    calculatorMidfieldPlayerTwo() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'PLAYMAKING') {
                total += this.valuesPlayerTwo[i] * this.ratios[i];
            }
        }
        total *= 3;
        return total.toFixed(3);
    }

    calculatorDefencePlayerTwo() {
        let total = 0;
        for (let i = 0; i < this.ratios.length; i++) {
            if (this.currentPositionNameArray[i] === 'GOALKEEPER' ||
                this.currentPositionNameArray[i] === 'DEFENDING') {
                total += this.valuesPlayerTwo[i] * this.ratios[i];
            }
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
