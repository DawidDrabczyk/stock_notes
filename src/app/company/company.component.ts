import { Component, Input, input, output } from '@angular/core';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  public company = input.required<Company>();
  public selectedCompany = output<Company>();
  @Input({ required: true }) isSelected!: boolean;

  public selectCompany(company: Company) {
    this.selectedCompany.emit(company);
  }
}
