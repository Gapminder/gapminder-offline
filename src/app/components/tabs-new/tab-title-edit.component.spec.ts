import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TabTitleEditComponent} from './tab-title-edit.component';
import {FormsModule} from '@angular/forms';

describe('TabTitleEditComponent', () => {
  let component: TabTitleEditComponent;
  let fixture: ComponentFixture<TabTitleEditComponent>;
  let context;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TabTitleEditComponent]
    });
    fixture = TestBed.createComponent(TabTitleEditComponent);

    component = fixture.componentInstance;
    context = fixture.debugElement.componentInstance;
  });

  it('should check that the component work', () => {
    expect(context).toBeTruthy();
  });

  it('should emit blur event', () => {
    context.doBlur();
    expect(context.blur).toBeDefined();
  });

  it('should check that focus set into tab edit input field on ngAfterContentInit()', () => {
    const showSpy = spyOn(context.tabEditInput.nativeElement, 'focus').and.stub();
    context.ngAfterContentInit();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should check that title changed on enter event', () => {
    const showSpy = spyOn(context.enter, 'emit').and.stub();
    context.doEnter();
    expect(context.enter).toBeDefined();

    context.title = 'title';
    context.doEnter();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should check that title did not change on escape event', () => {
    const showSpy = spyOn(context.esc, 'emit').and.stub();
    context.doEsc();
    expect(context.esc).toBeDefined();

    context.title = 'title';
    context.doEsc();
    context.update();
    expect(showSpy).toHaveBeenCalled();
    expect(context.title).toBeUndefined();
  });

  it('should check that title changed on update event', () => {
    const title = 'test';
    context.update(title);
    expect(context.title).toBe('test');
  });

});
