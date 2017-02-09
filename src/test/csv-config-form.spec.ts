import {TestBed} from '@angular/core/testing';
import {CsvConfigFormComponent} from "../app/components/csv-config-form";

describe('Component: CsvConfigFormComponent', () => {
    let fixture, component, context, de, element;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [CsvConfigFormComponent]
        });
        fixture = TestBed.createComponent(CsvConfigFormComponent);

        de = fixture.debugElement;            // test helper
        element = fixture.nativeElement;      // to access DOM element
        context = fixture.debugElement.componentInstance;
    });

    it('should check that the component work', () => {
        expect(context).toBeTruthy();
    });

    it('should check close method', () => {
        spyOn(context, "close");
        context.close();
        expect(context.close).toHaveBeenCalled();
    });

    it('should check ok method if path', () => {
        context.delimiter = 'auto';
        context.ok();
        expect(context.delimiter).toBe('auto');
    });

    it('should check ok method', () => {
        spyOn(context, 'ok');
        context.ok();
        expect(context.ok).toHaveBeenCalled();
    });

    it('should check reset method called from ok', () => {
        spyOn(context, 'reset');
        context.ok();
        expect(context.reset).toHaveBeenCalled();
    });

});


