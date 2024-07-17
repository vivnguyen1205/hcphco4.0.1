import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import {environment} from 'environments/environment';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import { LoadingComponent } from '@components/loading/loading.component';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // animations: [
    //     trigger('routerTransition', [
    //       transition('* <=> *', [    
    //         query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
    //         group([ 
    //           query(':enter', [
    //             style({ transform: 'translateX(100%)' }),
    //             animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    //           ]),
    //           query(':leave', [
    //             style({ transform: 'translateX(0%)' }),
    //             animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
    //         ])
    //       ])
    //     ])
    //    ],
     
})
export class AppComponent implements OnInit{

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    getState(outlet) {
        // Changing the activatedRouteData.state triggers the animation
        return outlet.activatedRouteData.state;
      }
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
