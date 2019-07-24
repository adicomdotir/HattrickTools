import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TEAM_SPIRITS, SKILL_NUMBER, SKILL_ENG } from '../../../config/values';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    localTeamSpirits = TEAM_SPIRITS;
    skillNumbers = SKILL_NUMBER;
    skillEngStrings = SKILL_ENG;
    rateValues = [1, 1, 1, 1, 1, 1, 1];
    defaultValues = [1, 1, 1, 1, 1, 1, 1];
    defRate = 3;
    midRate = 3;
    midDefaultRate = 0;
    attRate = 3;
    newMidRate = 1;
    intNewMidRate = 1;
    floatNewMidRate = 0;
    filter = [100, 100, 100];
    spiritItems = [
        [72, 86, 93, 100, 107, 114, 121, 128, 135, 142], // normal
        [81, 97, 105, 113, 122, 130, 138, 146, 154, 162], // mots
        [63, 75, 81, 87, 92, 98, 104, 110, 116, 122] // pic
    ];
    oldSpirit = 0;
    newSpirit = 0;
    negaresh = 1;

    constructor(private router: Router) { }

    ngOnInit() { }

    skillInputChange(pos, event) {
        let value = event.target.value;

        if (value < 0 || value >= 21) {
            value = 0;
        }

        let intValue = Math.floor(value);
        let floatValue = value - intValue;
        floatValue = floatValue * 4;
        intValue = intValue * 4 - 3 + floatValue;

        switch (pos) {
            case 'LD':
                this.rateValues[0] = intValue;
                break;
            case 'CD':
                this.rateValues[1] = intValue;
                break;
            case 'RD':
                this.rateValues[2] = intValue;
                break;
            case 'M':
                this.rateValues[3] = intValue;
                break;
            case 'LA':
                this.rateValues[4] = intValue;
                break;
            case 'CA':
                this.rateValues[5] = intValue;
                break;
            case 'RA':
                this.rateValues[6] = intValue;
                break;
        }

        this.calculateRating();
    }

    calculateRating() {
        // Rating
        this.defRate = (this.rateValues[0] + this.rateValues[1] + this.rateValues[2]);
        this.midRate = (this.rateValues[3] * 3);
        this.midDefaultRate = this.midRate;

        this.midRate = this.midRate * this.filter[0] / 100;
        this.midRate = this.midRate * this.filter[1] / 100;
        this.midRate = this.midRate * this.filter[2] / 100;

        this.midRate = Math.floor(this.midRate);
        this.midDefaultRate -= this.midRate;
        this.midDefaultRate *= -1;
        this.attRate = (this.rateValues[4] + this.rateValues[5] + this.rateValues[6]);

        this.newMidRate = Math.round(this.midRate / 3);
        this.intNewMidRate = Math.floor((this.newMidRate + 3) / 4);
        this.floatNewMidRate = ((this.newMidRate + 3) / 4) - this.intNewMidRate;

        // var color = 'black';
        // if (this.rateValues[3] < arr3) color = 'green';
        // if (this.rateValues[3] > arr3) color = 'red';
        // $('#mDiff').css('color', color);
    }

    getAverage(value) {
        return Math.round(value / 3);
    }

    filterClick(type, value) {
        if (type === 1) {
            switch (value) {
                case 1:
                    this.changeNegaresh(1);
                    break;
                case 2:
                    this.changeNegaresh(2);
                    break;
                case 3:
                    this.changeNegaresh(3);
                    break;
            }
        } else if (type === 2) {
            switch (value) {
                case 1:
                    this.filter[1] = 100;
                    break;
                case 2:
                    this.filter[1] = 119.892;
                    break;
                case 3:
                    this.filter[1] = 111.493;
                    break;
            }
        } else if (type === 3) {
            switch (value) {
                case 1:
                    this.filter[2] = 100;
                    break;
                case 2:
                    this.filter[2] = 93;
                    break;
            }
        }
        this.calculateRating();
    }

    changeNegaresh(value) {
        this.negaresh = value;
        const temp = this.spiritItems[value - 1][this.newSpirit] - this.spiritItems[0][this.oldSpirit];
        this.filter[0] = 100 + temp;
    }

    changeSpirit() {
        this.changeNegaresh(this.negaresh);
        this.calculateRating();
    }
}
