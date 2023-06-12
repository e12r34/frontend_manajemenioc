import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IocDemoComponent } from './iocdemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: IocDemoComponent }
    ])],
    exports: [RouterModule]
})
export class IocDemoRoutingModule { }
