const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, addBlog, getBlogId }  = require('./helper')

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
        await loginWith(page, 'tristank', 'secret123')

        await expect(page.getByText('Tristan Kainama logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'tristankai', 'abangabangan')

        const notifDiv = page.locator('.notification')
        await expect(notifDiv).toContainText('wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'tristank', 'secret123')
    })

    test('a new blog can be created', async ({ page }) => {
        await addBlog(page, 'cool blog', 'Tristan Kainama', 'http://yesman.com')

        const notifDiv = page.locator('.notification')
        await expect(notifDiv).toContainText('a new blog cool blog by Tristan Kainama added')
    })

    describe('Logged in with one blog in it', () => {
        beforeEach(async ({ page }) => {
            await addBlog(page, 'cool blog', 'Tristan Kainama', 'http://yesman.com')
            await page.getByRole('button', { name: 'view' }).click()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('a blog can be deleted', async ({ page }) => {
            page.on('dialog', async dialog => {
                await dialog.accept()
            })

            await page.getByRole('button', { name: 'remove' }).click()

            const notifDiv = page.locator('.notification')
            await expect(notifDiv).toContainText('cool blog by Tristan Kainama blog has been sucessfully removed')

            await expect(page.getByText('cool blog', { exact: false })).not.toBeVisible()
        })
    })

    describe('Logged in with many blogs in it', () => {
        beforeEach(async ({ page }) => {
            await addBlog(page, 'cool blog', 'Tristan Kainama', 'http://yesman.com')
            await addBlog(page, 'blog about animals', 'Davidson Paul', 'http://conspicuous.com')
            await addBlog(page, 'What are those?', 'Davidson Paul', 'http://daddle.com')
        })

        test("only the user who added the blog sees the blog's delete button", async ({ page }) => {
            const locator1 = page.locator(`[id="${await getBlogId('cool blog')}"]`)
            const locator2 = page.locator(`[id="${await getBlogId('blog about animals')}"]`)
            const locator3 = page.locator(`[id="${await getBlogId('What are those?')}"]`)

            const reviewBlog = async (loc) => {
                await loc.getByRole('button', { name: 'view' }).click()
                await expect(loc.getByText('Tristan Kainama', { exact: true })).toBeVisible()
                await expect(loc.getByRole('button', { name: 'remove' })).toBeVisible()
            }

            await reviewBlog(locator1)
            await reviewBlog(locator2)
            await reviewBlog(locator3)
        })
    })
  })
})