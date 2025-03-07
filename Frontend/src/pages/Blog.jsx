import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Appointment from '../components/Appointment';
import '../styles/Blog.css'; // Assuming you have a CSS file for styling

const Blog = () => {
    return (
        <>
            <Header />
            <section className="section mod--hero">
                <div className="container">
                    <div data-anim-trigger="load" className="columns mod--blog-hero">
                        <div data-anim-delay="" className="columns__col mod--blog-hero is-1">
                            <div data-submit-parent="" className="catalog-card-border">
                                <div className="heading-wrap mod--catalog-border">
                                    <h1 className="heading-1 mod--catalog-border">Useful articles</h1>
                                </div>
                                <div className="catalog-subs__img-wrap">
                                    <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67336958a10783337257e679_ava-subs.avif" loading="lazy" data-submit-anim="" alt="" className="catalog-subs__img anim" />
                                    <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64aa5c009aeb0c7398121247_form-success_join.avif" loading="lazy" data-submit-anim="" alt="success icon" className="catalog-subs__img is-success anim" />
                                    <div className="catalog-subs__text">Stay in the loop and keep up with all our news and updates!</div>
                                </div>
                                <div className="catalog-subs__form-wrap">
                                    <div className="form-wrapper mod--catalog-subs w-form">
                                        <form method="get" name="wf-form-Blog-catalog" data-name="Blog catalog" data-success-hide="" target="form-subs" id="wf-form-Blog-catalog" className="form" data-wf-page-id="65e02e1378aeac8c4c4d9b84" data-wf-element-id="280af6a1-58ae-1332-482b-1d09236bc546" aria-label="Blog catalog" data-gtm-vis-recent-on-screen58928213_185="447" data-gtm-vis-first-on-screen58928213_185="447" data-gtm-vis-total-visible-time58928213_185="100" data-gtm-vis-has-fired58928213_185="1" data-hs-cf-bound="true">
                                            <div className="form-subs__content">
                                                <div className="input-wrap">
                                                    <input className="input mod--catalog-subs w-input" maxLength="256" name="Email" data-name="Email" placeholder="Join us, share your email" type="email" id="subs-email" required="" />
                                                    <div data-submit-anim="" className="form__submit-result pointer-events-off anim">
                                                        <div className="form__submit-result-text mod--blog">Thank you for subscribing!</div>
                                                    </div>
                                                    <div className="form__label-invalid is-subs anim">Please, enter a valid email</div>
                                                </div>
                                                <div className="form-submit-wrap mod--blog">
                                                    <div data-hover="" data-submit-wrap="" className="form-submit-wrap">
                                                        <div className="button mod--blog">
                                                            <div className="button__overflow">
                                                                <div data-hover-elem="" className="button__texts">
                                                                    <div className="button__text is-absolute">subscribe</div>
                                                                    <div className="button__text">subscribe</div>
                                                                </div>
                                                            </div>
                                                            <div data-submit-anim="" className="submit__checked anim">
                                                                <div data-submit-anim="" className="submit__checked-anim anim">
                                                                    <img loading="eager" src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6481d9a928737610f9397707_icon-%D1%81keck.svg" alt="" className="submit__checked-icon" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input type="submit" data-wait="Please wait..." className="form-submit is-absolute w-button" value="Submit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="hidden" name="Country" id="input-01-0" value="India" />
                                            <input type="hidden" name="Page of submit" id="input-02-0" value="https://www.halo-lab.com/blog" />
                                            <input type="hidden" name="Lifecycle" id="input-03-0" value="subscriber" />
                                            <input type="hidden" name="Lead ID" id="input-04-0" value="1881782805.1732880451" />
                                            <input type="hidden" name="Referrer" id="input-06-0" value="https://www.google.com/" />
                                            <input type="hidden" name="Initial Source" id="input-07-0" value="https://www.halo-lab.com/opensource-categories/react" />
                                        </form>
                                        <div className="form-success w-form-done" tabIndex="-1" role="region" aria-label="Blog catalog success">
                                            <div>Thank you for subscribing!</div>
                                        </div>
                                        <div className="form-error w-form-fail" tabIndex="-1" role="region" aria-label="Blog catalog failure">
                                            <div>Hmm...something went wrong.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-anim-delay="100" className="columns__col mod--blog-hero">
                            <div data-swiper="catalog-hero" className="swiper mod--projects-hero w-dyn-list swiper-fade swiper-initialized swiper-horizontal swiper-pointer-events swiper-watch-progress swiper-backface-hidden">
                                <div role="list" className="swiper-wrapper mod--projects-hero w-dyn-items" id="swiper-wrapper-8ff5867b9b48b10cf" aria-live="off" style={{ transitionDuration: '0ms' }}>
                                    <div role="group" className="swiper-slide mod--projects-hero2 w-dyn-item swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="3" style={{ width: '676px', transitionDuration: '0ms', opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }} aria-label="4 / 4">
                                        <a data-hover="" data-mask="projects-big-invert" href="/blog/full-guide-to-the-product-development-process" className="catalog-card-fill w-inline-block">
                                            <div className="catalog-card-fill__img-wrap">
                                                <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/64b65770db311803d0b1c32f_how-to-build-a-product.avif" className="catalog-card-fill__img" />
                                            </div>
                                            <div className="catalog-card-fill__content">
                                                <div data-anim-delay="500" className="post-card__param is--big anim">
                                                    <div fs-cmsnest-collection="industries" fs-cmsnest-element="nest-target">Development</div>
                                                </div>
                                                <h3 className="heading-6 text-style-2lines">How to build a product — a full guide to the product development process</h3>
                                            </div>
                                        </a>
                                    </div>
                                    <div role="group" className="swiper-slide mod--projects-hero2 w-dyn-item" data-swiper-slide-index="0" style={{ width: '676px', transitionDuration: '0ms', opacity: 1, transform: 'translate3d(-676px, 0px, 0px)' }} aria-label="1 / 4">
                                        <a data-hover="" data-mask="projects-big-invert" href="/blog/react-pwa-tutorial-how-to-create-progressive-web-app-with-react" className="catalog-card-fill w-inline-block">
                                            <div className="catalog-card-fill__img-wrap">
                                                <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/657b118ff94bc293d6cc289b_React%20PWA%20Tutorial_%20How%20to%20Create%20Progressive%20Web%20App%20with%20React_%20(1).avif" sizes="(max-width: 479px) 100vw, (max-width: 767px) 53vw, (max-width: 991px) 35vw, 28vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/657b118ff94bc293d6cc289b_React%20PWA%20Tutorial_%20How%20to%20Create%20Progressive%20Web%20App%20with%20React_%20(1)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/657b118ff94bc293d6cc289b_React%20PWA%20Tutorial_%20How%20to%20Create%20Progressive%20Web%20App%20with%20React_%20(1).avif 1200w" className="catalog-card-fill__img" />
                                            </div>
                                            <div className="catalog-card-fill__content">
                                                <div data-anim-delay="500" className="post-card__param is--big">
                                                    <div fs-cmsnest-collection="industries" fs-cmsnest-element="nest-target">Development</div>
                                                </div>
                                                <h3 className="heading-6 text-style-2lines">React PWA tutorial: How to Create progressive web app with React?</h3>
                                            </div>
                                        </a>
                                    </div>
                                    <div role="group" className="swiper-slide mod--projects-hero2 w-dyn-item swiper-slide-prev" data-swiper-slide-index="1" style={{ width: '676px', transitionDuration: '0ms', opacity: 1, transform: 'translate3d(-1352px, 0px, 0px)' }} aria-label="2 / 4">
                                        <a data-hover="" data-mask="projects-big-invert" href="/blog/what-is-a-design-sprint-the-ultimate-guide-to-running-design-sprints" className="catalog-card-fill w-inline-block">
                                            <div className="catalog-card-fill__img-wrap">
                                                <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/66b1d120f0320a3b33b9b28b_Illustration2.avif" className="catalog-card-fill__img" />
                                            </div>
                                            <div className="catalog-card-fill__content">
                                                <div data-anim-delay="500" className="post-card__param is--big">
                                                    <div fs-cmsnest-collection="industries" fs-cmsnest-element="nest-target">Design</div>
                                                </div>
                                                <h3 className="heading-6 text-style-2lines">What's a design sprint – the ultimate guide to running design sprints</h3>
                                            </div>
                                        </a>
                                    </div>
                                    <div role="group" className="swiper-slide mod--projects-hero2 w-dyn-item swiper-slide-visible swiper-slide-active" data-swiper-slide-index="2" style={{ width: '676px', transitionDuration: '0ms', opacity: 1, transform: 'translate3d(-2028px, 0px, 0px)' }} aria-label="3 / 4">
                                        <a data-hover="" data-mask="projects-big-invert" href="/blog/what-is-product-design" className="catalog-card-fill w-inline-block">
                                            <div className="catalog-card-fill__img-wrap">
                                                <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/64b6379a12fd46866a9621e9_what-is-product-design.avif" sizes="(max-width: 479px) 100vw, (max-width: 767px) 53vw, (max-width: 991px) 35vw, 28vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/64b6379a12fd46866a9621e9_what-is-product-design-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/64b6379a12fd46866a9621e9_what-is-product-design.avif 1200w" className="catalog-card-fill__img" />
                                            </div>
                                            <div className="catalog-card-fill__content">
                                                <div data-anim-delay="500" className="post-card__param is--big">
                                                    <div fs-cmsnest-collection="industries" fs-cmsnest-element="nest-target">Design</div>
                                                </div>
                                                <h3 className="heading-6 text-style-2lines">What is product design and the product design process in general?</h3>
                                            </div>
                                        </a>
                                    </div>
                                    <div role="group" className="swiper-slide mod--projects-hero2 w-dyn-item swiper-slide-next" data-swiper-slide-index="3" style={{ width: '676px', transitionDuration: '0ms', opacity: 0, transform: 'translate3d(-2704px, 0px, 0px)' }} aria-label="4 / 4">
                                        <a data-hover="" data-mask="projects-big-invert" href="/blog/full-guide-to-the-product-development-process" className="catalog-card-fill w-inline-block">
                                            <div className="catalog-card-fill__img-wrap">
                                                <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/64b65770db311803d0b1c32f_how-to-build-a-product.avif" className="catalog-card-fill__img" />
                                            </div>
                                            <div className="catalog-card-fill__content">
                                                <div data-anim-delay="500" className="post-card__param is--big anim">
                                                    <div fs-cmsnest-collection="industries" fs-cmsnest-element="nest-target">Development</div>
                                                </div>
                                                <h3 className="heading-6 text-style-2lines">How to build a product — a full guide to the product development process</h3>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                            </div>
                            <div data-anim-delay="500" className="catalog-hero__pagination">
                                <div data-swiper-pagination-color="light" data-swiper-pagination="catalog-hero" data-swiper-pagination-style="load" className="swiper-pagin mod--catalog-hero swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
                                    <span className="swiper-pagination-bullet" tabIndex="0" role="button" aria-label="Go to slide 1"></span>
                                    <span className="swiper-pagination-bullet" tabIndex="0" role="button" aria-label="Go to slide 2"></span>
                                    <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex="0" role="button" aria-label="Go to slide 3" aria-current="true"></span>
                                    <span className="swiper-pagination-bullet" tabIndex="0" role="button" aria-label="Go to slide 4"></span>
                                </div>
                            </div>
                            <div className="catalog-hero__fire">
                                <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65b1297ba3cc896326614b8e_emoji-fire.avif" loading="lazy" alt="" className="catalog-hero__icon-fire" />
                            </div>
                        </div>
                    </div>
                    <div id="posts" className="container">
                        <div className="category-wrap">
                            <div data-hover="false" data-delay="0" className="category-dropdown w-dropdown">
                                <div className="category-dropdown__toggle w-dropdown-toggle" id="w-dropdown-toggle-3" aria-controls="w-dropdown-list-3" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex="0">
                                    <div className="category-dropdown__icon w-embed">
                                        <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="100%" height="100%">
                                            <path fillRule="evenodd" d="M.76 2.08a1 1 0 0 1 .908-.58h16.667a1 1 0 0 1 .763 1.646l-6.43 7.603V17.5a1 1 0 0 1-1.447.894l-3.334-1.666a1 1 0 0 1-.552-.895V10.75L.905 3.146A1 1 0 0 1 .76 2.079ZM3.824 3.5l5.275 6.238a1 1 0 0 1 .237.645v4.832l1.333.667v-5.499a1 1 0 0 1 .236-.645L16.18 3.5H3.823Z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </div>
                                <nav className="category-dropdown__list w-dropdown-list" id="w-dropdown-list-3" aria-labelledby="w-dropdown-toggle-3">
                                    <div className="category-dropdown__content">
                                        <a data-hover="" href="/blog" aria-current="page" className="category__btn is-cat-dropdown w-inline-block w--current" tabIndex="0">
                                            <div className="button__overflow">
                                                <div data-hover-elem="" className="button__texts">
                                                    <div className="button__text">All Posts</div>
                                                    <div className="button__text is-absolute">All Posts</div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="collection w-dyn-list">
                                            <div role="list" className="collection__list mod--category is-cat-dropdown w-dyn-items">
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/insights" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">Insights</div>
                                                                <div className="button__text is-absolute">Insights</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/insights"></link>
                                                </div>
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/development" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">Development</div>
                                                                <div className="button__text is-absolute">Development</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/development"></link>
                                                </div>
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/design" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">Design</div>
                                                                <div className="button__text is-absolute">Design</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/design"></link>
                                                </div>
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/case-studies" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">Case Studies</div>
                                                                <div className="button__text is-absolute">Case Studies</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/case-studies"></link>
                                                </div>
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/seo" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">Seo</div>
                                                                <div className="button__text is-absolute">Seo</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/seo"></link>
                                                </div>
                                                <div role="listitem" className="collection__item w-dyn-item">
                                                    <a href="/category/news" className="category__btn is-cat-dropdown w-inline-block" tabIndex="0">
                                                        <div className="button__overflow">
                                                            <div data-hover-elem="" className="button__texts">
                                                                <div className="button__text">News</div>
                                                                <div className="button__text is-absolute">News</div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <link rel="prefetch" href="/category/news"></link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <div className="category">
                                <a data-hover-prevent-responsive="" data-hover="" href="/blog" aria-current="page" className="category__btn hide-mobile-portrait w-inline-block w--current">
                                    <div className="button__overflow">
                                        <div data-hover-elem="" className="button__texts">
                                            <div className="button__text">All Posts</div>
                                            <div className="button__text is-absolute">All Posts</div>
                                        </div>
                                    </div>
                                </a>
                                <link rel="prefetch" href="/blog"></link>
                                <div className="collection hide-mobile-portrait w-dyn-list">
                                    <div role="list" className="collection__list mod--category w-dyn-items">
                                        <div role="listitem" className="collection__item w-dyn-item">
                                            <a data-hover-prevent-responsive="" data-hover="" href="/category/insights" className="category__btn w-inline-block">
                                                <div className="button__overflow">
                                                    <div data-hover-elem="" className="button__texts">
                                                        <div className="button__text">Insights</div>
                                                        <div className="button__text is-absolute">Insights</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div role="listitem" className="collection__item w-dyn-item">
                                            <a data-hover-prevent-responsive="" data-hover="" href="/category/development" className="category__btn w-inline-block">
                                                <div className="button__overflow">
                                                    <div data-hover-elem="" className="button__texts">
                                                        <div className="button__text">Development</div>
                                                        <div className="button__text is-absolute">Development</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div role="listitem" className="collection__item w-dyn-item">
                                            <a data-hover-prevent-responsive="" data-hover="" href="/category/design" className="category__btn w-inline-block">
                                                <div className="button__overflow">
                                                    <div data-hover-elem="" className="button__texts">
                                                        <div className="button__text">Design</div>
                                                        <div className="button__text is-absolute">Design</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div role="listitem" className="collection__item w-dyn-item">
                                            <a data-hover-prevent-responsive="" data-hover="" href="/category/seo" className="category__btn w-inline-block">
                                                <div className="button__overflow">
                                                    <div data-hover-elem="" className="button__texts">
                                                        <div className="button__text">Seo</div>
                                                        <div className="button__text is-absolute">Seo</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a data-hover="" data-component="search-toggle" href="#" className="category__btn mod--search w-inline-block">
                                    <div className="button__overflow">
                                        <div data-hover-elem="" className="button__texts">
                                            <div className="button__text">Search</div>
                                            <div className="button__text is-absolute">Search</div>
                                        </div>
                                    </div>
                                    <div data-hover-elem="" className="button__icons mod--search">
                                        <div data-hover-elem="" className="button__icon-anim">
                                            <div className="button__icon-small w-embed">
                                                <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="100%" height="100%">
                                                    <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
                                                        <path d="M10.372 10.372a.889.889 0 0 1 1.257 0l4 4a.889.889 0 0 1-1.257 1.257l-4-4a.889.889 0 0 1 0-1.257Z"></path>
                                                        <path d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="a">
                                                            <path d="M0 0h16v16H0z"></path>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="button__icon-small is-icon-absolute w-embed">
                                                <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="100%" height="100%">
                                                    <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
                                                        <path d="M10.372 10.372a.889.889 0 0 1 1.257 0l4 4a.889.889 0 0 1-1.257 1.257l-4-4a.889.889 0 0 1 0-1.257Z"></path>
                                                        <path d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="a">
                                                            <path d="M0 0h16v16H0z"></path>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <div data-hover-elem="" className="button__bg bg-color-yellow"></div>
                                    </div>
                                </a>
                                <div fs-cmsfilter-element="filters" data-component="search-form" className="form-block mod--search anim w-form">
                                    <form id="wf-form-search" name="wf-form-search" data-name="search" method="get" className="form mod--search" data-wf-page-id="65e02e1378aeac8c4c4d9b84" data-wf-element-id="62070f9b-6f0e-cc16-566f-6e51e28c7055" aria-label="search" data-gtm-vis-has-fired58928213_185="1" data-hs-cf-bound="true">
                                        <div className="search__icon">
                                            <div className="icon-small w-embed">
                                                <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="100%" height="100%">
                                                    <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
                                                        <path d="M10.372 10.372a.889.889 0 0 1 1.257 0l4 4a.889.889 0 0 1-1.257 1.257l-4-4a.889.889 0 0 1 0-1.257Z"></path>
                                                        <path d="M6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="a">
                                                            <path d="M0 0h16v16H0z"></path>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                        <input className="search-input w-input" maxlength="256" name="name-2" fs-cmsfilter-field="title" data-name="Name 2" placeholder="I'm looking for" type="text" id="name-2" required="" />
                                        <div data-component="search-close" className="search__close">
                                            <div className="icon-regular w-embed">
                                                <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                                    <path fillRule="evenodd" d="M6.344 6.34a1 1 0 0 1 1.414 0l9.9 9.9a1 1 0 0 1-1.415 1.414l-9.9-9.9a1 1 0 0 1 0-1.414Z" clipRule="evenodd"></path>
                                                    <path fillRule="evenodd" d="M17.657 6.346a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 0 1-1.413-1.415l9.9-9.9a1 1 0 0 1 1.413 0Z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="hidden" name="Country" id="input-01-1" value="India" />
                                        <input type="hidden" name="Page of submit" id="input-02-1" value="https://www.halo-lab.com/blog" />
                                        <input type="hidden" name="Lifecycle" id="input-03-1" value="subscriber" />
                                        <input type="hidden" name="Lead ID" id="input-04-1" value="1881782805.1732880451" />
                                        <input type="hidden" name="Referrer" id="input-06-1" value="https://www.google.com/" />
                                        <input type="hidden" name="Initial Source" id="input-07-1" value="https://www.halo-lab.com/opensource-categories/react" />
                                    </form>
                                    <div className="w-form-done" tabIndex="-1" role="region" aria-label="search success">
                                        <div>Thank you! Your submission has been received!</div>
                                    </div>
                                    <div className="w-form-fail" tabIndex="-1" role="region" aria-label="search failure">
                                        <div>Oops! Something went wrong while submitting the form.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collection w-dyn-list">
                            <div fs-cmsload-element="list" fs-cmsfilter-element="list" fs-cmsload-mode="pagination" fs-cmsload-showquery="true" role="list" className="collection__list is-posts w-dyn-items" style={{ opacity: 1 }}>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/custom-reports-in-google-analytics-4" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65f8278d692a2d1ce11e9615_Illustration-1.avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Seo</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>18 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/custom-reports-in-google-analytics-4" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">How to create custom reports in Google Analytics 4?<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/wireframe-vs-mockup-vs-prototype" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e04ccaacf60fee33868a65_Illustration%20(18).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e04ccaacf60fee33868a65_Illustration%20(18)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e04ccaacf60fee33868a65_Illustration%20(18).avif 1201w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>13 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/wireframe-vs-mockup-vs-prototype" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">The differences between wireframes, mockups, and prototypes and their place in the design process<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/educational-website-design-tips-and-best-practices" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65f0514dee0d1420eddd7e4e_Illustration2.avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Insights</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>13 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/educational-website-design-tips-and-best-practices" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">Best practices and tips for designing educational websites<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/financial-services-website-design" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65f03e117fb53b6510d3e7eb_Illustration2.avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Insights</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>13 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/financial-services-website-design" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">A guide to web design for companies in the financial services sector<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/logistics-website-design" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e847342fd78453d5852414_Illustration%20(26).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e847342fd78453d5852414_Illustration%20(26)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e847342fd78453d5852414_Illustration%20(26).avif 1200w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Insights</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>6 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/logistics-website-design" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">Best logistics website designs for your inspiration<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/the-best-financial-website-designs-to-inspire-you" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e83d43f3a12c31c85f66e6_Illustration%20(24).avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Insights</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>6 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/the-best-financial-website-designs-to-inspire-you" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">Top 15 best financial services website designs<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/how-psychology-and-ux-influence-user-decisions" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e839f0092c52f4cca401b0_Illustration%20(22).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e839f0092c52f4cca401b0_Illustration%20(22)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e839f0092c52f4cca401b0_Illustration%20(22).avif 1200w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>6 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/how-psychology-and-ux-influence-user-decisions" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">How psychology and UX influence user decision-making<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/what-is-a-digital-audit-and-why-is-it-important" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0a07352c622f276a4f06a_Illustration%20(20).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0a07352c622f276a4f06a_Illustration%20(20)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0a07352c622f276a4f06a_Illustration%20(20).avif 1200w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Insights</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>6 Mar</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/what-is-a-digital-audit-and-why-is-it-important" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">Digital audit — what is it and why do you need to conduct it?<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/high-fidelity-wireframe" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65ddc245c235282b8adb52a2_Illustration%20(12).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65ddc245c235282b8adb52a2_Illustration%20(12)-p-500.avif 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65ddc245c235282b8adb52a2_Illustration%20(12).avif 1200w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>28 Feb</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/high-fidelity-wireframe" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">What are high-fidelity wireframes and how to create them<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/profile-page-design" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/66bdbfd281e82ca87a30d231_Preview2.avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>28 Feb</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/profile-page-design" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">How to design a profile page that engages your audience?<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/why-is-web-design-important" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0492b575f1ff899d600be_Illustration%20(16).avif" sizes="(max-width: 479px) 78vw, (max-width: 991px) 187.35498046875px, 19vw" srcSet="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0492b575f1ff899d600be_Illustration%20(16)-p-500.webp 500w, https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65e0492b575f1ff899d600be_Illustration%20(16).avif 1200w" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>28 Feb</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/why-is-web-design-important" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">7 reasons why web design is so important &amp; the key elements that make it good<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div role="listitem" className="collection__item is-posts w-dyn-item" style={{ opacity: 1 }}>
                                    <div data-hover-parent="" className="post-card">
                                        <a data-hover="" href="/blog/the-role-of-ux-in-reducing-anxiety" className="post-card__img-link w-inline-block">
                                            <img loading="lazy" data-hover-elem="" alt="" src="https://cdn.prod.website-files.com/63fc977c14aaea404dce4439/65dda0431f688ef1457de944_Illustration%20(4).avif" className="post-card__img" />
                                        </a>
                                        <div className="post-card__param">
                                            <div>Design</div>
                                            <div className="post-card__param-date">
                                                <div className="w-condition-invisible">15 Oct</div>
                                                <div>28 Feb</div>
                                            </div>
                                        </div>
                                        <a data-hover="" href="/blog/the-role-of-ux-in-reducing-anxiety" className="post-card__title-link w-inline-block">
                                            <h2 fs-cmsfilter-field="title" className="post-card__title">Mental health and inclusive UX: the role of design in reducing anxiety<span className="post-card__span-icons"></span><span className="post-card__span-icons">
                                                <div data-post-card-arrow="" className="post-card__icons">
                                                    <div data-hover-elem="" className="button__icon-anim">
                                                        <div className="post-card__icon opacity-0 w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="post-card__icon is-icon-absolute w-embed">
                                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" width="100%" height="100%">
                                                                <path fillRule="evenodd" d="M6.25.879 14.871 9.5l-8.62 8.622L4.128 16l6.5-6.5-6.5-6.5L6.25.88Z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span></h2>
                                            <div className="hide">
                                                <div className="post-card__span-icons"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div fs-cmsfilter-element="empty" className="columns mod--blog-empty" style={{ display: 'none' }}>
                                <div className="columns__col is-1-old mod--blog-empty">
                                    <h3 className="heading-5 mod--blog-empty">Sorry, no results were found for&nbsp;your&nbsp;request</h3>
                                    <div className="blog__empty-desc">Please try using different keywords:</div>
                                    <div className="collection w-dyn-list">
                                        <div role="list" className="collection__list mod--category-more w-dyn-items">
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/insights" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">Insights</div>
                                                            <div className="button__text is-absolute">Insights</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/development" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">Development</div>
                                                            <div className="button__text is-absolute">Development</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/design" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">Design</div>
                                                            <div className="button__text is-absolute">Design</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/case-studies" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">Case Studies</div>
                                                            <div className="button__text is-absolute">Case Studies</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/seo" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">Seo</div>
                                                            <div className="button__text is-absolute">Seo</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div role="listitem" className="collection__item w-dyn-item">
                                                <a data-hover-prevent-responsive="" data-hover="" href="/category/news" className="category__btn w-inline-block">
                                                    <div className="button__overflow">
                                                        <div data-hover-elem="" className="button__texts">
                                                            <div className="button__text">News</div>
                                                            <div className="button__text is-absolute">News</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="columns__col is-2-old mod--blog-empty">
                                    <div className="blog__empty-img-wrap is-bg">
                                        <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6425962988caebb22ffaf202_empty-state-bg.avif" loading="lazy" sizes="100vw" srcSet="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6425962988caebb22ffaf202_empty-state-bg-p-500.avif 500w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6425962988caebb22ffaf202_empty-state-bg-p-800.avif 800w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6425962988caebb22ffaf202_empty-state-bg.avif 1282w" alt="empty state background" className="blog__empty-bg" />
                                    </div>
                                    <div className="blog__empty-img-wrap">
                                        <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/642597d4e4f1568eeb7c8e3f_empty.gif" loading="lazy" alt="empty image" className="blog__empty-gif" />
                                    </div>
                                </div>
                            </div>
                            <div role="navigation" aria-label="List" className="w-pagination-wrapper posts-pagination" style={{ opacity: 1 }}>
                                <a href="?b1d3bc67_page=3" aria-label="Previous Page" className="w-pagination-previous posts-pagination__btn is-previews" style={{}}>
                                    <div className="button__icon-anim">
                                        <div className="icon-regular w-embed">
                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                                <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                                            </svg>
                                        </div>
                                        <div className="icon-regular is-absolute w-embed">
                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                                <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="button__bg bg-color-white"></div>
                                </a>
                                <div data-page-current="" className="posts-pagination__pages">
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=1" className="posts-pagination__btn is-page">1</a>
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=2" className="posts-pagination__btn is-page">2</a>
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=3" className="posts-pagination__btn is-page">3</a>
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=4" className="posts-pagination__btn is-page w--current" aria-current="page">4</a>
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=5" className="posts-pagination__btn is-page">5</a>
                                    <a href="#" fs-cmsload-element="page-dots" className="posts-pagination__btn is-dots">...</a>
                                    <a fs-cmsload-element="page-button" href="?b1d3bc67_page=14" className="posts-pagination__btn is-page">14</a>
                                </div>
                                <a href="?b1d3bc67_page=5" aria-label="Next Page" className="w-pagination-next posts-pagination__btn">
                                    <div className="button__icon-anim">
                                        <div className="icon-regular w-embed">
                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                                <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                                            </svg>
                                        </div>
                                        <div className="icon-regular is-absolute w-embed">
                                            <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                                <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="button__bg bg-color-white"></div>
                                </a>
                                <link rel="prerender" href="?b1d3bc67_page=2"></link>
                            </div>
                        </div>
                        <div className="hide"></div>
                    </div>
                </div>
            </section>
            <Appointment />
            <Footer />
        </>
    );
};

export default Blog;
