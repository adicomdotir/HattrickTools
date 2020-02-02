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

    constructor(private router: Router, private httpClient: HttpClient) { }

    ngOnInit() {
        if (localStorage.getItem('POSITION')) {
            this.players = JSON.parse(localStorage.getItem('POSITION'));
        } else {
            this.httpClient.get<Player[]>("./assets/position.json").subscribe({
                next: (next) => {
                    localStorage.setItem('POSITION', JSON.stringify(next));
                    this.players = next;
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }

    selectPosition(position) {
        this.router.navigateByUrl(`detail/${position}`);
    }

}
