import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { GatewaysService } from 'src/app/services/gateways.service';
import { Gateway, Device } from 'src/app/models';
import { faPlusCircle, faTimesCircle, faSpinner, faSignal, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gateways-details',
  templateUrl: './gateways-details.component.html',
  styleUrls: ['./gateways-details.component.scss']
})
export class GatewaysDetailsComponent implements OnInit {

  gateway!: Gateway;
  id!: string;
  sub!: Subscription;
  plusIcon = faPlusCircle;
  closeIcon = faTimesCircle;
  loadingIcon = faSpinner;
  statusIcon = faSignal;
  deleteIcon = faTrashAlt;

  deviceForm = new FormGroup({
    UID: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    vendor: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl(true, [
      Validators.required,
    ]),
  });

  isLoading = false;

  errorMsg: any;

  constructor(
    private route: ActivatedRoute,
    private gatewaysService: GatewaysService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || '';
        this.gatewaysService.GetGateway(this.id).subscribe(
          (gateway) => {
            this.gateway = gateway as Gateway;
          }),
          (error: any) => {
            this.errorMsg = error;
          }
      });
  }

  canAddMoreDevices(): boolean {
    return this.gateway.devices.length < 10;
  }

  get UID() { return this.deviceForm.get('UID') }
  get vendor() { return this.deviceForm.get('vendor') }
  get status() { return this.deviceForm.get('status') }

  onSubmit() {
    this.errorMsg = null;
    if (!this.canAddMoreDevices() || this.deviceForm.invalid || !this.UID || !this.vendor || !this.status) return;
    const newDevice: Device = {
      UID: this.UID.value,
      vendor: this.vendor.value,
      createdAt: new Date(),
      status: this.status.value,
    };
    this.isLoading = true;
    this.gatewaysService.AddDevice(this.gateway._id as string, newDevice).subscribe(
      (gateway) => {
        this.gateway = gateway as Gateway;
        this.deviceForm.reset();
        this.isLoading = false;
      },
      (error) => {
        this.errorMsg = error;
        this.isLoading = false;
      },
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openModal(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

}
