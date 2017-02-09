"use strict";
var testing_1 = require("@angular/core/testing");
var home_1 = require("../src/app/components/home");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
describe('Component: HomeComponent', function () {
    var fixture, component, context, de, element;
    // setup
    var RouterStub = (function () {
        function RouterStub() {
        }
        RouterStub.prototype.navigateByUrl = function (url) {
            return url;
        };
        return RouterStub;
    }());
    var router = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: router_1.Router, useClass: RouterStub }
            ],
            declarations: [home_1.HomeComponent]
        });
        fixture = testing_1.TestBed.createComponent(home_1.HomeComponent);
        de = fixture.debugElement; // test helper
        element = fixture.nativeElement; // to access DOM element
        context = fixture.debugElement.componentInstance;
    });
    it('should check that the component work', function () {
        expect(context).toBeTruthy();
    });
    it('should call goBack method', function () {
        spyOn(context, 'goBack');
        // let button = de.nativeElement.querySelector('button');
        // button.click();
        context.goBack();
        fixture.detectChanges();
        expect(context.goBack).toHaveBeenCalled();
    });
    it('should render `Home component` with h1 empty', function () {
        fixture.whenStable().then(function () {
            expect(de.query(platform_browser_1.By.css('h1')).nativeElement.innerText).toBe('');
        });
    });
    it('should render `James` name (async)', testing_1.async(function () {
        context.name = 'James';
        //trigger change detection
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            expect(element.querySelector('h1').innerText).toBe('James');
            expect(de.query(platform_browser_1.By.css('h1')).nativeElement.innerText).toBe('James');
        });
    }));
    it('should navigate to `/`', function () {
        router.navigate('/');
        expect(router.navigate).toHaveBeenCalledWith('/');
    });
});
//# sourceMappingURL=home.spec.js.map