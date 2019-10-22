import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'HattrickTools';
	lang = '';
	dir = '';

	constructor(public translate: TranslateService) {
		translate.addLangs(['en', 'fa']);
		translate.use('en');
		translate.onLangChange.subscribe((value) => {
			this.lang = value.lang;
			if (value.lang == 'en') {
				//    this.dir = 'ltr';
			} else if (value.lang == 'fa') {
				//    this.dir = 'rtl';
			}
		});
	}
}

class Team {
	id: number;
	name: string;
}
