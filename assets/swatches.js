const swatchesVariantsContainer = document?.querySelector("#swatches-variants");
const variantContainer =
  swatchesVariantsContainer?.querySelectorAll(".variant-container");
const inventories =
  swatchesVariantsContainer?.querySelector("#stockData")?.innerHTML;

const removeActiveClass = (elements) => {
  elements?.forEach((elem) => {
    elem?.classList?.remove("active");
  });
  const variantElements = document?.querySelectorAll(
    `.variant-container .variant-value`
  );

  variantElements?.forEach((i) => {
    i?.classList?.remove("disabled");
  });
};

const checkVariantStock = () => {
  const selectedVariants = document?.querySelectorAll(
    `.variant-container .variant-value.active`
  );
  let isInStock = "no";

  const selectedVariantsArr = [...selectedVariants]?.map(
    (item) =>
      `${item?.dataset?.name?.toLowerCase()}-${item?.dataset?.value
        ?.replace("gid://shopify/MediaImage/", "gid-shopify-media-image-")
        ?.replace(/#/gi, "")
        ?.replace(/[:\/]+/gi, "-")}`
  );
  if (selectedVariantsArr?.length !== variantContainer?.length) {
    isInStock = "ignore";
    return isInStock;
  }

  if (inventories) {
    const inventoriesArr = Object.keys(JSON.parse(inventories)?.stock);
    if (inventoriesArr?.length > 0) {
      inventoriesArr?.forEach((item) => {
        const valueArr = item?.split("__");
        const checkEveryElem1 = valueArr?.every((i) =>
          selectedVariantsArr?.includes(i)
        );
        const checkEveryElem2 = selectedVariantsArr?.every((i) =>
          valueArr?.includes(i)
        );
        if (checkEveryElem1 && checkEveryElem2) {
          isInStock = "yes";
        }
      });
    }
  }
  return isInStock;
};

variantContainer?.forEach((variant) => {
  const variantElements = variant?.querySelectorAll(".variant-value");
  variantElements?.forEach((elem) => {
    elem?.addEventListener("click", function (e) {
      removeActiveClass(variantElements);
      e?.currentTarget?.classList?.add("active");
      const notInStock = checkVariantStock();
      console.log(notInStock);
      if (notInStock === "no") {
        const variantElements = document?.querySelectorAll(
          `.variant-container .variant-value.active`
        );
        variantElements?.forEach((i) => {
          i?.classList?.add("disabled");
        });
      }
    });
  });
});
