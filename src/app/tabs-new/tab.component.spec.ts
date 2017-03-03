import {TestBed, ComponentFixture} from "@angular/core/testing";
import {TabNewComponent} from "./tab.component";

describe('Component: TabNewComponent', () => {
    let fixture: ComponentFixture<TabNewComponent>, component, element, de, context;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TabNewComponent]
        });
        fixture = TestBed.createComponent(TabNewComponent);

        component = fixture.componentInstance;  // to access properties and methods
        de = fixture.debugElement;            // test helper
        element = fixture.nativeElement;      // to access DOM element
        context = fixture.debugElement.componentInstance;
    });

    it('should check that the component work', () => {
        expect(context).toBeTruthy();
    });

    it('should check that getDisplayStyle returns block value', () => {
        context.active = true;
        expect(context.getDisplayStyle()).toBe("block");
    });

    it('should check that getDisplayStyle returns none value', () => {
        context.active = false;
        expect(context.getDisplayStyle()).toBe("none");
    });
});
