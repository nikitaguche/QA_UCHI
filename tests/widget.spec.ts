import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({ page }) => {
        widgetPage = new WidgetPage(page);
        await page.goto('/');
        await page.click('._UCHI_COOKIE__button');
    });

    test('opens', async () => {
        await widgetPage.openWidget();
        await expect(widgetPage.getWidgetBody()).toBeVisible();
    });

    test('has correct title in write us', async () => {
        await widgetPage.openWidget();
		
        const articles = await widgetPage.getPopularArticles();
		
		//console.log('Количество статей:', articles.length);
        expect(articles.length).toBeGreaterThan(0);

        await articles[0].click();
        await widgetPage.clickWriteToUs();

        expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
		
    });
	
    test('has correct title popular article #2', async () => {
	
	    await widgetPage.openWidget();
		
		expect(await widgetPage.getArticleTitle()).toEqual('Где найти награды ребенка?');
	});
	
});