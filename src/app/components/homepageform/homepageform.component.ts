import {PaginatorModule} from 'primeng/paginator';
import {openCloseAnimation} from './../menu-item/menu-item.animations';
import {ApiService} from './../../services/api.service';
import {Component, OnInit} from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgDatePickerModule} from 'ng-material-date-range-picker';
// import { ColComponent, DateRangePickerComponent, RowComponent } from '@coreui/angular';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {
    DialogService,
    DynamicDialogModule,
    DynamicDialogRef
} from 'primeng/dynamicdialog';
import {PopupComponent} from './popup/popup.component';
import {HomepageComponent} from '@pages/homepage/homepage.component';
import {ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {Table} from 'primeng/table';
import {ImportsModule} from 'primeimports';
import {SortEvent} from 'primeng/api';
import {ProductService} from '../../services/productservice';
import {EventListenerObject} from 'rxjs/internal/observable/fromEvent';
import {Data} from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
import { InfoDemo } from './popup/infodemo';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-homepageform',
    templateUrl: './homepageform.component.html',
    styleUrl: './homepageform.component.scss',
    providers: [DialogService],
})
export class HomepageformComponent implements OnInit {
    @ViewChild('dt') dt: Table;
    isSorted: boolean = null;
    ref: DynamicDialogRef | undefined;
    constructor(
        private apiService: ApiService,
        public dialogService: DialogService
    ) {}
    hospitalId: number;
    CSFId: any;
    CSFIdEncrypt: any;
    CSFIdLink: string;

    doctorId: number;
    rangeDates: Date[] | undefined;
    comboId: number;
    // testpackage

    // DATE RANGE PICKER
    date1: Date | undefined;
    date2: Date | undefined;
    date3: Date | undefined;
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

    // DEFINING VARIABLES AND CONTSTANTS
    private tokenKey: string =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJVc2VybmFtZSI6ImRvY3RvcjIiLCJUeXBlIjoiUGFydG5lciIsIkZ1bGxOYW1lIjoiZG9jdG9yIDIiLCJFbWFpbCI6IjJAZ21haWwuY29tIiwiUGhvbmUiOiIwIiwiSXNBZ3JlZW1lbnQiOiJUcnVlIiwiSXNMb3lhbHR5UHJvZ3JhbSI6IlRydWUiLCJMaXN0SG9zcGl0YWwiOiJbe1wiSWRcIjo0NzczLFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDA3NDhcIixcIk5hbWVcIjpcIkJWIFBTIE1la29uZ1wifSx7XCJJZFwiOjQ5MjUsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDA3MVwiLFwiTmFtZVwiOlwiUEsgQlMgVHLhuqduIFRo4buLIFPGoW4gVHLDoFwifSx7XCJJZFwiOjQ5MzQsXCJUeXBlXCI6XCJwa1wiLFwiQ29kZVwiOlwiR1MwMDM2NFwiLFwiTmFtZVwiOlwiUEsgQlMgVHLGsMahbmcgTmfhu41jIFRo4bqjb1wifSx7XCJJZFwiOjQ5ODMsXCJUeXBlXCI6XCJvdGhlclwiLFwiQ29kZVwiOlwiR1MwMDczNFwiLFwiTmFtZVwiOlwiVklOQ0lCSU9cIn0se1wiSWRcIjo1MTQxLFwiVHlwZVwiOlwicGtcIixcIkNvZGVcIjpcIkdTMDA0MTNcIixcIk5hbWVcIjpcIlBLIFRoYW5oIEjDom5cIn0se1wiSWRcIjo2ODU5LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIxMDlcIixcIk5hbWVcIjpcIlBYTiBZIEtob2EgNDhcIn0se1wiSWRcIjo2OTg3LFwiVHlwZVwiOlwiYnZcIixcIkNvZGVcIjpcIkdTMDIyMzdcIixcIk5hbWVcIjpcIlBLIEJTIMSQb8OgbiBUaOG7iyBLaW0gRHVuZ1wifV0iLCJleHAiOjE3MjA0MDQyMjQsImlzcyI6ImhjcC1nZW5lc29sdXRpb24iLCJhdWQiOiJoY3AtZ2VuZXNvbHV0aW9uIn0.FbK_FtaGhfuux8_84cIgs0v2O89wfOnXvWEDKmHTGMg';
    // HOSPITAL API
    hospitalApi: string =
        'https://hcp-api-stg.genesolutions.vn/api/HCP/GetCategoryHospitals';
    testPackageApi: string =
        'https://hcp-api-stg.genesolutions.vn/api/HCP/GetCategoryService';
    testPackageList: any[] = [];
    testPackage: any[];
    hospital: any[];
    HospitalList: any[] = [];
    // DOCTOR API
    doctor: any[];
    DoctorList: any[] = [];
    // COMBO API
    comboApi: string =
        'https://hcp-api-stg.genesolutions.vn/api/HCP/GetCategoryCombo';
    ComboList: any[] = [];
    dataList: any[] = [];
    data: any[];

    cols!: Column[];

    ngOnInit(): void {
        this.getHospital();
        this.getCombo();
        this.getTestPackage();
        this.onSearch()
        // this.InitialValue = [...this.data];

        // this.getCSFId();
        // this.getDoctor();
        // this.getCombo();
    }
    // selected: {startDate: Dayjs, endDate: Dayjs};
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

    onChangeHospital(hospitalId: any) {
        // gets the doctor list changes on hospital change
        const doctorApi =
            'https://hcp-api-stg.genesolutions.vn/api/HCP/GetCategoryDoctor?hospitalId=' +
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

            console.log(this.testPackageList);
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

    onSearch() {
        const labDataApi =
            'https://hcp-api-stg.genesolutions.vn/api/HCP/GetLabByUser?id_hospital=' +
            this.hospitalId +
            '&id_doctor=' +
            this.doctorId +
            '&id_combo=' +
            this.comboId +
            '&id_service_code=' +
            '&StartDate_Collect=' +
            // this.date1
            '&EndDate_Collect=' +
            // this.date2
            '&StartDate_Receive=' +
            // this.date3
            '&EndDate_Receive=&StartDate_Complete_Lab=&EndDate_Complete_Lab=&customer_name=&lab_code=&Type=-1&sortField=&sortOrder=&pageNumber=1&pageSize=20';
        this.apiService.getData(labDataApi).subscribe((data: any) => {
            // debugger
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
            width: '50vw',
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

  
        // const CSFIdLink =
        //     'https://hcp-stg.genesolutions.vn/details?id=' + CSFId;
        // window.open(CSFIdLink, '_blank').focus();
    }
}
