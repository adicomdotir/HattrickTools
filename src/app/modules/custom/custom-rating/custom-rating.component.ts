import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/shared/models/player';
import { TEAM_SPIRITS } from 'src/app/config/values';

@Component({
    selector: 'app-custom-rating',
    templateUrl: './custom-rating.component.html',
    styleUrls: ['./custom-rating.component.css']
})
export class CustomRatingComponent implements OnInit {

    players: Player[] = [];
    midfieldRating = 0;
    rdRating = 0;
    cdRating = 0;
    ldRating = 0;
    raRating = 0;
    caRating = 0;
    laRating = 0;
    localTeamSpirits = TEAM_SPIRITS;
    teamSpirit = 0;
    spiritItems = [0.79, 0.86, 0.93, 1.00, 1.07, 1.14, 1.21, 1.28, 1.35, 1.42];

    constructor(private router: Router, private httpClient: HttpClient) { }

    ngOnInit() {
        if (localStorage.getItem('POSITION')) {
            this.players = JSON.parse(localStorage.getItem('POSITION'));
            this.calculateMidfieldRating();
            this.calculateDefenceRating();
        } else {
            this.httpClient.get<Player[]>("./assets/position.json").subscribe({
                next: (next) => {
                    localStorage.setItem('POSITION', JSON.stringify(next));
                    this.players = next;
                    this.calculateMidfieldRating();
                    this.calculateDefenceRating();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    calculateMidfieldRating() {
        this.midfieldRating = 0;
        let player1 = this.getMidfieldPlayerScore(this.players[0]);
        let player2 = this.getMidfieldPlayerScore(this.players[1]);
        this.midfieldRating = player1 + player2;
        let player3 = this.getMidfieldPlayerScore(this.players[2]);
        let player4 = this.getMidfieldPlayerScore(this.players[3]);
        let player5 = this.getMidfieldPlayerScore(this.players[4]);
        let ceoMultiple = this.getMultipleCeo(this.players[2], this.players[3], this.players[4]);
        this.midfieldRating += (player3 * ceoMultiple) + (player4 * ceoMultiple) + (player5 * ceoMultiple);
        let player6 = this.getMidfieldPlayerScore(this.players[5]);
        let player7 = this.getMidfieldPlayerScore(this.players[6]);
        this.midfieldRating += player6 + player7;
        let player8 = this.getMidfieldPlayerScore(this.players[7]);
        let player9 = this.getMidfieldPlayerScore(this.players[8]);
        let player10 = this.getMidfieldPlayerScore(this.players[9]);
        ceoMultiple = this.getMultipleCeo(this.players[7], this.players[8], this.players[9]);
        this.midfieldRating += (player8 * ceoMultiple) + (player9 * ceoMultiple) + (player10 * ceoMultiple);
        let player11 = this.getMidfieldPlayerScore(this.players[10]);
        this.midfieldRating += player11;
        let player12 = this.getMidfieldPlayerScore(this.players[11]);
        let player13 = this.getMidfieldPlayerScore(this.players[12]);
        let player14 = this.getMidfieldPlayerScore(this.players[13]);
        ceoMultiple = this.getMultipleCeo(this.players[11], this.players[12], this.players[13]);
        this.midfieldRating += (player12 * ceoMultiple) + (player13 * ceoMultiple) + (player14 * ceoMultiple);
        this.midfieldRating = Math.round(this.midfieldRating * 4 * this.spiritItems[this.teamSpirit]) + 3;
        this.midfieldRating /= 4;
    }

    calculateDefenceRating() {
        this.rdRating = 0;
        this.cdRating = 0;
        this.ldRating = 0;
        let player1 = this.getCentralDefencePlayerScore(this.players[0]);
        this.cdRating += player1;
        player1 = this.getCentralGkPlayerScore(this.players[0]);
        this.cdRating += player1;
        player1 = this.getSideDefencePlayerScore(this.players[0]);
        this.rdRating += player1;
        this.ldRating += player1;
        player1 = this.getSideGkPlayerScore(this.players[0]);
        this.rdRating += player1;
        this.ldRating += player1;
        let player2 = this.getCentralDefencePlayerScore(this.players[1]);
        this.cdRating += player2;
        player2 = this.getSideDefencePlayerScore(this.players[1]);
        this.rdRating += player2;
        let player3 = this.getCentralDefencePlayerScore(this.players[2]);
        let player4 = this.getCentralDefencePlayerScore(this.players[3]);
        let player5 = this.getCentralDefencePlayerScore(this.players[4]);
        let ceoMultiple = this.getMultipleCeo(this.players[2], this.players[3], this.players[4]);
        this.cdRating += (player3 * ceoMultiple) + (player4 * ceoMultiple) + (player5 * ceoMultiple);
        player3 = this.getSideDefencePlayerScore(this.players[2]);
        player4 = this.getSideDefencePlayerScore(this.players[3]);
        player5 = this.getSideDefencePlayerScore(this.players[4]);
        this.rdRating += (player3 * ceoMultiple) + (player4 * ceoMultiple);
        this.ldRating += (player4 * ceoMultiple) + (player5 * ceoMultiple);
        let player6 = this.getCentralDefencePlayerScore(this.players[5]);
        this.cdRating += player6;
        player6 = this.getSideDefencePlayerScore(this.players[5]);
        this.ldRating += player6;
        let player7 = this.getCentralDefencePlayerScore(this.players[6]);
        this.cdRating += player7;
        player7 = this.getSideDefencePlayerScore(this.players[6]);
        this.rdRating += player7;
        let player8 = this.getCentralDefencePlayerScore(this.players[7]);
        let player9 = this.getCentralDefencePlayerScore(this.players[8]);
        let player10 = this.getCentralDefencePlayerScore(this.players[9]);
        ceoMultiple = this.getMultipleCeo(this.players[7], this.players[8], this.players[9]);
        this.cdRating += (player8 * ceoMultiple) + (player9 * ceoMultiple) + (player10 * ceoMultiple);
        player8 = this.getSideDefencePlayerScore(this.players[7]);
        player9 = this.getSideDefencePlayerScore(this.players[8]);
        player10 = this.getSideDefencePlayerScore(this.players[9]);
        this.rdRating += (player8 * ceoMultiple) + (player9 * ceoMultiple);
        this.ldRating += (player9 * ceoMultiple) + (player10 * ceoMultiple);
        let player11 = this.getCentralDefencePlayerScore(this.players[10]);
        this.cdRating += player11;
        player11 = this.getSideDefencePlayerScore(this.players[10]);
        this.ldRating += player11;        

        this.cdRating = Math.round(this.cdRating * 4 * this.spiritItems[this.teamSpirit]) + 3;
        this.cdRating /= 4;
        this.rdRating = Math.round(this.rdRating * 4 * this.spiritItems[this.teamSpirit]) + 3;
        this.rdRating /= 4;
        this.ldRating = Math.round(this.ldRating * 4 * this.spiritItems[this.teamSpirit]) + 3;
        this.ldRating /= 4;
    }

    getCentralDefencePlayerScore(pl: Player) {
        if (pl.visibility) {
            return pl.ceoCentralDefence * (pl.defending + this.getLoyaltyCeo(pl.loyalty, pl.motherClub));
        }
        return 0;
    }

    getSideDefencePlayerScore(pl: Player) {
        if (pl.visibility) {
            return pl.ceoSideDefence * (pl.defending + this.getLoyaltyCeo(pl.loyalty, pl.motherClub));
        }
        return 0;
    }

    getCentralGkPlayerScore(pl: Player) {
        if (pl.visibility) {
            return pl.ceoCentralGk * (pl.goalkeeping + this.getLoyaltyCeo(pl.loyalty, pl.motherClub));
        }
        return 0;
    }

    getSideGkPlayerScore(pl: Player) {
        if (pl.visibility) {
            return pl.ceoSideGk * (pl.goalkeeping + this.getLoyaltyCeo(pl.loyalty, pl.motherClub));
        }
        return 0;
    }

    getMidfieldPlayerScore(pl: Player) {
        if (pl.visibility) {
            return pl.coeMidfield * (pl.playMaking + this.getLoyaltyCeo(pl.loyalty, pl.motherClub));
        }
        return 0;
    }

    getLoyaltyCeo(loyalty, motherClub) {
        if (motherClub) {
            return 1.5;
        }
        const loyalties = [
            0.0000,
            0.0526,
            0.1053,
            0.1579,
            0.2105,
            0.2632,
            0.3158,
            0.3684,
            0.4211,
            0.4737,
            0.5263,
            0.5789,
            0.6316,
            0.6842,
            0.7368,
            0.7895,
            0.8421,
            0.8947,
            0.9474,
            1.0000
        ];
        return loyalties[loyalty - 1];
    }

    selectPosition(position) {
        this.router.navigateByUrl(`detail/${position}`);
    }

    getMultipleCeo(playerX: Player, playerY: Player, playerZ: Player) {
        let counter = 0;
        if (playerX.visibility) {
            counter++;
        }
        if (playerY.visibility) {
            counter++;
        }
        if (playerZ.visibility) {
            counter++;
        }
        if (counter === 3) {
            return 0.825;
        } else if (counter === 2) {
            return 0.935;
        }
        return 1;
    }

    changeSpirit() {
        this.calculateMidfieldRating();
        this.calculateDefenceRating();
    }

}
