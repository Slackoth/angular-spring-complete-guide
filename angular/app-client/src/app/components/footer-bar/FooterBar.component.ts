import { Component } from "@angular/core";

@Component({
    selector: 'footer-bar',
    templateUrl: './FooterBar.component.html',
    styleUrls: ['./FooterBar.component.css']
})
export class FooterBarComponent {
    author: any = {name: 'Luis', lastname: 'Perla'}
}