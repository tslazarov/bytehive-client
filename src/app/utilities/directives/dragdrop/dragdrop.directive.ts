import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[dragdrop]'
})
export class DragdropDirective {
    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();

    constructor() { }

    @HostListener('dragover', ['$event']) onDragOver(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
    }

    @HostListener('drop', ['$event']) public ondrop(evt): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.fileOver = false;
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
        }
    }
}
