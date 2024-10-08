import {PaginatorModule} from 'primeng/paginator';
import {openCloseAnimation} from './../menu-item/menu-item.animations';
import {ApiService} from './../../services/api.service';
import {Component, OnInit} from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule, NgForm} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgDatePickerModule} from 'ng-material-date-range-picker';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LoadingComponent } from '@components/loading/loading.component';
import { InfoDemo } from './popup/infodemo';
// import { LoadingComponent } from '@components/loading/loading.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormResetEvent } from '@angular/forms';
import { ScrollerModule } from 'primeng/scroller';
import {

    DialogService,
    DynamicDialogModule,
    DynamicDialogRef
} from 'primeng/dynamicdialog';
import {PopupComponent} from './popup/popup.component';
import {HomepageComponent} from '@pages/homepage/homepage.component';
import {ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CommonModule, DatePipe} from '@angular/common';
import {Table} from 'primeng/table';
import {ImportsModule} from 'primeimports';
import {SortEvent} from 'primeng/api';
import { Router } from '@angular/router';
import {ProductService} from '../../services/productservice';
import {EventListenerObject} from 'rxjs/internal/observable/fromEvent';
import {Data} from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
import { FormBuilder } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { environment } from 'environments/environment';
import { Form } from '@profabric/angular-components';
import { trigger, state, style, transition, animate } from '@angular/animations';
interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-homepageform',
    templateUrl: './homepageform.component.html',
    styleUrl: './homepageform.component.scss',
    providers: [DialogService, DatePipe],
    // animations: [
    //     trigger('slideInOut', [
    //       state('in', style({ transform: 'translateX(0)' })),
    //       transition(':enter', [
    //         style({ transform: 'translateX(100%)' }),
    //         animate('0.5s ease-out')
    //       ]),
    //       transition(':leave', [
    //         animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
    //       ])
    //     ])
    // ]
})
export class HomepageformComponent implements OnInit {
    isLoading = true;
    private readonly Base_URL = environment.BaseApi;
    @ViewChild('dt') dt: Table;
    isSorted: boolean = null;
    ref: DynamicDialogRef | undefined;
    constructor(
        private router: Router,
        fb: FormBuilder,
        private apiService: ApiService,
        public dialogService: DialogService,

        private datePipe: DatePipe
    ) { 
        setTimeout(() => {
            this.isLoading = false;
        }, 3000);
    }
    // reset(formState?: TValue | FormControlState<TValue>, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void

    hospitalId: number = -1;
    CSFId: any;
    CSFIdEncrypt: any;
    CSFIdLink: string;
    doctorId: number = -1;
    // dataValue: number = data.id_sample_status
    
    rangeDates: Date[] | undefined;
    comboId: number = -1;
    testPackageId: number = -1;
    // testpackage
    items!: string[];
    // DATE RANGE PICKER
    date1: Date | undefined;
    date2: Date | undefined;
    date3: Date | undefined;
    recievedDateFrom?: string;
    recievedDateTo?: string;
    drawDateFrom?: string;
    drawDateTo?: string;
    completeDateFrom?: string;
    completeDateTo?: string;
    // myform: FormGroup;
    // labCode: FormControl;
    // doctor: FormControl;
    // customerName: FormControl;
    // hospital: FormControl;
  
    selectedOption: string = '-1';

  onSelectionChange(event: any) {
    this.selectedOption = event.target.value;
    console.log('Selected option:', this.selectedOption);
  }
    onChangeRecieveDate(date1: any) {
        this.date1 = date1?.value;
        console.log(this.date1);
    }
    onChangeDrawDate(date2: any) {
        this.date2 = date2?.target?.value;
    }
    onChangeCompleteDate(date3: any) {
        this.date3 = date3?.target?.value;
    }
    // BUTTON
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
    onReset(form: NgForm){
        form.reset();

    }
    
