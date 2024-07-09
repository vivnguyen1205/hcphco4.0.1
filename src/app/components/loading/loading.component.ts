import { CommonModule } from '@angular/common';
import {Component, HostBinding} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Input } from '@angular/core';

@Component({
    selector: 'app-loading',
    standalone  : true,
    imports    : [CommonModule],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss'
})
export class LoadingComponent {
    @HostBinding('class') class =
        'preloader flex-column justify-content-center align-items-center';
        @Input() isLoading: boolean = false;
}
