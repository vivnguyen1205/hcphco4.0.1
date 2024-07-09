import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {environment} from 'environments/environment';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import { LoadingComponent } from '@components/loading/loading.component';

import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    isLoading: boolean = true;
    constructor(
        
        public responsive: BreakpointObserver,
        private router: Router,
        protected $gaService: GoogleAnalyticsService
    ) {
        setTimeout(() => {
            this.isLoading = false;
            
        }, 3000);
        this.router.events.subscribe((event: Event) => {
            if (
                event instanceof NavigationEnd &&
                environment.NODE_ENV === 'production'
            ) {
                this.$gaService.pageView(event.url);
            }
        });
    }
    ngOnInit(): void {
        this.responsive.observe(Breakpoints.Handset).subscribe((state: BreakpointState) => {
            if (state.matches) {
                console.log('This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.');
            } 
        });
    }
}
