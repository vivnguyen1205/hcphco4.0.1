import { TokenStorageService } from './../../services/token-storage.service';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ApiService} from './../../services/api.service';
import {ElementRef, Input} from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"  
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

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private router: Router,
        private ApiService: ApiService,
        private tokenStorageService: TokenStorageService,
        private renderer: Renderer2,
        private fb: FormBuilder
    ) {}

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

}