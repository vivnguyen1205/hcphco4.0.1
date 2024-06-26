import { Component} from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    providers: [DialogService, MessageService],
    template: `<div>
    <p>
        There are <strong>{{ totalProducts }}</strong> products in total in this list.
    </p>
    <div class="flex justify-content-end">
        <p-button type="button" label="Close" (click)="close()" />
    </div>
</div>`
})
export class InfoDemo {
    totalProducts: number = 0;

    instance: DynamicDialogComponent | undefined;

    constructor(public ref: DynamicDialogRef, private dialogService: DialogService) {
        this.instance = this.dialogService.getInstance(this.ref);
    }

    ngOnInit() {
        if (this.instance && this.instance.data) {
            this.totalProducts = this.instance.data['totalProducts'];
        }
    }

    close() {
        this.ref.close();
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}