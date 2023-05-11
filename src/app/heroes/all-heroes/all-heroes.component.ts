import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-all-heroes',
  templateUrl: './all-heroes.component.html',
  styleUrls: ['./all-heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllHeroesComponent implements OnInit {
  selectedForm: FormGroup = this.formBuilder.group({
    selected: ['', [Validators.required]],
  });
  form: FormGroup = this.formBuilder.group({
    searchInput: ['', [Validators.required]],
  });
  ALPHABET = 'abcdefghijklmnopqrstuvxyz';
  recentSearches: string[] =
    sessionStorage.getItem('searches')?.split(',') || [];

  constructor(
    public heroService: HeroesService,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.heroService.loadHeroes('a').add(() => this.changeDetection.markForCheck)
  }

  private search(value: string): void {
    this.addRecentSearch(value);

    this.heroService.loadHeroes(value).add(() => this.changeDetection.markForCheck)
  }

  alphabetSearch(value: string) {
    if (!value) return;
    this.search(value);
  }

  searchByEnter(event: KeyboardEvent) {
    if (event.code !== 'Enter') {
      return;
    }
    this.search(this.form.value.searchInput);
  }

  inputOldSearch(value: string) {
    this.form.get('searchInput')?.setValue(value);
    this.search(this.form.value.searchInput);
  }

  addRecentSearch(str: string): void {
    if (this.recentSearches.includes(str)) {
      return;
    }

    this.recentSearches.unshift(str);

    if (this.recentSearches.length === 6) this.recentSearches.pop();

    sessionStorage.setItem('searches', this.recentSearches.join(','));
    this.changeDetection.markForCheck();
  }
}
