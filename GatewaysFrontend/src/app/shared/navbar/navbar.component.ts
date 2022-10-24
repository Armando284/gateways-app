import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchIcon = faSearch;
  searchForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ])
  })

  currentRoute: string = '';

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url
      }
    })

  }

  canSearch(): boolean {
    return this.currentRoute === '/';
  }

  get name() { return this.searchForm.get('name') };

  onSubmit(): void {
    if (this.searchForm.invalid || !this.name) return;
    this.searchService.searchGatewayByName(this.name.value);
    this.searchForm.reset();
  }

}
