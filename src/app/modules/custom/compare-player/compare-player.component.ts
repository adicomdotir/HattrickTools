import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-compare-player',
    templateUrl: './compare-player.component.html',
    styleUrls: ['./compare-player.component.css']
})
export class ComparePlayerComponent implements OnInit {

    @ViewChild('p2p') p2p: ElementRef;
    @ViewChild('range') range: ElementRef;

    ngOnInit() { }

    tabClick(elementId) {
        if (elementId === 'p2p') {
            this.p2p.nativeElement.classList.add('active');
            this.range.nativeElement.classList.remove('active');
        } else {
            this.range.nativeElement.classList.add('active');
            this.p2p.nativeElement.classList.remove('active');
        }
    }
}
