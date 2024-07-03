import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CompanyComponent } from './company/company.component';
import { COMPANIES } from './companies';
import { Company } from './models/company.model';
import { CompanyDetailsComponent } from './company-details/company-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CompanyComponent,
    CompanyDetailsComponent,
  ],
})
export class AppComponent {
  public companies: Array<Company> = COMPANIES;
  public selectedCompany!: Company;
  public title: string = 'Notatki giełdowe';

  public getSelectedCompany(company: Company): void {
    this.selectedCompany = company;
  }
}
