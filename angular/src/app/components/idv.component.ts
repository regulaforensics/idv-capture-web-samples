import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type IdvWebComponent } from '@regulaforensics/idv-capture-web';
@Component({
    selector: 'app-idv',
    templateUrl: './idv.component.html',
    styleUrls: ['./idv.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IdvComponent implements AfterViewInit {
    @ViewChild('idv', { static: false }) idv?: ElementRef<IdvWebComponent>;

    ngAfterViewInit() {
        if (!this.idv) return;
    }
}
