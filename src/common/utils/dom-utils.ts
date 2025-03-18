export const elementTextContext = (
  element: Element | HTMLHeadingElement | null,
) => {
  return element?.textContent?.trim() || '';
};

export const elementAttribute = (attribute: Element | null) => {
  return attribute?.getAttribute('href') || '';
};
