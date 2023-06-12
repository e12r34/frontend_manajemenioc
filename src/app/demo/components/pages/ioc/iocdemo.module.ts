import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IocDemoRoutingModule } from './iocdemo-routing.module';
import { IocDemoComponent } from './iocdemo.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
    imports: [
        CommonModule,
        IocDemoRoutingModule,
        TableModule,
        MultiSelectModule,
        DropdownModule,
        FormsModule,
        SliderModule,
        ProgressBarModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        SplitButtonModule,
        SpeedDialModule
    ],
    declarations: [IocDemoComponent]
})
export class IocDemoModule { }
