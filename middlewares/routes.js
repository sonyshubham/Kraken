
/**
 * Load all the controllers
 */

module.exports = function (app) {

    const website          = require('../controllers/website_controller')
        // , users         = require('../controllers/users_controller')
        // , sessions      = require('../controllers/sessions_controller')
        // , registrations = require('../controllers/registrations_controller')
        // , shelves       = require('../controllers/shelves_controller')
        // , books         = require('../controllers/books_controller')
        // , likes         = require('../controllers/likes_controller')
        // , lists         = require('../controllers/lists_controller')
        // , follows       = require('../controllers/follows_controller')
        // , images        = require('../controllers/images_controller')
        // , ratings       = require('../controllers/ratings_controller')
        // , recommendation = require('../controllers/recommendation_controller')
        // , shelvesDrafts = require('../controllers/shelves_drafts_controller')

    app.use('/', website)
    // app.use('/shelves_drafts', shelvesDrafts)
    // app.use('/sessions', sessions)
    // app.use('/join', registrations)
    // app.use('/books', books)
    // app.use('/follows', follows)
    // app.use('/likes', likes)
    // app.use('/lists', lists)
    // app.use('/images', images)
    // app.use('/ratings', ratings)
    // app.use('/recommend', recommendation)
    // app.use('/', users)
    // app.use('/', shelves)

}