    // DEFINING VARIABLES AND CONTSTANTS
    private tokenKey: string =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJVc2VybmFtZSI6ImRvY3RvcjIiLCJUeXBlIjoiUGFydG5lciIsIkZ1bGxOYW1lIjoiZG9jdG9yIDIiLCJFbWFpbCI6IjJAZ21haWwuY29tIiwiUGhvbmUiOiIwIiwiSXNBZ3JlZW1lbnQiOiJUcnVlIiwiSXNMb3lhbHR5UHJvZ3JhbSI6IlRydWUiLCJMaXN0SG9zcGl0YWwiOiJbe1wiSWRcIjo0NzczLFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDA3NDhcIixcIk5hbWVcIjpcIkJWIFBTIE1la29uZ1wifSx7XCJJZFwiOjQ5MjUsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDA3MVwiLFwiTmFtZVwiOlwiUEsgQlMgVHLhuqduIFRo4buLIFPGoW4gVHLDoFwifSx7XCJJZFwiOjQ5MzQsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDM2NFwiLFwiTmFtZVwiOlwiUEsgQlMgVHLGsMahbmcgTmfhu41jIFRo4bqjb1wifSx7XCJJZFwiOjQ5ODMsXCJUeXBlXCI6XCJvdGhlclwiLFwiQ29kZVwiOlwiR1MwMDczNFwiLFwiTmFtZVwiOlwiVklOQ0lCSU9cIn0se1wiSWRcIjo1MTQxLFwiVHlwZVwiOlwicGtcIixcIkNvZGVcIjpcIkdTMDA0MTNcIixcIk5hbWVcIjpcIlBLIFRoYW5oIEjDom5cIn0se1wiSWRcIjo2ODU5LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIxMDlcIixcIk5hbWVcIjpcIlBYTiBZIEtob2EgNDhcIn0se1wiSWRcIjo2OTg3LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIyMzdcIixcIk5hbWVcIjpcIlBLIEJTIMSQb8OgbiBUaOG7iyBLaW0gRHVuZ1wifV0iLCJleHAiOjE3MjA0MDQyMjQsImlzcyI6ImhjcC1nZW5lc29sdXRpb24iLCJhdWQiOiJoY3AtZ2VuZXNvbHV0aW9uIn0.FbK_FtaGhfuux8_84cIgs0v2O89wfOnXvWEDKmHTGMg';
    // HOSPITAL API
    hospitalApi: string = this.Base_URL + '/api/HCP/GetCategoryHospitals';
    testPackageApi: string = this.Base_URL + '/api/HCP/GetCategoryService';
    testPackageList: any[] = [];
    testPackage: any[];
    hospital: any[];
    HospitalList: any[] = [];
    // DOCTOR API
    doctor: any[];
    labCode: any[];
    customerName: any[];
    DoctorList: any[] = [];
    // COMBO API
    comboApi: string = this.Base_URL + '/api/HCP/GetCategoryCombo';
    ComboList: any[] = [];
    dataList: any[] = [];
    data: any[];
    packageArr: any[] = [];

    cols!: Column[];

