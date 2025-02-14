import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  imports:[CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent {

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();  

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  } 
}