import { Device } from './device.interface';

export interface Gateway {
  _id?: string, // This is optional since it is created by mongodb and it's not available at creation time.
  serialNumber: string,
  name: string,
  ipv4: string,
  devices: Device[],
}
