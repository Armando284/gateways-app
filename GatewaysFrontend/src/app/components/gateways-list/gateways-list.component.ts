import { Component, OnInit } from '@angular/core';
import { GatewaysService } from 'src/app/services/gateways.service';
import { Gateway, Device } from 'src/app/models';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { faTrashAlt, faInfoCircle, faNetworkWired, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-gateways-list',
  templateUrl: './gateways-list.component.html',
  styleUrls: ['./gateways-list.component.scss']
})
export class GatewaysListComponent implements OnInit {

  deleteIcon = faTrashAlt;
  infoIcon = faInfoCircle;
  gatewayIcon = faNetworkWired;
  loadingIcon = faSpinner;

  allGateways: Gateway[] = [];
  gateways: Gateway[] = [];
  filter: string = '';

  gatewayForm = new FormGroup({
    serialNumber: new FormControl('', [
      Validators.required,
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    ipv4: new FormControl('', [
      Validators.required,
      this.ipv4FormatValidator()
    ]),
  });

  isLoading = false;
  errorMsg: any;

  constructor(
    private gatewaysService: GatewaysService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.gatewaysService.GetAllGateways().subscribe(
      (gateways) => {
        this.allGateways = gateways as Gateway[];

        this.gateways = this.allGateways;
      },
      (error) => {
        this.errorMsg = error;
      }
    );
    this.searchService.$emitter.subscribe((name: string) => {
      this.filter = name;
      this.gateways = this.allGateways.filter(gateway => gateway.name.toLowerCase().includes(name.toLowerCase()));
    });
  }

  ngOnDestroy(): void {
    // this.searchService.$emitter.unsubscribe();
  }

  cleanFilter(): void {
    setTimeout(() => {
      this.filter = '';
      this.gateways = this.allGateways;
    }, 300);
  }

  get serialNumber() { return this.gatewayForm.get('serialNumber') }
  get name() { return this.gatewayForm.get('name') }
  get ipv4() { return this.gatewayForm.get('ipv4') }

  ipv4FormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formatError = () => !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(control.value)
      const codeOutOfRange = () => {
        const ipNumbers: string[] = control.value.split('.');
        return ipNumbers.find((number) => parseInt(number, 10) < 0 || parseInt(number, 10) > 255);
      }
      return formatError() || codeOutOfRange() ? { ipv4Format: { value: control.value } } : null;
    }
  }

  onSubmit() {
    if (this.gatewayForm.invalid || !this.serialNumber || !this.name || !this.ipv4) return;
    const newGateway: Gateway = {
      serialNumber: this.serialNumber.value,
      name: this.name.value,
      ipv4: this.ipv4.value,
      devices: [],
    }
    this.isLoading = true;
    this.gatewaysService.AddGateway(newGateway).subscribe(
      (gateway) => {
        this.allGateways.push(gateway as Gateway);
        this.gateways = this.allGateways;
        this.gatewayForm.reset();
        this.isLoading = false;
      }),
      (error: any) => {
        this.errorMsg = error;
      }
  }

  deleteGateway(gatewayId: string = '', index: number): void {
    this.gatewaysService.DeleteGateway(gatewayId).subscribe(
      (completed) => {
        this.allGateways.splice(index, 1);
        this.gateways = this.allGateways;
      },
      (error) => {
        this.errorMsg = error;
      }
    )
  }

}
