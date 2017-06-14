import {TestBed, ComponentFixture} from '@angular/core/testing';
import {TabNewComponent} from './tab.component';
import {MessageService} from '../../message.service';

describe('TabNewComponent', () => {
  let component: TabNewComponent;
  let fixture: ComponentFixture<TabNewComponent>;
  let context;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabNewComponent],
      providers: [MessageService]
    });
    fixture = TestBed.createComponent(TabNewComponent);

    component = fixture.componentInstance;
    context = fixture.debugElement.componentInstance;
  });

  it('should check that the component work', () => {
    expect(context).toBeTruthy();
  });

  it('should check that active tab has display:block value', () => {
    context.active = true;
    expect(context.getDisplayStyle()).toBe('block');
  });

  it('should check that non-active tab has display:none value', () => {
    context.active = false;
    expect(context.getDisplayStyle()).toBe('none');
  });

  it('should check that edited title applied', () => {
    spyOn(context, 'applyEditedTitle');
    context.applyEditedTitle();
    expect(context.applyEditedTitle).toHaveBeenCalled();
  });

  it('should check that edit mode disabled after title applied', () => {
    context.applyEditedTitle();
    expect(context.editMode).toBeFalsy();
  });

  it('should check that edited title dismissed', () => {
    context.dismissEditedTitle();
    expect(context.editMode).toBeFalsy();
    expect(component.title).toEqual(context.titleCopy);
  });

});
