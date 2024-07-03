import { Component, Input, OnInit, ViewChild, signal } from '@angular/core';
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
export class CompanyDetailsComponent implements OnInit {
  @Input({ required: true }) selectedCompany!: Company;
  @ViewChild('inputElement') inputElement!: any;
  public notes: Array<Note> = [];
  public noteDescription = signal('');
  public noteHeader = signal('');

  public get getNotesByCompany() {
    return this.notes.filter(
      (note) => note.companyId === this.selectedCompany.id
    );
  }

  ngOnInit(): void {
    this.setNotesArrayFromLS();
  }

  public addNote(): void {
    const newNote: Note = this.prepareSingleNote(new Date().getTime());

    this.notes.unshift(newNote);
    this.setNotesToLocalStorage();
    this.clearAll();
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
      this.setNotesToLocalStorage();
    }
  }

  public clearAll(): void {
    this.noteDescription.set('');
    this.noteHeader.set('');
  }

  private prepareSingleNote(id: number): Note {
    return {
      id: id,
      description: this.noteDescription(),
      header: this.noteHeader(),
      time: new Date(),
      companyId: this.selectedCompany.id,
    };
  }

  private setNotesToLocalStorage(): void {
    const notes = JSON.stringify(this.notes);
    localStorage.setItem('notes', notes);
  }

  private setNotesArrayFromLS(): void {
    const notes = localStorage.getItem('notes');

    if (notes) {
      this.notes = JSON.parse(notes);
    }
  }
}
