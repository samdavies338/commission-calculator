const { calculate } = require('./calculator');

describe('calculate function', () => {
  test('add scenario with UK non-VAT supplier', () => {
    const result = calculate({
      action: 'add',
      supplier: 'uk',
      vatRegistered: 'no',
      rate: 100,
      commissionPercent: 10,
    });
    // Supplier receives 100 after deductions
    // Client rate needs to account for commission and VAT
    const expectedClientRate = 100 / (1 - 0.1 * (1 + 0.2));
    expect(result.clientRate).toBeCloseTo(expectedClientRate);
    expect(result.supplierTotal).toBeCloseTo(100);
  });

  test('remove scenario', () => {
    const result = calculate({
      action: 'remove',
      supplier: 'International',
      vatRegistered: 'no',
      rate: 200,
      commissionPercent: 20,
    });
    // Supplier receives amount after commission and VAT removed
    const expectedCommission = 200 * 0.2;
    const expectedVat = expectedCommission * 0.2;
    const expectedSupplierTotal = 200 - expectedCommission - expectedVat;
    expect(result.supplierTotal).toBeCloseTo(expectedSupplierTotal);
    expect(result.paidToSupplier).toBeCloseTo(expectedSupplierTotal);
  });
});
