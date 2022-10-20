export interface Device {
  _id?: string, // This is optional since it is created by mongodb and it's not available at creation time.
  UID: Number,
  vendor: string,
  createdAt: Date,
  status: Boolean,
}
