function calculate({ action, supplier, vatRegistered = 'no', rate, commissionPercent }) {
  const commissionRate = commissionPercent / 100;
  const vatRate = 0.2;

  let clientRate = 0;
  let commissionValue = 0;
  let vatValue = 0;
  let totalDeductions = 0;
  let paidToSupplier = 0;
  let supplierVAT = 0;
  let supplierTotal = 0;
  let explanation = '';

  if (action === 'add') {
    if (supplier === 'uk' && vatRegistered === 'no') {
      clientRate = rate / (1 - commissionRate * (1 + vatRate));
    } else {
      clientRate = rate / (1 - commissionRate);
    }
    commissionValue = clientRate * commissionRate;
    vatValue = commissionValue * vatRate;

    totalDeductions = commissionValue + vatValue;
    paidToSupplier = clientRate - totalDeductions;
    supplierTotal = rate;
    supplierVAT = supplier === 'uk' && vatRegistered === 'yes' ? vatValue : 0;

    explanation =
      `You entered a supplier rate of £${rate.toFixed(2)} and a commission of ${commissionPercent}%.` +
      ` To ensure the supplier receives £${rate.toFixed(2)} after commission and VAT deductions, the client must be charged £${clientRate.toFixed(2)}.`;
  } else if (action === 'remove') {
    clientRate = rate;
    commissionValue = clientRate * commissionRate;
    vatValue = commissionValue * vatRate;
    totalDeductions = commissionValue + vatValue;
    paidToSupplier = clientRate - totalDeductions;
    supplierVAT = supplier === 'uk' && vatRegistered === 'yes' ? vatValue : 0;
    supplierTotal = paidToSupplier + supplierVAT;

    explanation =
      `You entered a client rate of £${clientRate.toFixed(2)} and a commission of ${commissionPercent}%.` +
      ` After deducting commission and VAT, the supplier receives £${supplierTotal.toFixed(2)}.`;
  } else {
    throw new Error('Invalid action');
  }

  return {
    clientRate,
    commissionValue,
    vatValue,
    totalDeductions,
    paidToSupplier,
    supplierVAT,
    supplierTotal,
    explanation,
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculate };
} else {
  window.calculate = calculate;
}
