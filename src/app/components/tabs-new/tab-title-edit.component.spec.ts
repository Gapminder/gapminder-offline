import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TabTitleEditComponent} from './tab-title-edit.component';
import {FormsModule} from '@angular/forms';

describe('Component: TabTitleEditComponent', () => {
  let component: TabTitleEditComponent;
  let fixture: ComponentFixture<TabTitleEditComponent>;
  let context;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TabTitleEditComponent]
    });
    fixture = TestBed.createComponent(TabTitleEditComponent);

    component = fixture.componentInstance;  // to access properties and methods
    context = fixture.debugElement.componentInstance;
  });

  it('should check that the component work', () => {
    expect(context).toBeTruthy();
  });

  it('should check doBlur()', () => {
    context.doBlur();
    expect(context.blur).toBeDefined();
  });

  it('should check ngAfterContentInit()', () => {
    const showSpy = spyOn(context.tabEditInput.nativeElement, 'focus').and.stub();
    context.ngAfterContentInit();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should check doEnter()', () => {
    const showSpy = spyOn(context.enter, 'emit').and.stub();
    context.doEnter();
    expect(context.enter).toBeDefined();

    context.title = 'title';
    context.doEnter();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should check doEsc()', () => {
    const showSpy = spyOn(context.esc, 'emit').and.stub();
    context.doEsc();
    expect(context.esc).toBeDefined();

    context.title = 'title';
    context.doEsc();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should check update()', () => {
    const title = 'test';
    context.update(title);
    expect(context.title).toBe('test');
  });

});
