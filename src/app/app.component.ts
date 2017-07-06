import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Http, Response }  from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	htmlCode: string;

	currentDoc: any;
	htmlExample: string;

	@ViewChild('codeView')
	private codeViewer: ElementRef;

	constructor(private http: Http, private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.loadAlertDoc();
	}

	public loadButtonDoc() {
		this.getButtonDoc().subscribe(
			result => {
				this.currentDoc = result;
				this.currentDoc.example = this.sanitizer.bypassSecurityTrustHtml(result.example);
				this.htmlExample = result.example;
			},
			error => {
				console.error("Arquivo não encontrado");
			}
		)
	}

	public loadAlertDoc() {
		this.getAlertDoc().subscribe(
			result => {
				this.currentDoc = result;
				this.htmlExample = result.example;
			},
			error => {
				console.error("Arquivo não encontrado");
			}
		)
	}

	private getButtonDoc() {
		return this.http.get('./assets/doc/button.json')
			.map(this.extractData)
			.catch(this.handleError);
	}

	private getAlertDoc() {
		return this.http.get('./assets/doc/alert.json')
			.map(this.extractData)
			.catch(this.handleError);
	}

	protected extractData(res: Response) {
		let body = res.json();
		return body || {};
	}

	protected handleError(error: Response) {
		let body = error.json();

		if (error.status == 400) {
			//console.error(error);
			//console.error(body.message);
		}

		return Observable.throw('ops');
	}
}
