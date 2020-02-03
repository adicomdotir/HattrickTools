import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/shared/models/player';

@Component({
    selector: 'app-custom-rating',
    templateUrl: './custom-rating.component.html',
    styleUrls: ['./custom-rating.component.css']
})
export class CustomRatingComponent implements OnInit {

    players: Player[] = [];
    rating = 0;

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
        this.players.forEach(x => {
            this.rating += x.coeMidfield * (x.playMaking + this.getLoyaltyCeo(x.loyalty))
        });
        this.rating = Math.round(this.rating * 4);
        this.rating /= 4;
    }

    getLoyaltyCeo(loyalty) {
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

}
