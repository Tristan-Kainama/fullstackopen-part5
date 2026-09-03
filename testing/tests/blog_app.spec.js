const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: {
            name: 'Tristan Kainama',
            username: 'tristank',
            password: 'secret123'
        }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeeds with correct credentials', async ({ page }) => {
        await page.getByLabel('username').fill('tristank')
        await page.getByLabel('password').fill('secret123')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Tristan Kainama logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
        await page.getByLabel('username').fill('something')
        await page.getByLabel('password').fill('something')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })
})