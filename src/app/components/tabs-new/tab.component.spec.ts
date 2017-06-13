import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TabNewComponent} from './tab.component';
import {MessageService} from '../../message.service';

describe('Component: TabNewComponent', () => {
  let component: TabNewComponent;
  let fixture: ComponentFixture<TabNewComponent>;
  let context;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabNewComponent],
      providers: [MessageService]
    });
    fixture = TestBed.createComponent(TabNewComponent);

    component = fixture.componentInstance;  // to access properties and methods
    context = fixture.debugElement.componentInstance;
  });

  it('should check that the component work', () => {
    expect(context).toBeTruthy();
  });

  it('should check that getDisplayStyle() returns block value', () => {
    context.active = true;
    expect(context.getDisplayStyle()).toBe('block');
  });

  it('should check that getDisplayStyle() returns none value', () => {
    context.active = false;
    expect(context.getDisplayStyle()).toBe('none');
  });

  it('should check applyEditedTitle()', () => {
    spyOn(context, 'applyEditedTitle');
    context.applyEditedTitle();
    expect(context.applyEditedTitle).toHaveBeenCalled();
  });

  it('should check that applyEditedTitle()', () => {
    context.applyEditedTitle();
    expect(context.editMode).toBeFalsy();
  });

  it('should check that dismissEditedTitle()', () => {
    context.dismissEditedTitle();
    expect(context.editMode).toBeFalsy();
    expect(component.title).toEqual(context.titleCopy);
  });

});
