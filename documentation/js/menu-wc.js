'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' : 'data-bs-target="#xs-controllers-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' :
                                            'id="xs-controllers-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' : 'data-bs-target="#xs-injectables-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' :
                                        'id="xs-injectables-links-module-AppModule-0ecc393a7ad5735a797cddcd85ec745a4bd6b5188cc1d37f46be526ceb4e8ea7c7393c633b03bb2c6d04464fb8cda4fcc246a7a891b5b56925ac6f63beab59a5"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' :
                                            'id="xs-controllers-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' :
                                        'id="xs-injectables-links-module-AuthModule-e91434f32322219dbe543196ef61dc4f7ca85d5cf7671c362e5115089956465be8fe4f95a6b33f1290b4409f1986a9fda0ab468912a8f5604bd9e308b4298da4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatalogModule.html" data-type="entity-link" >CatalogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' : 'data-bs-target="#xs-controllers-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' :
                                            'id="xs-controllers-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' }>
                                            <li class="link">
                                                <a href="controllers/CatalogController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatalogController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' : 'data-bs-target="#xs-injectables-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' :
                                        'id="xs-injectables-links-module-CatalogModule-234db4675766d2b334cf3416ed272b7a6e3abc58ed5558ce31df6573b5ae15ef645a2a14936124ebaea33777d50803293191f846c665c10feb7bb7f4d0fec860"' }>
                                        <li class="link">
                                            <a href="injectables/CatalogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatalogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' : 'data-bs-target="#xs-controllers-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' :
                                            'id="xs-controllers-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' : 'data-bs-target="#xs-injectables-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' :
                                        'id="xs-injectables-links-module-CommentsModule-467ddbf99db85bbedc79385023c02d1a3fccfb8cb669ac5c35969d8fb186becd7f783f69c1695d6fb33530b2c92024c7599b0e0df64e24e60f502f00251f34b7"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-930e0663e6c8dc4c766d017bdfae498fe5ac0bb9188d675b3f9374eafe3115fa5d88699b15ea81a5df6547cf54b54e3518b3ecaed6e4f45b1d7730eb3fc84314"' : 'data-bs-target="#xs-injectables-links-module-MailModule-930e0663e6c8dc4c766d017bdfae498fe5ac0bb9188d675b3f9374eafe3115fa5d88699b15ea81a5df6547cf54b54e3518b3ecaed6e4f45b1d7730eb3fc84314"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-930e0663e6c8dc4c766d017bdfae498fe5ac0bb9188d675b3f9374eafe3115fa5d88699b15ea81a5df6547cf54b54e3518b3ecaed6e4f45b1d7730eb3fc84314"' :
                                        'id="xs-injectables-links-module-MailModule-930e0663e6c8dc4c766d017bdfae498fe5ac0bb9188d675b3f9374eafe3115fa5d88699b15ea81a5df6547cf54b54e3518b3ecaed6e4f45b1d7730eb3fc84314"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-6ff7046957c1a09aff94c28fdaa0e88c2fccf86998862942214d6592f78a8f5bca5ae822e5c954b4f15a8382d26e346ddca00491fbc6282ec5b18c2b5f479ef6"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-f23ed9dfb2ac26e3fee14c1fead2c4d89ea9bc5990a893cd191889e85b3fac6cb9dcd9e751546e823786e5a30c51cd9ed23e1dd8bd2e2f341cc45d8d5c27dbe6"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-f23ed9dfb2ac26e3fee14c1fead2c4d89ea9bc5990a893cd191889e85b3fac6cb9dcd9e751546e823786e5a30c51cd9ed23e1dd8bd2e2f341cc45d8d5c27dbe6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-f23ed9dfb2ac26e3fee14c1fead2c4d89ea9bc5990a893cd191889e85b3fac6cb9dcd9e751546e823786e5a30c51cd9ed23e1dd8bd2e2f341cc45d8d5c27dbe6"' :
                                        'id="xs-injectables-links-module-PaginationModule-f23ed9dfb2ac26e3fee14c1fead2c4d89ea9bc5990a893cd191889e85b3fac6cb9dcd9e751546e823786e5a30c51cd9ed23e1dd8bd2e2f341cc45d8d5c27dbe6"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' :
                                            'id="xs-controllers-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' :
                                        'id="xs-injectables-links-module-PostsModule-d4e395d067eb9f7ea7ca2f0d40013ce460652c4cd65d2d89a27a34b313ebabde433d5e779b6325d59fd856d3a80b534578e2ed88687d22df3dfe51bb73ea71ec"' }>
                                        <li class="link">
                                            <a href="injectables/CreatePostProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePostProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' :
                                            'id="xs-controllers-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' :
                                        'id="xs-injectables-links-module-ProductsModule-15187e13c53f3bdeb98b33bcd9cc3b7ddfc53d188f13b09bd656bd3f2e2bfc0872c1d2e35fb1e8942b40ab7216a8a713f5bc339e8334a2f0f7c21612d03deafc"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' :
                                            'id="xs-controllers-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' :
                                        'id="xs-injectables-links-module-TagsModule-87936966124401028d95d77aad58a0ef6a1e9de839e088a063d4acf6fb30c4376171d798ef142c86358d8dd17f4bf1dc55c9f7d6a3ed0125371a937da19234b3"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' : 'data-bs-target="#xs-controllers-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' :
                                            'id="xs-controllers-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' }>
                                            <li class="link">
                                                <a href="controllers/UploadsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' :
                                        'id="xs-injectables-links-module-UploadsModule-b33f296d4dde0a32ac66bc7458b197a4426e9de7ff8929dca41b599018207b62aec9b01deb9821f8975449aac009d436a4f529e2677c3ce462a5c36d9ce43713"' }>
                                        <li class="link">
                                            <a href="injectables/UploadToAwsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadToAwsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' :
                                            'id="xs-controllers-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' :
                                        'id="xs-injectables-links-module-UsersModule-289eee9767c51be76b0efd9607a41a8f977cd18c43363f0fd820a44edd4eaaad1c3e5c8c7ee70a0080f4b7efe16271bc95b678166f98d734e155c7d85a23292a"' }>
                                        <li class="link">
                                            <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateGoogleUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByGoogleIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersCreateManyProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersCreateManyProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" >GoogleAuthenticationController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Category.html" data-type="entity-link" >Category</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Comment.html" data-type="entity-link" >Comment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Upload.html" data-type="entity-link" >Upload</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsBaseDto.html" data-type="entity-link" >GetPostsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsDto.html" data-type="entity-link" >GetPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleTokenDto.html" data-type="entity-link" >GoogleTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AllowGuard.html" data-type="entity-link" >AllowGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuardTsGuard.html" data-type="entity-link" >AuthenticationGuardTsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUser.html" data-type="entity-link" >GoogleUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFile.html" data-type="entity-link" >UploadFile</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});