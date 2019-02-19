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
    midDefaultRate = 3;
    attRate = 3;
    newMidRate = 1;
    intNewMidRate = 1;
    floatNewMidRate = 0;

    constructor(private router: Router) { }

    ngOnInit() { }

    skillInputChange(pos, event) {
        let value = event.target.value;

        if (value < 0 || value > 20) value = 0;

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
        // mid = mid * filter[0] / 100;
        // mid = mid * filter[1] / 100;
        // mid = mid * filter[2] / 100;
        this.midRate = Math.floor(this.midRate);
        this.midDefaultRate -= this.midRate;
        this.midDefaultRate *= -1;
        // var myClass = 'black';
        // if (midDefualt > 0) myClass = 'green';
        // if (midDefualt < 0) myClass = 'red';
        this.attRate = (this.rateValues[4] + this.rateValues[5] + this.rateValues[6]);

        this.newMidRate = Math.round(this.midRate / 3);
        this.intNewMidRate = Math.floor((this.newMidRate + 3) / 4);
        this.floatNewMidRate = ((this.newMidRate + 3) / 4) - this.intNewMidRate;
        
        // var color = 'black';
        // if (this.rateValues[3] < arr3) color = 'green';
        // if (this.rateValues[3] > arr3) color = 'red';
        // $('#mDiff').val(intNewMidRate + floatNewMidRate);
        // $('#mDiff').css('color', color);
    
        // // Average Rating
        // $('#ave_def').html('Ave Defence: ' + Math.round(def / 3));
        // $('#ave_mid').html('Ave Midfield: ' + Math.round(mid / 3));
        // $('#ave_att').html('Ave Attack: ' + Math.round(att / 3));
        // $('#ave_total').html('Ave Total: ' + Math.round((def / 3 + mid / 3 + att / 3) / 3));
    }
    
    getAverage(value) {
        return Math.round(value / 3);
    }
}
