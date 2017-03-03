import {TestBed, ComponentFixture} from "@angular/core/testing";
import {AdditionalDataComponent} from "./additional-data.component";

describe('Component: AdditionalDataComponent', () => {
   let fixture: ComponentFixture<AdditionalDataComponent>, component, element, de, context;


    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [AdditionalDataComponent]
        });
        fixture = TestBed.createComponent(AdditionalDataComponent);

        component = fixture.componentInstance;  // to access properties and methods
        de = fixture.debugElement;            // test helper
        element = fixture.nativeElement;      // to access DOM element
        context = fixture.debugElement.componentInstance;
    });

    it('should check that the component work', () => {
        //context.ngOnInit();
        expect(context).toBeTruthy();
    });

    it('should call resetDataToAdd method', () => {
        spyOn(context, "resetDataToAdd");
        context.ngOnInit();
        expect(context.resetDataToAdd).toHaveBeenCalled();
    });

    it('should check readerToAdd and pathToAdd values', () => {
        context.ngOnInit();
        expect(context.readerToAdd).toBe('csv');
        expect(context.pathToAdd).toBe('');
    });

});
