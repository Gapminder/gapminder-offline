"use strict";
var additional_data_1 = require("../src/app/components/additional-data");
var testing_1 = require("@angular/core/testing");
describe('Component: AdditionalDataComponent', function () {
    var fixture, component, element, de, context;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [additional_data_1.AdditionalDataComponent]
        });
        fixture = testing_1.TestBed.createComponent(additional_data_1.AdditionalDataComponent);
        component = fixture.componentInstance; // to access properties and methods
        de = fixture.debugElement; // test helper
        element = fixture.nativeElement; // to access DOM element
        context = fixture.debugElement.componentInstance;
    });
    it('should check that the component work', function () {
        //context.ngOnInit();
        expect(context).toBeTruthy();
    });
    it('should call resetDataToAdd method', function () {
        spyOn(context, "resetDataToAdd");
        context.ngOnInit();
        expect(context.resetDataToAdd).toHaveBeenCalled();
    });
    it('should check readerToAdd and pathToAdd values', function () {
        context.ngOnInit();
        expect(context.readerToAdd).toBe('csv');
        expect(context.pathToAdd).toBe('');
    });
});
//# sourceMappingURL=additional-data.spec.js.map