import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationComponent } from '@pages/notification/notification.component';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
// import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';
import { MenuSidebarComponent } from '@modules/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from '@modules/register/register.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesComponent } from '@modules/main/header/messages/messages.component';
import { NotificationsComponent } from '@modules/main/header/notifications/notifications.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserComponent } from '@modules/main/header/user/user.component';
import { ForgotPasswordComponent } from '@modules/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from '@modules/recover-password/recover-password.component';
import { LanguageComponent } from '@modules/main/header/language/language.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { SubMenuComponent } from './pages/main-menu/sub-menu/sub-menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ControlSidebarComponent } from './modules/main/control-sidebar/control-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/reducer';
import { uiReducer } from './store/ui/reducer';
import { ProfabricComponentsModule } from '@profabric/angular-components';
// import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from 'environments/environment';
import { ActivityTabComponent } from './pages/profile/activity-tab/activity-tab.component';
// import {TimelineTabComponent} from './pages/profile/timeline-tab/timeline-tab.component';
import { SettingsTabComponent } from './pages/profile/settings-tab/settings-tab.component';
import { PostComponent } from './pages/profile/post/post.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { SmallBoxComponent } from './components/small-box/small-box.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomepageformComponent } from './components/homepageform/homepageform.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { ProfileComponent } from '@pages/profile/profile.component';
import { TableComponent } from './components/table/table.component';
import { Table } from 'primeng/table';
import { ImportsModule } from 'primeimports';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [

         NotificationComponent,
        // // BreakpointObserver,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        // RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        // MainMenuComponent,
        // SubMenuComponent,
        MenuItemComponent,
        ProfileComponent,
        ControlSidebarComponent,
        ActivityTabComponent,
        SettingsTabComponent,
        PostComponent,
        InfoBoxComponent,
        SmallBoxComponent,
        ContentHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        HomepageComponent,
        HomepageformComponent,
        AppComponent,
        // TableComponent

    ],
    bootstrap: [AppComponent],
    imports: [
        ImportsModule,
        CalendarModule,
        TableComponent,
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        StoreModule.forRoot({ auth: authReducer, ui: uiReducer }),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        FontAwesomeModule
    ],
    providers: [
        HomepageformComponent,
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ]
})
export class AppModule { }
