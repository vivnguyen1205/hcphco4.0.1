import {AppState} from '@/store/state';
import {ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    AfterViewInit,
    Component,
    HostBinding,
    OnInit,
    Renderer2
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
    trigger('routerTransition', [
        transition('* <=> *', [    
          query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
          group([ 
            query(':enter', [
              style({ transform: 'translateX(100%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ]),
            query(':leave', [
              style({ transform: 'translateX(0%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
          ])
        ])
      ])
    ]
     
})
export class MainComponent implements OnInit, AfterViewInit {
    @HostBinding('class') class = 'wrapper';
    public ui: Observable<UiState>;
    public appLoaded: boolean = false;

    constructor(
        private renderer: Renderer2,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.renderer.addClass(
            document.querySelector('app-root'),
            'layout-fixed'
        );

        this.ui.subscribe(
            ({menuSidebarCollapsed, controlSidebarCollapsed, darkMode}) => {
                if (menuSidebarCollapsed) {
                    this.renderer.removeClass(
                        document.querySelector('app-root'),
                        'sidebar-open'
                    );
                    this.renderer.addClass(
                        document.querySelector('app-root'),
                        'sidebar-collapse'
                    );
                } else {
                    this.renderer.removeClass(
                        document.querySelector('app-root'),
                        'sidebar-collapse'
                    );
                    this.renderer.addClass(
                        document.querySelector('app-root'),
                        'sidebar-open'
                    );
                }

                if (controlSidebarCollapsed) {
                    this.renderer.removeClass(
                        document.querySelector('app-root'),
                        'control-sidebar-slide-open'
                    );
                } else {
                    this.renderer.addClass(
                        document.querySelector('app-root'),
                        'control-sidebar-slide-open'
                    );
                }

                if (darkMode) {
                    this.renderer.addClass(
                        document.querySelector('app-root'),
                        'dark-mode'
                    );
                } else {
                    this.renderer.removeClass(
                        document.querySelector('app-root'),
                        'dark-mode'
                    );
                }
            }
        );
    }

    onToggleMenuSidebar() {
        this.store.dispatch(new ToggleSidebarMenu());
    }
    getState(outlet) {
        // Changing the activatedRouteData.state triggers the animation
        return outlet.activatedRouteData.state;
      }

    ngAfterViewInit() {
        this.appLoaded = true;
    }
}
