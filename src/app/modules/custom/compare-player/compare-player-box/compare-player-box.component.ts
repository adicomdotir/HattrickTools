import { Component, OnInit, Input } from '@angular/core';
import { POSITIONS } from 'src/app/config/position';

@Component({
    selector: 'app-compare-player-box',
    templateUrl: './compare-player-box.component.html',
    styleUrls: ['./compare-player-box.component.css']
})
export class ComparePlayerBoxComponent implements OnInit {

    @Input() position: string;
    inputs: any[] = [];

    constructor() { }

    ngOnInit() {
        const id = parseInt(this.position, 10);
        const currentPosition = POSITIONS[id]);
        for (const key in currentPosition) {
            if (currentPosition.hasOwnProperty(key)) {
                const value = currentPosition[key];
                this.inputs.push(key);
            }
        }
    }

}
