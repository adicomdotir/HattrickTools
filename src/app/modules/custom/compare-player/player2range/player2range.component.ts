import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { POSITIONS, POSITION_ROLES } from 'src/app/config/position';
import { parse } from 'querystring';

@Component({
    selector: 'app-player2range',
    templateUrl: './player2range.component.html',
    styleUrls: ['./player2range.component.css']
})
export class Player2rangeComponent implements OnInit {
    @ViewChild('rmenu') rmenu: ElementRef;
    top = 0;
    left = 0;
    positionRoles = [];
    position = -1;
    positionIcon: string[] = ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'];
    labels = [];
    valuesPlayer = [];
    currentPositionNameArray = [];
    ratios = [];
    similarPlayerString: string[] = [];
    similarPlayer: string[] = [];

    constructor(private renderer: Renderer2) { }

    ngOnInit() { }

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

    clearPlayers() {
        let id = Math.round(Math.random() * 8999 + 1000);
        // this.playerOne = id;
        id = Math.round(Math.random() * 8999 + 1000);
        // this.playerTwo = id;
        this.generateInput();
    }

    generateInput() {
        this.labels = [];
        this.valuesPlayer = [];
        this.ratios = [];
        this.currentPositionNameArray = [];
        const currentPosition = POSITIONS[this.position - 1][this.getPositionIcon(this.position)];

        for (const key in currentPosition) {
            if (currentPosition.hasOwnProperty(key)) {
                this.currentPositionNameArray.push(key);
                const ratio = currentPosition[key];
                this.valuesPlayer.push(0);
                this.ratios.push(ratio);
                this.labels.push(key);
            }
        }
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

    findPlayers() {
        let total = 0;
        for (let i = 0; i < this.valuesPlayer.length; i++) {
            total += this.valuesPlayer[i] * this.ratios[i];
        }

        this.similarPlayer = [];
        this.similarPlayerString = [];
        this.recursiveAlgorithm(0, '');
        this.similarPlayerString.forEach(x => {
            const values = x.split(',');
            let result = 0;
            for (let i = 0; i < this.valuesPlayer.length; i++) {
                result += this.ratios[i] * parseInt(values[i], 10);
            }
            if (Math.round(result) === Math.round(total)) {
                console.log(x, result);
                this.similarPlayer.push(x);
            }
        });

    }

    recursiveAlgorithm(index, value: string) {
        // console.log(index, value);
        if (index < this.valuesPlayer.length) {
            for (let i = 1; i <= 20; i++) {
                const newValue = `${value},${i}`;
                this.recursiveAlgorithm(index + 1, newValue);
            }
        } else {
            this.similarPlayerString.push(`${value.substring(1)}`);
        }
    }
}
