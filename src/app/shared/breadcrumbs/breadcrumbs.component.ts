import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

  title!: string;
  titleSub$!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.titleSub$ = this.getDataRoute().subscribe(({ title }) => {
      this.title = title;
    });;
  }

  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }
}
