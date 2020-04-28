export const getPrismicText = text => {
  return text.reduce((total, item) => total + item.text, "");
};
