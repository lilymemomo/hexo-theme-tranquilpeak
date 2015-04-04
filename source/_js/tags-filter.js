+function($) {
    'use strict';

    // Filter posts by using their categories on categories page : `/categories`

    /**
     * TagsFilter
     * @param tagsArchivesElem
     * @constructor
     */
    var TagsFilter = function(tagsArchivesElem) {
        this.$inputSearch   = $(tagsArchivesElem + ' #filter-form input[name=tag]');
        this.$archiveResult = $(tagsArchivesElem).find('.archive-result');
        this.$tags          = $(tagsArchivesElem).find('.tag');
        this.$posts         = $(tagsArchivesElem).find('.archive');
        this.tags           = tagsArchivesElem + ' .tag';
        this.posts          = tagsArchivesElem + ' .archive';
        // Html data attribute without `data-` of `.archive` element which contains the name of tag
        this.dataTag = 'tag';
    };

    /**
     * Run TagsFilter feature
     */
    TagsFilter.prototype.run = function() {
        var self = this;

        // Detect keystroke of the user
        self.$inputSearch.keyup(function() {
            self.filter(self.getSearch());
        })
    };

    /**
     * Get the search entered by user
     */
    TagsFilter.prototype.getSearch = function() {
        return this.$inputSearch.val().replace('.', '__').toLowerCase();
    };

    /**
     * Show related posts form a tag and hide the others
     * @param tag
     */
    TagsFilter.prototype.filter = function(tag) {
        if (tag == '') {
            this.showAll();
            this.showResult(-1);
        }
        else {
            this.hideAll();
            this.showPosts(tag);
            this.showResult(this.countTags(tag));
        }
    };

    /**
     * Display results of the search
     * @param numbTags
     * @returns {Number}
     */
    TagsFilter.prototype.showResult = function(numbTags) {
        if (numbTags == 0) {
            this.$archiveResult
                .html('No tags found')
                .show();
        }
        else if (numbTags == -1) {
            this.$archiveResult
                .html('')
                .hide();
        }
        else {
            this.$archiveResult
                .html(numbTags + ' tag' + ((numbTags > 1) ? 's' : '') + ' found')
                .show();
        }
    };

    /**
     * Count number of tags
     * @param tag
     * @returns {Number}
     */
    TagsFilter.prototype.countTags = function(tag) {
        return $(this.posts + '[data-' + this.dataTag + '*=' + tag + ']').length;
    };

    /**
     * Show all posts from a tag
     * @param tag
     */
    TagsFilter.prototype.showPosts = function(tag) {
        $(this.tags + '[data-' + this.dataTag + '*=' + tag + ']').show();
        $(this.posts + '[data-' + this.dataTag + '*=' + tag + ']').show();
    };

    /**
     * Show all tags and all posts
     */
    TagsFilter.prototype.showAll = function() {
        this.$tags.show();
        this.$posts.show();
    };

    /**
     * Hide all tags and all posts
     */
    TagsFilter.prototype.hideAll = function() {
        this.$tags.hide();
        this.$posts.hide();
    };

    $(document).ready(function() {
        if ($('#tags-archives').length) {
            var tagsFilter = new TagsFilter('#tags-archives');
            tagsFilter.run();
        }
    });
}(jQuery);