import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gateway, Device } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class GatewaysService {

  API: string = environment.api;

  constructor(private http: HttpClient) { }

  AddGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(`${this.API}/gateways`, gateway);
  }

  GetAllGateways(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${this.API}/gateways`);
  }

  GetGateway(gatewayId: string): Observable<Gateway> {
    return this.http.get<Gateway>(`${this.API}/gateways/${gatewayId}`);
  }

  AddDevice(gatewayId: string, device: Device): Observable<Gateway> {
    return this.http.put<Gateway>(`${this.API}/gateways/add-device/${gatewayId}`, device);
  }

  UpdateGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.put<Gateway>(`${this.API}/gateways/${gateway._id}`, gateway);
  }

  DeleteGateway(gatewayId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/gateways/${gatewayId}`);
  }

}
