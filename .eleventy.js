const { minify } = require("terser");

module.exports = function (eleventyConfig) {

  eleventyConfig.setLiquidOptions({
    // dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  eleventyConfig.addFilter("jsmin", async function(code) {
    try {
      let options = { toplevel: true };
      const minified = await minify(code, options);
      console.log(`Minified JS.`);
      return minified.code;
    } catch (err) {
      console.error("Terser error: ", err);
      console.error("Didn't minify JS.");
      // Fail gracefully.
      return code;
    }
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",
    ],
    markdownTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
    dir: {
      input: "_src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  }
};