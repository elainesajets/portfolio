module.exports = function (eleventyConfig) {
  // Ignore drafts folder in production builds
  if (process.env.ELEVENTY_RUN_MODE === 'build') {
    eleventyConfig.ignores.add('./src/posts/drafts/**');
  }
  // Copy assets as-is
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });

  // Custom date filter for templates
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return new Date(dateObj).toLocaleDateString('no-NO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  });

  eleventyConfig.addGlobalData('eleventyComputed', {
    eleventyExcludeFromCollections: (data) =>
      data.draft === true && process.env.ELEVENTY_RUN_MODE === 'build',
    permalink: (data) =>
      data.draft === true && process.env.ELEVENTY_RUN_MODE === 'build'
        ? false
        : data.permalink,
  });

  // Posts collection:
  // - Exclude drafts/future posts in production
  // - Always set clean permalink /blog/<slug>/
  eleventyConfig.addCollection('post', (collection) => {
    const isBuild = process.env.ELEVENTY_RUN_MODE === 'build';
    return collection
      .getFilteredByTag('post')
      .filter((item) => {
        if (isBuild && item.data.draft) return false;
        if (isBuild && item.date > new Date()) return false;
        return true;
      })
      .map((item) => {
        item.data.permalink = `/blog/${item.fileSlug}/`;
        return item;
      });
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
