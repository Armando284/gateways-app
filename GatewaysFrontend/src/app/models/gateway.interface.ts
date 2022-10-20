import { Device } from './device.interface';

export interface Gateway {
  serialNumber: string,
  name: string,
  ipv4: string,
  devices: Device[],
}
