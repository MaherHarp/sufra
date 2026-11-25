/** Builds a base Unsplash image URL; the image loader adds size and format. */
export const u = (id: string) => `https://images.unsplash.com/${id}`;

export const siteImages = {
  hero: {
    src: u("photo-1785734290864-eca98549d0b6"),
    alt: "A table laden with Middle Eastern dishes, dips and drinks",
  },
  beginner: {
    src: u("photo-1636647511603-f46efb36c327"),
    alt: "A cook stirring a pot with a wooden spoon",
  },
  pantry: {
    src: u("photo-1581600140682-d4e68c8cde32"),
    alt: "Cinnamon sticks, star anise, peppercorns and ground spices on a wooden board",
  },
  spread: {
    src: u("photo-1786174045055-1eb50942e273"),
    alt: "A platter of hummus, tabbouleh, falafel and grilled meats with pita bread",
  },
};
