module.exports = function (eleventyConfig) {
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

  // Posts collection:
  // - Exclude drafts/future posts in production
  // - Always set clean permalink /blog/<slug>/
  eleventyConfig.addCollection('post', (collection) => {
    const isProd = process.env.ELEVENTY_ENV === 'production';
    return collection
      .getFilteredByTag('post')
      .filter((item) => {
        if (isProd && item.data.draft) return false;
        if (isProd && item.date > new Date()) return false;
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
