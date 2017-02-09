"use strict";
var testing_1 = require("@angular/core/testing");
var csv_config_form_1 = require('./../src/app/components/csv-config-form');
describe('Component: CsvConfigFormComponent', function () {
    var fixture, component, context, de, element;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [csv_config_form_1.CsvConfigFormComponent]
        });
        fixture = testing_1.TestBed.createComponent(csv_config_form_1.CsvConfigFormComponent);
        // component = fixture.componentInstance;  // to access properties and methods
        de = fixture.debugElement; // test helper
        element = fixture.nativeElement; // to access DOM element
        component = fixture.debugElement.componentInstance;
        it('should check that the component work', function () {
            expect(component).toBeTruthy();
        });
        it('should check close method', testing_1.async(function () {
            spyOn(component, "close");
            component.close();
            expect(component.close).toHaveBeenCalled();
        }));
        it('should check ok method', testing_1.async(function () {
            debugger;
            spyOn(component, 'ok');
            component.ok();
            expect(component.ok).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=csv-config-form.spec.js.map