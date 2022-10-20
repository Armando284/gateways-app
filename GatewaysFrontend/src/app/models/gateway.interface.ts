import Device from './device.interface';

export default interface Gateway {
  serialNumber: string,
  name: string,
  ipv4: string,
  devices: Device[],
}
