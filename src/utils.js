const getMyCollection = (collectionName) => {
  switch (collectionName) {
    case "usuarios":
      return "usuarios";
    case "carritos":
      return "carritos";
    case "productos":
      return "productos";
    default:
      return null;
  }
};

export { getMyCollection };
