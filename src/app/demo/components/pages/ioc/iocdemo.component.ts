import { filter } from 'rxjs';
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Table } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
    templateUrl: './iocdemo.component.html',
    providers: [ConfirmationService]
})
export class IocDemoComponent implements OnInit {
    customers1: Customer[] = [];
    loading: boolean = true;
    representatives: Representative[] = [];
    statuses: any[] = [];
    iocs: any[] = [];
    activityValues: number[] = [0, 100];
    isChecked: boolean = false;
    isNull: boolean = true;
    checkedRow: any = {}
    itemsSelect: MenuItem[];
    itemsExport: MenuItem[];
    category:any;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService,private apiService: ApiService){

    }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });

        this.customerService.getIoc().then(customers => {
            this.iocs = customers
            this.category = [...new Set(this.iocs.map(item => item.type))];
            this.iocs.forEach((element,index) => {
                var verified: boolean = true
                element.description? this.iocs[index]['verified']=verified :this.iocs[index]['verified']=!verified

                this.iocs[index]['checked']=false
            });
        }
        );

        this.itemsSelect = [
            {
                label: 'Enable Selected',
                disabled:true,
                icon: 'pi pi-check-circle',
                command: () => {
                }
            },
            {
                label: 'Disable Selected',
                icon: 'pi pi-minus-circle',
                disabled:true,
                command: () => {
                }
            },
            { separator: true },
            { label: 'Delete Selected',disabled:true, icon: 'pi pi-cog', routerLink: ['/setup'] }
        ];


        this.itemsExport = [
            {
                label: 'CSV',
                command: () => {
                    this.exportCSV()
                }
            },
            { separator: true },
            {
                label: 'MGNX Rules',
                command: () => {
                    this.exportMG()
                }
            },
            {
                label: 'BAE Rules',
                command: () => {
                    this.exportBAE()
                }
            },
            {
                label: 'Suricata Rules',
                command: () => {
                    this.exportSuricata()
                }
            },
            { separator: true },
            {
                label: 'Thor',
                command: () => {
                    this.exportThor()
                }
            }
        ];

    }

    disableMenu(menu:MenuItem[],isdisabled:boolean){
        this.isNull=isdisabled
        menu.forEach((_,index) => {
            menu[index]['disabled']=isdisabled
        });
        return menu
    }

    checkOne(event: any,id:string){
        var a= Object.values(this.checkedRow)
        if (event['checked']==false)
        {
            this.isChecked=false
            a.length==this.iocs.length?this.isChecked=false:null
            a.length==0 || a.indexOf(true)==-1?this.itemsSelect=this.disableMenu(this.itemsSelect,true):null
            // a.length==0 || a.indexOf(true)==-1?this.itemsExport=this.disableMenu(this.itemsExport,true):null
        }
        else{
            this.itemsSelect=this.disableMenu(this.itemsSelect,false)
            // this.itemsExport=this.disableMenu(this.itemsExport,false)
            // this.isNull=false
            a.length==this.iocs.length?this.isChecked=true:null
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    checkAll(event:any) {
        console.log(event)
        this.iocs.forEach((element) => {
            !this.isChecked? this.checkedRow[element.id]=false:this.checkedRow[element.id]=true
            // !event.checked? this.checkedRow[element.id]=false:this.checkedRow[element.id]=true
        });

        this.isChecked ? this.itemsSelect=this.disableMenu(this.itemsSelect,false) : this.itemsSelect=this.disableMenu(this.itemsSelect,true)
        // this.isChecked ? this.isNull=false : this.isNull=true
    }

    exportCSV(){
        this.loading = true;
        var query = {id:Object.keys(Object.fromEntries(Object.entries(this.checkedRow).filter(([key,val]) => val)))}
        this.apiService
                .getFile('/ioczip/csv',query,this.isChecked).subscribe(
                  (response: any) =>{
                      var filename=response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replaceAll('"',"")

                      let dataType = response.body.type;
                      let binaryData = [];
                      binaryData.push(response.body);
                      let downloadLink = document.createElement('a');
                      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                      downloadLink.setAttribute('download',filename);
                      document.body.appendChild(downloadLink);

                      downloadLink.click();
                      this.loading = false;
                  }
              )
    }

    exportMG(){
        this.loading = true;
        var query = {id:Object.keys(Object.fromEntries(Object.entries(this.checkedRow).filter(([key,val]) => val)))}
        this.apiService
                .getFile('/ioc/mgnx',query,this.isChecked).subscribe(
                  (response: any) =>{
                      var filename=response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replaceAll('"',"")

                      let dataType = response.body.type;
                      let binaryData = [];
                      binaryData.push(response.body);
                      let downloadLink = document.createElement('a');
                      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                      downloadLink.setAttribute('download',filename);
                      document.body.appendChild(downloadLink);

                      downloadLink.click();
                      this.loading = false;
                  }
              )
    }

    exportThor(){
        this.loading = true;
        var query = {id:Object.keys(Object.fromEntries(Object.entries(this.checkedRow).filter(([key,val]) => val)))}
        this.apiService
                .getFile('/ioc/thor',query,this.isChecked).subscribe(
                  (response: any) =>{
                      var filename=response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replaceAll('"',"")

                      let dataType = response.body.type;
                      let binaryData = [];
                      binaryData.push(response.body);
                      let downloadLink = document.createElement('a');
                      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                      downloadLink.setAttribute('download',filename);
                      document.body.appendChild(downloadLink);

                      downloadLink.click();
                      this.loading = false;
                  }
            )
    }


    exportBAE(){
        this.loading = true;
        var query = {id:Object.keys(Object.fromEntries(Object.entries(this.checkedRow).filter(([key,val]) => val)))}
        this.apiService
                .getFile('/ioc/bae',query,this.isChecked).subscribe(
                  (response: any) =>{
                      var filename=response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replaceAll('"',"")

                      let dataType = response.body.type;
                      let binaryData = [];
                      binaryData.push(response.body);
                      let downloadLink = document.createElement('a');
                      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                      downloadLink.setAttribute('download',filename);
                      document.body.appendChild(downloadLink);

                      downloadLink.click();
                      this.loading = false;
                  }
            )
    }

    exportSuricata(){
        this.loading = true;
        var query = {id:Object.keys(Object.fromEntries(Object.entries(this.checkedRow).filter(([key,val]) => val)))}
        this.apiService
                .getFile('/ioc/suricata',query,this.isChecked).subscribe(
                  (response: any) =>{
                      var filename=response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replaceAll('"',"")

                      let dataType = response.body.type;
                      let binaryData = [];
                      binaryData.push(response.body);
                      let downloadLink = document.createElement('a');
                      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                      downloadLink.setAttribute('download',filename);
                      document.body.appendChild(downloadLink);

                      downloadLink.click();
                      this.loading = false;
                  }
            )
    }
}
