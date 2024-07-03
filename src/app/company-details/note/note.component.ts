import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input({ required: true }) note!: Note;
  @Output() onDeleteNote = new EventEmitter<Note>();

  public removeNote(note: Note): void {
    this.onDeleteNote.emit(note);
  }
}
