export const getCategoryEmoji = (category) => {
  const emojiMap = {
    Electronics: '📱',
    'Jewellery & Accessories': '💍',
    'Handmade & Crafts': '🎨',
    'Clothing & Fashion': '👕',
    'Health & Beauty': '🌿',
  };

  return emojiMap[category] || '🛍️';
};

export const getStockBadge = (stock) => {
  const isLowStock = Number(stock) < 5;

  return {
    label: isLowStock ? 'LOW STOCK' : 'NEW',
    className: isLowStock ? 'bg-danger text-white' : 'bg-primary text-white',
  };
};

export const hasUsableProductImage = (image) => {
  if (!image) return false;
  return !String(image).includes('placeholder');
};
