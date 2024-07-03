import { Component, Input, ViewChild } from '@angular/core';
import { Company } from '../models/company.model';
import { NoteComponent } from './note/note.component';
import { Note } from '../models/note.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-details',
  standalone: true,
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
  imports: [NoteComponent, FormsModule],
})
export class CompanyDetailsComponent {
  @Input({ required: true }) selectedCompany!: Company;
  @ViewChild('inputElement') inputElement!: any;
  public notes: Array<Note> = [];
  public noteDescription!: string;
  public noteHeader!: string;

  public get getNotesByCompany() {
    return this.notes.filter(
      (note) => note.companyId === this.selectedCompany.id
    );
  }

  public addNote(): void {
    const newNote: Note = this.prepareSingleNote(this.notes.length);

    this.notes.unshift(newNote);
    this.noteDescription = '';
    this.noteHeader = '';
  }

  public setFocus(): void {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 500);
  }

  public deleteNote(note: Note): void {
    const indexToRemove: number = this.notes.findIndex(
      (item) => item.id === note.id
    );

    if (indexToRemove !== -1) {
      this.notes.splice(indexToRemove, 1);
    }
  }

  private prepareSingleNote(id: number): Note {
    return {
      id: id,
      description: this.noteDescription,
      header: this.noteHeader,
      time: new Date(),
      companyId: this.selectedCompany.id,
    };
  }
}
