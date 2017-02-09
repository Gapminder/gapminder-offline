"use strict";
var testing_1 = require("@angular/core/testing");
var csv_config_form_1 = require("../src/app/components/csv-config-form");
describe('Component: CsvConfigFormComponent', function () {
    var fixture, component, context, de, element;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [csv_config_form_1.CsvConfigFormComponent]
        });
        fixture = testing_1.TestBed.createComponent(csv_config_form_1.CsvConfigFormComponent);
        de = fixture.debugElement; // test helper
        element = fixture.nativeElement; // to access DOM element
        context = fixture.debugElement.componentInstance;
    });
    it('should check that the component work', function () {
        expect(context).toBeTruthy();
    });
    it('should check close method', function () {
        spyOn(context, "close");
        context.close();
        expect(context.close).toHaveBeenCalled();
    });
    it('should check ok method if path', function () {
        context.delimiter = 'auto';
        context.ok();
        expect(context.delimiter).toBe('auto');
    });
    it('should check ok method', function () {
        spyOn(context, 'ok');
        context.ok();
        expect(context.ok).toHaveBeenCalled();
    });
    it('should check reset method called from ok', function () {
        spyOn(context, 'reset');
        context.ok();
        expect(context.reset).toHaveBeenCalled();
    });
});
//# sourceMappingURL=csv-config-form.spec.js.map