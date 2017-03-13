import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class ProductService {
	static get parameters() {
		return [[Http]];
	}

	constructor(private http:Http){}
}