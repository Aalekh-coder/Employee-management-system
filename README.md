 function calculationOfTotalAmount() {
    const totalServicePrice = selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
    let priceAfterDiscount = totalServicePrice;

    if (invoiceFormData?.discountPercentage > 0) {
      const discountValue =
        (totalServicePrice * invoiceFormData?.discountPercentage) / 100;

      priceAfterDiscount = totalServicePrice - discountValue;
    } else if (invoiceFormData?.discount > 0) {
      priceAfterDiscount = totalServicePrice - invoiceFormData.discount;
    }

    if (tanNo) {
      priceAfterDiscount = priceAfterDiscount * 0.98;
    }

    const finalAmountWithGST = priceAfterDiscount * 1.18;
    return finalAmountWithGST;
  }

<!-- lastest  -->
  function calculationOfTotalAmount() {
  // 1️⃣ Calculate total price of selected services
  const totalServicePrice = selectedServices.reduce(
    (total, service) => total + Number(service.price || 0),
    0
  );

  let priceAfterDiscount = totalServicePrice;


  if (tanNo) {
    priceAfterDiscount = priceAfterDiscount * 0.98;
  }

  // 5️⃣ Add 18% GST
  const finalAmountWithGST = priceAfterDiscount * 1.18;

  // 6️⃣ Final amount rounded
  return Number(finalAmountWithGST.toFixed(2));
}