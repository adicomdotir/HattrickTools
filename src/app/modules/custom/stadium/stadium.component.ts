import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stadium',
    templateUrl: './stadium.component.html',
    styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {

    terraces = 0;
    basic = 0;
    roof = 0;
    vip = 0;
    income = 0;
    weekly_cost = 0;

    arenasize = 0;
    terper = 0;
    basper = 0;
    roofper = 0;
    vipper = 0;

    constructor() { }

    ngOnInit() {
    }
    
    fancalc() {

        let fans_number = 2200;
        let fans_mood = 0;
        let coef = 0;

        if (fans_mood === 0) {
            coef = 10;
        } else if (fans_mood === 1) {
            coef = 11.3;
        } else if (fans_mood === 2) {
            coef = 12.6;
        } else if (fans_mood === 3) {
            coef = 13.9;
        } else if (fans_mood === 4) {
            coef = 15.2;
        } else if (fans_mood === 5) {
            coef = 16.5;
        } else if (fans_mood === 6) {
            coef = 17.8;
        } else if (fans_mood === 7) {
            coef = 19.1;
        } else if (fans_mood === 8) {
            coef = 20.4;
        } else if (fans_mood === 9) {
            coef = 21.7;
        } else if (fans_mood === 10) {
            coef = 23;
        } else if (fans_mood === 11) {
            coef = 24.3;
        }

        let total_fan = fans_number * coef;
        this.terraces = Math.floor(0.6 * total_fan);
        this.basic = Math.floor(0.235 * total_fan);
        this.roof = Math.floor(0.14 * total_fan);
        this.vip = Math.floor(0.025 * total_fan);

        this.income = Math.ceil(7 * this.terraces + 10 * this.basic + 19 * this.roof + 35 * this.vip);
        this.weekly_cost = Math.ceil(0.5 * this.terraces + 0.7 * this.basic + this.roof + 2.5 * this.vip);

        // let tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
        let realterraces = ''; //tableobj.rows[0].cells[1].innerHTML;
        let realbasic = ''; //tableobj.rows[1].cells[1].innerHTML;
        let realroof = ''; //tableobj.rows[2].cells[1].innerHTML;
        let realvip = ''; //tableobj.rows[3].cells[1].innerHTML;
        let realtotal = ''; //tableobj.rows[4].cells[1].innerHTML;

        if (realterraces != "") {
            // let newterrances = terraces - realterraces;
            // let newbasic = basic - realbasic;
            // let newroof = roof - realroof;
            // let newvip = vip - realvip;

            // tableobj.rows[0].cells[2].innerHTML = newterrances;
            // tableobj.rows[1].cells[2].innerHTML = newbasic;
            // tableobj.rows[2].cells[2].innerHTML = newroof;
            // tableobj.rows[3].cells[2].innerHTML = newvip;
            // tableobj.rows[4].cells[2].innerHTML = (terraces + basic + roof + vip) - realtotal;
            // tableobj.rows[7].cells[2].innerHTML = constructioncost(newterrances, newbasic, newroof, newvip) + "€";
        }

        // tableobj.rows[0].cells[3].innerHTML = terraces;
        // tableobj.rows[1].cells[3].innerHTML = basic;
        // tableobj.rows[2].cells[3].innerHTML = roof;
        // tableobj.rows[3].cells[3].innerHTML = vip;
        // tableobj.rows[4].cells[3].innerHTML = terraces + basic + roof + vip;
        // tableobj.rows[5].cells[3].innerHTML = income + "€";
        // tableobj.rows[6].cells[3].innerHTML = weekly_cost + "€";



    };


    sizecalc() {
        
        let totalsize = this.arenasize;
        let terper = this.terper;
        let basper = this.basper;
        let roofper = this.roofper;
        let vipper = this.vipper;

        this.terraces = Math.round(terper / 100 * totalsize);
        this.basic = Math.round(basper / 100 * totalsize);
        this.roof = Math.round(roofper / 100 * totalsize);
        this.vip = Math.round(vipper / 100 * totalsize);

        let dif = totalsize - (this.terraces + this.basic + this.roof + this.vip)
        if (dif !== 0) {
            this.vip += dif
        }

        this.income = Math.ceil(7 * this.terraces + 10 * this.basic + 19 * this.roof + 35 * this.vip);
        this.weekly_cost = Math.ceil(0.5 * this.terraces + 0.7 * this.basic + this.roof + 2.5 * this.vip);

        // let tableobj = document.getElementById('resultstable').getElementsByTagName('tbody')[0];
        // realterraces = tableobj.rows[0].cells[1].innerHTML;
        // realbasic = tableobj.rows[1].cells[1].innerHTML;
        // realroof = tableobj.rows[2].cells[1].innerHTML;
        // realvip = tableobj.rows[3].cells[1].innerHTML;
        // realtotal = tableobj.rows[4].cells[1].innerHTML;

        // if (realterraces != "") {
        //     let newterrances = terraces - realterraces;
        //     let newbasic = basic - realbasic;
        //     let newroof = roof - realroof;
        //     let newvip = vip - realvip;

        //     tableobj.rows[0].cells[2].innerHTML = newterrances;
        //     tableobj.rows[1].cells[2].innerHTML = newbasic;
        //     tableobj.rows[2].cells[2].innerHTML = newroof;
        //     tableobj.rows[3].cells[2].innerHTML = newvip;
        //     tableobj.rows[4].cells[2].innerHTML = (terraces + basic + roof + vip) - realtotal;
        //     tableobj.rows[7].cells[2].innerHTML = constructioncost(newterrances, newbasic, newroof, newvip) + "€";
        // }

        // tableobj.rows[0].cells[3].innerHTML = terraces;
        // tableobj.rows[1].cells[3].innerHTML = basic;
        // tableobj.rows[2].cells[3].innerHTML = roof;
        // tableobj.rows[3].cells[3].innerHTML = vip;
        // tableobj.rows[4].cells[3].innerHTML = terraces + basic + roof + vip;
        // tableobj.rows[5].cells[3].innerHTML = income + "€";
        // tableobj.rows[6].cells[3].innerHTML = weekly_cost + "€";
    }


    constructioncost(terraces, basic, roof, vip) {
        let sumi = 10000

        if (terraces > 0) {
            sumi += Math.abs(terraces) * 45
        } else {
            sumi += Math.abs(terraces) * 6
        }

        if (basic > 0) {
            sumi += Math.abs(basic) * 75
        } else {
            sumi += Math.abs(basic) * 6
        }

        if (roof > 0) {
            sumi += Math.abs(roof) * 90
        } else {
            sumi += Math.abs(roof) * 6
        }

        if (vip > 0) {
            sumi += Math.abs(vip) * 300
        } else {
            sumi += Math.abs(vip) * 6
        }

        return sumi

    }
}
