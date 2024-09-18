import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for searchQuery and error', () => {
    expect(component.searchQuery).toBe('');
    expect(component.error).toBeNull();
  });

  it('should emit onRepositorySearch event with trimmed searchQuery on form submit', () => {
    spyOn(component.onRepositorySearch, 'emit');

    component.searchQuery = '   test query   ';
    const event = new Event('submit');
    component.onSearchSubmit(event);

    expect(component.onRepositorySearch.emit).toHaveBeenCalledWith('test query');
  });

  it('should emit an empty string and reset searchQuery on reset', () => {
    spyOn(component.onRepositorySearch, 'emit');

    component.searchQuery = 'test query';
    component.reset();

    expect(component.searchQuery).toBe('');
    expect(component.onRepositorySearch.emit).toHaveBeenCalledWith('');
  });

  it('should call onSearchSubmit when form is submitted', () => {
    spyOn(component, 'onSearchSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', new Event('submit'));

    expect(component.onSearchSubmit).toHaveBeenCalled();
  });

});