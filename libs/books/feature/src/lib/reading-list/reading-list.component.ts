import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList,completedBook } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  readingStatus(event,item){
    alert(event.checked);
    if (event.checked) {
      const update = {
        id: item.bookId,
        changes: {
          finished: true,
          finishedDate: '' + new Date().toISOString()
        }, ...item
      }
      this.store.dispatch(completedBook({ item: update }));
    } else {
      const update = {
        id: item.bookId,
        changes: {
          finished: false,
          finishedDate: ''
        }, ...item
      }
      this.store.dispatch(completedBook({ item: update }));
    }
  }
}
