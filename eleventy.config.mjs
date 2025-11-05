export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("projects", function(collectionApi) {
    // Récupère tous les fichiers Markdown dans src/projects et trie par date décroissante
    return collectionApi.getFilteredByGlob("src/projects/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
