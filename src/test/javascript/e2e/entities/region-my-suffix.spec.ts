import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Region e2e test', () => {

    let navBarPage: NavBarPage;
    let regionDialogPage: RegionDialogPage;
    let regionComponentsPage: RegionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Regions', () => {
        navBarPage.goToEntity('region-my-suffix');
        regionComponentsPage = new RegionComponentsPage();
        expect(regionComponentsPage.getTitle())
            .toMatch(/Regions/);

    });

    it('should load create Region dialog', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage = new RegionDialogPage();
        expect(regionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Region/);
        regionDialogPage.close();
    });

    it('should create and save Regions', () => {
        regionComponentsPage.clickOnCreateButton();
        regionDialogPage.setRegionNameInput('regionName');
        expect(regionDialogPage.getRegionNameInput()).toMatch('regionName');
        regionDialogPage.save();
        expect(regionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RegionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-region-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class RegionDialogPage {
    modalTitle = element(by.css('h4#myRegionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    regionNameInput = element(by.css('input#field_regionName'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setRegionNameInput = function(regionName) {
        this.regionNameInput.sendKeys(regionName);
    };

    getRegionNameInput = function() {
        return this.regionNameInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
