import {
  Component,
  OnInit,
  ViewEncapsulation,
  asNativeElements
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  isLoading = false;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private sb: MatSnackBar
  ) {}

  get searchTerm(): string {
    if (this.searchForm.value.term === '') {
      this.books = [];
    }
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books = [];
    this.store.select(getAllBooks).subscribe(books => {
      if (books) {
        this.books = books;
        this.isLoading = false;
      }
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const sbBooks = this.sb.open(
      'Selected book added to Reading List',
      'UNDO',
      {
        duration: 3500
      }
    );
    sbBooks.onAction().subscribe(() => {
      const item: ReadingListItem = { bookId: book.id, ...book };
      this.store.dispatch(removeFromReadingList({ item: item }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.isLoading = true;
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
