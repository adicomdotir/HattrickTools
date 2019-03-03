import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../../../node_modules/@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private translate: TranslateService) {}

    ngOnInit() {}

    init() {}

    changeLanguage(event) {
        this.translate.use(event.target.value);
    }
}