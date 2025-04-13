import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '[class="widget__iwx4N"]',
    WIDGET_BODY = '[class="widget__ppTQS"]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test="openWidget"]',
    BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]',
    ARTICLE_POPULAR_TITLE = '[class="popularTitle__8Pi-v"]',
    ARTICLE_POPULAR_LIST = '[class="articles__dgKpa"]',
    ARTICLE_POPULAR_LIST_ITEM = '[class="article__6zuSl"]',
	ARTICLE_TITLE = '[class="title__-CRDN"]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget() {
        await this.page.locator(WidgetPage.selector.BUTTON_OPEN).click();
        await this.page.waitForSelector(WidgetPage.selector.WIDGET_BODY);
    }

    async getPopularArticles() {
        await this.page.waitForTimeout(2000);
       
        await this.page.waitForSelector(
            WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM, 
            { timeout: 10000 }
        );

        return this.page.locator(
            WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM
        ).all();
    }

    async clickWriteToUs() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
	
	async getArticleTitle() {
        const articles = await this.getPopularArticles();
        if (articles.length >= 2) {
            return articles[2].locator(WidgetPage.selector.ARTICLE_TITLE).textContent();
        }
        return null;
    }
}