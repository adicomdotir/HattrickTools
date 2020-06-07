import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { POSITIONS, POSITION_ROLES } from 'src/app/config/position';

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
        this.myArr = [];
        this.ssss(0, 0, total, '');
        console.log(total);
        console.log(this.myArr);
        
    }

    myArr = [];

    ssss(index, value, total, expr) {
        const newValue = value;
        // if (total < newValue) {
        //     return;
        // }

        if (Math.round(total) === Math.round(newValue)) {
            this.myArr.push(newValue);
            console.log(expr);
            
        }
        if (index === this.valuesPlayer.length) {
            return;
        }
        if (index === 0) {
            for (let i = 1; i <= 20; i++) {
                expr += '+' + i;
                this.ssss(index + 1, newValue + i * this.ratios[index], total, expr);
            }
        } else {
            for (let i = 0.1; i <= 20; i += 0.1) {
                expr += '+' + i;
                this.ssss(index + 1,  newValue + i * this.ratios[index], total, expr);
            }
        }
    }
}
