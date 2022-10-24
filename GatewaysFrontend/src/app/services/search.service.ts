import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  $emitter = new EventEmitter();

  constructor() { }

  searchGatewayByName(name: string): void {
    this.$emitter.emit(name);
  }
}
