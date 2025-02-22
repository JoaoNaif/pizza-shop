import { expect, test } from '@playwright/test'

test('List orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()

  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('Paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  // Next Page

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()

  await expect(page.getByRole('cell', { name: 'Customer 20' })).toBeVisible()

  // Last Page

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()

  await expect(page.getByRole('cell', { name: 'Customer 60' })).toBeVisible()

  // Previous page

  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 41', exact: true }),
  ).toBeVisible()

  await expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()

  // First page

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()

  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('Filter by orders id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')

  await page.getByRole('button', { name: 'Filtrar Resultados' }).first().click()

  await expect(page.getByRole('cell', { name: 'Customer 11' })).toBeVisible()
})

test('Filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')

  await page.getByRole('button', { name: 'Filtrar Resultados' }).first().click()

  await expect(page.getByRole('cell', { name: 'Customer 11' })).toBeVisible()
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()

  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar Resultados' }).first().click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(10)
})
