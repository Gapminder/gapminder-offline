"use strict";
var additional_data_1 = require('./../src/app/components/additional-data');
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
        component.ngOnInit();
        //fixture.detectChanges();
    });
    it("should be really initialized", function () {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
    it('should call onReaderSelect method', function (done) {
        //      debugger;
        spyOn(component, 'onReaderSelect');
        component.onReaderSelect('1');
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            expect(component.onReaderSelect).toHaveBeenCalledWith('1');
            done();
        });
    });
    it('should call deleteAdditionalItem method', function () {
        spyOn(component, 'deleteAdditionalItem');
        component.deleteAdditionalItem('111');
        fixture.detectChanges();
        expect(component.deleteAdditionalItem).toHaveBeenCalledWith('111');
    });
});
//# sourceMappingURL=additional-data.spec.js.map