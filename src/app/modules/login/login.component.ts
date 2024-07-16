import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokenStorageService } from './../../services/token-storage.service';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ApiService} from './../../services/api.service';
import {ElementRef, Input} from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"  
import { EventListenerObject } from 'rxjs/internal/observable/fromEvent';
// import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HostListener } from '@angular/core';
import { compass } from 'ngx-bootstrap-icons';
// import { DotLottie } from '@lottiefiles/dotlottie-js';
import {

    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
    UntypedFormGroup,
    UntypedFormControl,
    Validators,
    FormsModule,
    NgModel,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {HTMLInputELement} from '@angular/forms';
// import {ViewChild, AfterViewInit } from '@angular/core';
import {ViewChild, AfterViewInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {group, query} from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('closed', style({ transform: 'translateX(120%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('closed => open', [
        animate('is-ease-in')
      ]),
    ]),
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
        ],
    })
export class LoginComponent implements OnInit {
  

  formGroup: FormGroup;
  protected menuState: 'open' | 'closed' = 'closed';
  protected menuOpen = false;
  current_star_count = 0;
  readonly MAX_STARS = 60;
  readonly STAR_INTERVAL = 16;
  readonly MAX_STAR_LIFE = 3;
  readonly MIN_STAR_LIFE = 1;
  readonly MAX_STAR_SIZE = 70;
  readonly MIN_STAR_SIZE = 30;
  readonly MIN_STAR_TRAVEL_X = 100;
  readonly MIN_STAR_TRAVEL_Y = 100;
  sparkle: HTMLElement;

  constructor(
    private router: Router,
    private ApiService: ApiService,
    private tokenStorageService: TokenStorageService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    
    this.formGroup = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  getState(outlet) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
  onLogin() {
    const loginApi: string = 'https://hcp-api-stg.genesolutions.vn/api/HCP/Login';
    const val = this.formGroup.value;

    this.ApiService.getData(loginApi).subscribe((data: any) => {
      return this.ApiService.getData(loginApi);
    });

    this.ApiService.login(val).subscribe((data: any) => {
      console.log(data);
      if (data.StatusCode == 200) {
        this.tokenStorageService.saveToken(data.Data);
        this.router.navigateByUrl('homepage');
      } else {
        console.log(this.formGroup.value);
      }
    });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('login');
  }

  @HostListener('document:mousemove', ['$event'])
  update(e: MouseEvent | TouchEvent) {
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
    console.log(e);
  }

 


}



bootstrapApplication(LoginComponent, {
  providers: [provideAnimationsAsync()]
});
