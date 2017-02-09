"use strict";
var testing_1 = require("@angular/core/testing");
var home_1 = require('./../src/app/components/home');
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
describe('Component: HomeComponent', function () {
    var fixture, component, de, element;
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
        component = fixture.componentInstance; // to access properties and methods
        de = fixture.debugElement; // test helper
        element = fixture.nativeElement; // to access DOM element
    });
    it("should be really initialized", function () {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
    it('should call goBack method', function (done) {
        spyOn(component, 'goBack');
        // let button = de.nativeElement.querySelector('button');
        // button.click();
        component.goBack();
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            expect(component.goBack).toHaveBeenCalled();
            done();
        }, function (error, param2) {
            console.log('args', error, param2);
            done();
        });
    });
    it('should render `Home component` with h1 empty', function () {
        fixture.whenStable().then(function () {
            expect(de.query(platform_browser_1.By.css('h1')).nativeElement.innerText).toBe('');
        });
    });
    it('should render `James` name (async)', testing_1.async(function () {
        component.name = 'James';
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
    fit('should tell ROUTER to navigate when hero clicked', testing_1.inject([router_1.Router], function (router) {
        var spy = spyOn(router, 'navigateByUrl');
        component.goBack();
        fixture.detectChanges();
        // args passed to router.navigateByUrl()
        var navArgs = spy.calls.first().args[0];
        // expecting to navigate to id of the component's first hero
        expect(navArgs).toBe('/');
    }));
});
//# sourceMappingURL=home.spec.js.map