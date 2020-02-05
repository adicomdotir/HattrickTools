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
    rating = 0;
    localTeamSpirits = TEAM_SPIRITS;
    teamSpirit = 0;
    spiritItems = [0.79, 0.86, 0.93, 1.00, 1.07, 1.14, 1.21, 1.28, 1.35, 1.42];

    constructor(private router: Router, private httpClient: HttpClient) { }

    ngOnInit() {
        if (localStorage.getItem('POSITION')) {
            this.players = JSON.parse(localStorage.getItem('POSITION'));
            this.calculateRating();
        } else {
            this.httpClient.get<Player[]>("./assets/position.json").subscribe({
                next: (next) => {
                    localStorage.setItem('POSITION', JSON.stringify(next));
                    this.players = next;
                    this.calculateRating();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    calculateRating() {
        this.rating = 0;
        let player1 = this.getPlayerScore(this.players[0]);
        let player2 = this.getPlayerScore(this.players[1]);
        this.rating = player1 + player2;
        let player3 = this.getPlayerScore(this.players[2]);
        let player4 = this.getPlayerScore(this.players[3]);
        let player5 = this.getPlayerScore(this.players[4]);
        let ceoMultiple = this.getMultipleCeo(this.players[2], this.players[3], this.players[4]);
        this.rating += (player3 * ceoMultiple) + (player4 * ceoMultiple) + (player5 * ceoMultiple);
        let player6 = this.getPlayerScore(this.players[5]);
        let player7 = this.getPlayerScore(this.players[6]);
        this.rating += player6 + player7;
        let player8 = this.getPlayerScore(this.players[7]);
        let player9 = this.getPlayerScore(this.players[8]);
        let player10 = this.getPlayerScore(this.players[9]);
        ceoMultiple = this.getMultipleCeo(this.players[7], this.players[8], this.players[9]);
        this.rating += (player8 * ceoMultiple) + (player9 * ceoMultiple) + (player10 * ceoMultiple);
        let player11 = this.getPlayerScore(this.players[10]);
        this.rating += player11;
        let player12 = this.getPlayerScore(this.players[11]);
        let player13 = this.getPlayerScore(this.players[12]);
        let player14 = this.getPlayerScore(this.players[13]);
        ceoMultiple = this.getMultipleCeo(this.players[11], this.players[12], this.players[13]);
        this.rating += (player12 * ceoMultiple) + (player13 * ceoMultiple) + (player14 * ceoMultiple);
        this.rating = Math.round(this.rating * 4 * this.spiritItems[this.teamSpirit]) + 3;
        this.rating /= 4;
    }

    getPlayerScore(pl: Player) {
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

    getLoyaltyText(pl: Player) {
        if (pl.motherClub) {
            return '&#10084;';
        }
        return pl.loyalty;
    }

    changeSpirit() {
        this.calculateRating();
    }

}
