export default function(eleventyConfig) {
  // Copier tous les assets (CSS, images, JS) vers dist
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collection projets triée par date décroissante
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    pathPrefix: "/Portfolio/", 
  };
};
