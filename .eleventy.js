const CleanCSS = require("clean-css");
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/_images/*");
  eleventyConfig.addPassthroughCopy({ "_src/_data/*": "data/" });
  eleventyConfig.addPassthroughCopy({ "_src/_includes/css/*.css": "css/" });
  eleventyConfig.addPassthroughCopy({ "_src/_favicon/*": "./" });
  eleventyConfig.addPassthroughCopy("_src/prototypes/**/*.css");
  eleventyConfig.addPassthroughCopy("_src/prototypes/**/*.js");
  eleventyConfig.addPassthroughCopy("_src/prototypes/**/*.json");
  eleventyConfig.addPassthroughCopy("_src/prototypes/**/*.png");

  eleventyConfig.addFilter("jsmin", async function (code) {
    try {
      const minified = await minify(code);
      console.log(`Minified JS.`);
      return minified.code;
    } catch (err) {
      console.error("Terser error: ", err);
      console.error("Didn't minify JS.");
      // Fail gracefully.
      return code;
    }
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    let cleanedCSS = new CleanCSS({}).minify(code);
    let minifiedCSSSize = cleanedCSS.stats.minifiedSize / 1000;
    console.log("Minified CSS: " + minifiedCSSSize + " kb");
    return cleanedCSS.styles;
  });

  eleventyConfig.setLiquidOptions({
    // dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
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