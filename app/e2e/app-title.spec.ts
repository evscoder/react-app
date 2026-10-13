import { expect, test } from '@playwright/test';

test.describe('App title editor', () => {
    let title: string;

    test.beforeEach(async ({ page }) => {
        title = 'React App';

        await page.route('**/api/app', route => route.fulfill({ json: { title } }));
        await page.route('**/api/app/title', async route => {
            const request = route.request();

            if (request.method() === 'PUT') {
                title = request.postDataJSON().title;
            } else if (request.method() === 'DELETE') {
                title = '';
            } else {
                throw new Error(`Unexpected mutation method: ${request.method()}`);
            }

            await route.fulfill({ json: { title } });
        });

        await page.goto('/');
    });

    test('loads the title from the API', async ({ page }) => {
        await expect(page).toHaveTitle('Auth Page');
        await expect(page.getByRole('heading', { name: 'React App' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'App title' })).toHaveValue('React App');
    });

    test('saves the title and keeps it after reloading', async ({ page }) => {
        const input = page.getByRole('textbox', { name: 'App title' });

        await input.fill('Updated application');
        await page.getByRole('button', { name: 'Save title' }).click();

        await expect(page.getByRole('status')).toHaveText('Saving title...');
        await expect(input).toBeDisabled();
        await expect(page.getByRole('button', { name: 'Save title' })).toBeDisabled();
        await expect(page.getByRole('button', { name: 'Clear title' })).toBeDisabled();
        await expect(page.getByRole('heading', { name: 'Updated application' })).toBeVisible();
        await expect(input).toBeEnabled();

        await page.reload();
        await expect(input).toHaveValue('Updated application');
    });

    test('clears the title and disables saving an empty value', async ({ page }) => {
        await page.getByRole('button', { name: 'Clear title' }).click();

        await expect(page.getByRole('status')).toHaveText('Clearing title...');
        await expect(page.getByRole('heading', { name: 'Title is empty' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'App title' })).toHaveValue('');
        await expect(page.getByRole('button', { name: 'Save title' })).toBeDisabled();

        await page.reload();
        await expect(page.getByRole('heading', { name: 'Title is empty' })).toBeVisible();
    });

    test('rejects a whitespace-only title', async ({ page }) => {
        await page.getByRole('textbox', { name: 'App title' }).fill('   ');

        await expect(page.getByRole('button', { name: 'Save title' })).toBeDisabled();
    });

    for (const action of ['Save title', 'Clear title']) {
        test(`shows a failed ${action} request and allows retrying`, async ({ page }) => {
            await page.route('**/api/app/title', route => route.fulfill({
                status: 500,
                json: { message: 'Request failed' }
            }));

            await page.getByRole('textbox', { name: 'App title' }).fill('Changed title');
            await page.getByRole('button', { name: action }).click();

            await expect(page.getByText('API request failed.')).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'App title' })).toBeEnabled();
            await expect(page.getByRole('heading', { name: 'React App' })).toBeVisible();

            await page.unroute('**/api/app/title');
            await page.route('**/api/app/title', async route => {
                title = action === 'Save title' ? route.request().postDataJSON().title : '';
                await route.fulfill({ json: { title } });
            });
            await page.getByRole('button', { name: action }).click();

            await expect(page.getByRole('heading', {
                name: action === 'Save title' ? 'Changed title' : 'Title is empty'
            })).toBeVisible();
            await expect(page.getByText('API request failed.')).toBeHidden();
        });
    }

    test('shows an initial API loading failure', async ({ page }) => {
        await page.route('**/api/app', route => route.fulfill({ status: 500, json: {} }));
        await page.reload();

        await expect(page.getByText('API request failed.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Save title' })).toBeDisabled();
    });
});
