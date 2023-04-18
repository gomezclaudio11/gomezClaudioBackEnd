import { loggerDefault } from '../config/logger.config.js';

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        loggerDefault.info(`Usuario autenticado ${req.user.username}`);
        next()
    } else {
        res.redirect('/login')
    }
}