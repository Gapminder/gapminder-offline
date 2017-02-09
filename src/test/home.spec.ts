import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {HomeComponent} from "../app/components/home";

describe('Component: HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>, component, context, de, element;

    // setup
    class RouterStub {
        navigateByUrl(url: string) {
            return url;
        }
    }

    let router = {
        navigate: jasmine.createSpy('navigate')
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                {provide: Router, useClass: RouterStub}
            ],
            declarations: [HomeComponent]
        });
        fixture = TestBed.createComponent(HomeComponent);

        de = fixture.debugElement;            // test helper
        element = fixture.nativeElement;      // to access DOM element
        context = fixture.debugElement.componentInstance;
    });

    it('should check that the component work', () => {
        expect(context).toBeTruthy();
    });

    it('should call goBack method', () => {
        spyOn(context, 'goBack');

        // let button = de.nativeElement.querySelector('button');
        // button.click();
        context.goBack();
        fixture.detectChanges();
        expect(context.goBack).toHaveBeenCalled();
    });

    it('should render `Home component` with h1 empty', () => {
        fixture.whenStable().then(() => {
            expect(de.query(By.css('h1')).nativeElement.innerText).toBe('');
        });
    });

    it('should render `James` name (async)', async(() => {
        context.name = 'James';
        //trigger change detection
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(element.querySelector('h1').innerText).toBe('James');
            expect(de.query(By.css('h1')).nativeElement.innerText).toBe('James');
        });
    }));

    it('should navigate to `/`', () => {
        router.navigate('/');
        expect(router.navigate).toHaveBeenCalledWith('/');
    });


})
;
