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
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('openClose', [
            state('closed', style({ transform: 'translateX(120%)'})),
            state('open', style({ transform: 'translateX(0)'})),
            transition('closed => open', [
                animate('is-ease-in')
            ]),
            
        ]
        
        )
        ],
   

        
   
    })
    
export class LoginComponent implements OnInit {
    
    formGroup: FormGroup;
    protected menuState: 'open' | 'closed' = 'closed';
    protected menuOpen = false;
    constructor(
        private router: Router,
        private ApiService: ApiService,
        private tokenStorageService: TokenStorageService,
        private renderer: Renderer2,
        private fb: FormBuilder
    ) 
    {}
    
    

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            
            username: new FormControl('', [Validators.required, Validators.minLength(6)]),
                
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
        
        this.formGroup = this.fb.group({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }
    isActive = true;
    
    
    onLogin() {
    
        const loginApi: string =
            'https://hcp-api-stg.genesolutions.vn/api/HCP/Login';
     
        const val = this.formGroup.value;
        // const loginObj: any = {
        //     username: 'doctor2',
        //     password: 'P@ssw0rd'
        // };
        this.ApiService.getData(loginApi).subscribe((data: any) => {
            return this.ApiService.getData(loginApi);
        });

        this.ApiService.login(val).subscribe((data: any) => {
            console.log(data);
            if (data.StatusCode == 200) {
                this.tokenStorageService.saveToken(data.Data);
                // alert('Login Success');
                this.router.navigateByUrl('homepage');
            } else {
                console.log(this.formGroup.value);
            }
        });
        
    }
     

    logout(){
        this.tokenStorageService.signOut();
        this.router.navigateByUrl('login');
    }


      @HostListener('document:mousemove', ['$event']) 
    update(e) {
    var x = e.clientX || e.touches[0].clientX
    var y = e.clientY || e.touches[0].clientY
  
    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
    console.log(e);
  }

  
nbElements = 50; // Number of stars & sparkles

// CSS Classes available
// shapes = ['sparkle', 'star'];
// sizes = ['','medium', 'small'];
// styles = ['', 'alt', 'alt2'];
// animations = ['pulse', 'pulse-1', 'pulse-2', 'pulse-3'];


  
  
     


    

//     @HostBinding('class') class = 'login-box';
//     public loginForm: UntypedFormGroup;
//     public isAuthLoading = false;
//     public isGoogleLoading = false;
//     public isFacebookLoading = false;

//     constructor(
//         private renderer: Renderer2,
//         private toastr: ToastrService,
//         private appService: AppService
//     ) {}
//PANDA 
}
// PANDA 
// @HostListener('document:mousemove', ['$event']) 
// (document).on( "mousemove", function( event ) {
//     var dw = (document).width() / 15;
//     var dh = (document).height() / 15;
//     var x = event.pageX/ dw;
//     var y = event.pageY/ dh;
//     ('.eye-ball').css({
//       width : x,
//       height : y
//     });
//   });

bootstrapApplication(LoginComponent, {
    providers: [provideAnimationsAsync()
    ]
  });