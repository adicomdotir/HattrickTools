import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TEAM_SPIRITS } from '../../../config/values';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    localTeamSpirits = TEAM_SPIRITS;
    constructor(private router: Router) { }

    ngOnInit() { }
}