    ngOnInit(): void {
        this.getHospital();
        this.getCombo();
        this.getTestPackage();
        this.onSearch()
        this.items = Array.from({ length: 1000 }).map((_, i) => `Item #${i}`);
    }
    
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      });
    
    getHospital() {
        this.apiService.getData(this.hospitalApi).subscribe((data: any) => {
            this.HospitalList = data.Data;

            console.log(this.HospitalList);
        });
    }
    
    getCombo() {
        this.apiService.getData(this.comboApi).subscribe((data: any) => {
            this.ComboList = data.Data;
            console.log(this.ComboList);
        });
    }
    // getDataValue(apiUrl: any) {
    //     this.apiService.getData(apiUrl).subscribe((data: any) => {
    //         this.DoctorList = data.Data;
    //         this.hospitalId = hospitalId?.value;

    //         console.log(this.DoctorList);
    //     });
    // }

    onChangeHospital(hospitalId: any) {
        // gets the doctor list changes on hospital change
        const doctorApi = this.Base_URL + '/api/HCP/GetCategoryDoctor?hospitalId=' +
            hospitalId?.value;
        this.apiService.getData(doctorApi).subscribe((data: any) => {
            this.DoctorList = data.Data;
            this.hospitalId = hospitalId?.value;

            console.log(this.DoctorList);
        });
    }
    getTestPackage() {
        this.apiService.getData(this.testPackageApi).subscribe((data: any) => {
            this.testPackageList = data.Data;
            // this.testPackageId = testPackageId?.value;
            console.log(this.testPackageId);
        });
    }

    onChangeDoctor(doctorId: any) {
        // retrieves the doctor ID
        this.doctorId = doctorId?.value;
    }
    onChangeCombo(comboId: any) {
        this.comboId = comboId?.target?.value;
        // console.log(this.ComboList);
    }

    onChangeTestPackage(event: any) {
        console.log(event);
        this.packageArr = event?.value;
        // console.log(this.testPackageId);
        // this.onSearch();
    }

     initialValue: Data[];

    // SORTING FUNCTION
    customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.dataList = [...this.InitialValue];
            this.dt.reset();
        }
    }
    sortTableData(event) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }
    formName : string = null;

        form = new FormGroup({
            first: new FormControl('Nancy', Validators.minLength(2)),
            last: new FormControl('Drew'),
          });
        get first(): any { return this.form.get('first'); }
  get last(): any { return this.form.get('last'); }
        clearInputMethod1() { this.first.reset(); this.last.reset(); }

    onSearch() {
   
        this.recievedDateFrom = this.date1 != null || this.date1 != undefined ? this.datePipe.transform(this.date1[0],"yyyy-MM-dd") : '';
        this.recievedDateTo = this.date1 != null || this.date1 != undefined ? this.datePipe.transform(this.date1[1],"yyyy-MM-dd") : '';
        this.drawDateFrom = this.date2 != null || this.date2 != undefined ? this.datePipe.transform(this.date2[0],"yyyy-MM-dd") : '';
        this.drawDateTo = this.date2 != null || this.date2 != undefined ? this.datePipe.transform(this.date2[1],"yyyy-MM-dd") : '';
        this.completeDateFrom = this.date3 != null || this.date3 != undefined ? this.datePipe.transform(this.date3[0],"yyyy-MM-dd") : '';
        this.completeDateTo = this.date3 != null || this.date3 != undefined ? this.datePipe.transform(this.date3[1],"yyyy-MM-dd") : '';
        
        console.log(this.recievedDateFrom, this.recievedDateTo);
        console.log(this.drawDateFrom, this.drawDateTo);
        console.log(this.completeDateFrom, this.completeDateTo);
        const testPackageIds = this.packageArr.length > 0 ?  this.packageArr.join(',') : '';
        const apiUrl = this.Base_URL + `/api/HCP/GetLabByUser?id_hospital=${this.hospitalId}&id_doctor=${this.doctorId}&id_combo=${this.comboId}&id_service_code=${testPackageIds}&StartDate_Collect=${this.recievedDateFrom || ''}&EndDate_Collect=${this.drawDateTo || ''}&StartDate_Receive=${this.recievedDateFrom || ''}&EndDate_Receive=${this.recievedDateTo || ''}&StartDate_Complete_Lab=${this.completeDateFrom || ''}&EndDate_Complete_Lab=${this.completeDateTo || ''}&customer_name=${this.customerName || ''}&lab_code=${this.labCode || ''}&Type=${this.selectedOption}&sortField=&sortOrder=&pageNumber=1&pageSize=20`;
   
        this.apiService.getData(apiUrl).subscribe((data: any) => {
            this.dataList = data.Data.ListData;
            // console.log(this.dataList);
        });
        // initialValue: Product[];

        // isSorted: boolean = null;

        // getLabData(labDataApi: any) {
        //     this.apiService.getData(this.labDataApi).subscribe((data: any) => {
        //         this.dataList = data.Data.ListData;
        //         console.log(this.dataList);
        //     });
    }
    InitialValue: Data[];
    getCSFID(CSFId: any) {
        this.CSFId = CSFId?.target?.value;
    }
    getDetails(CSFId: any) {
       this.ref = this.dialogService.open(PopupComponent, {
            modal: true,
            data: {
              CSFId:CSFId
                // totalProducts: this.products ? this.products.length : 0
            },
            header: 'Lab Details',
            width: '80vw',
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
          
        });

        this.ref.onClose.subscribe((data: any) => {
          let summary_and_detail;
          this.onSearch();
      });
      console.log(this.CSFId);
        // const CSFIdLink =
        //     'https://hcp-stg.genesolutions.vn/details?id=' + CSFId;
        // window.open(CSFIdLink, '_blank').focus();
    }
    
    }

