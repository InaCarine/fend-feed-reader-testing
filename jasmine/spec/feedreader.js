/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a url defined in each feed', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
                // Checks that the feed got a valid url based on a regular expression
                expect(feed.url).toMatch(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined in each feed', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
       
       /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
        it('changes visibility when clicked', function() {
            let button = $('.menu-icon-link');
            
            // is it okay to do it like this?
            // Or is there a better way?
            // Triggers a click on the menu button
            button.trigger("click");
            // Then expect the menu to be showing
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            // Click the button again
            button.trigger("click");
            // And expect the menu to be hidden again
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // Run the loadFeed function before each test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least one single entry', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
`   `});


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let prevData, newData;

        beforeEach(function(done) {
            // Wait for first feed to load, and get the data
            loadFeed(0, function () {
                prevData = $('.feed').html();

            // Then change the feed and get the new data that was loaded
                loadFeed(1, function() {
                    newData = $('.feed').html();
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        it('changes content on feed selection', function(done) {
            expect(prevData).not.toBe(newData);
           done();
        });
    });
}());
