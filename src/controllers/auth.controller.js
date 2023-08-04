import { UserModel } from "../DAO/models/users.model.js";


class AuthController {

async renderSessionView(req, res) {
    try {
        return res.send(JSON.stringify(req.session));    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }  
 }

 async renderLoginView(req, res) {
    try {
        return res.render("login", {});    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

 async handleLogin(req, res) {
    try {
        if (!req.user) {
            return res.json({ error: 'invalid credentials' });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
        return res.redirect('/api/products');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
    
 };

async renderFailLoginView(req, res) {
    try {
        return res.json({ error: 'fail to login' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }    
 };

 async renderRegisterView(req, res) {
    try {
        return res.render("register", {});    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

 async handleRegister(req, res) {
    try {
        if (!req.user) {
            return res.json({ error: 'something went wrong' });
        }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
        return res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

async renderFailRegisterView(req, res) {
    try {
        return res.json({ error: 'fail to register' });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

 renderProductsView = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.session.email });
        if (user) {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                cartID: user.cartID,
                role: user.role,
            };
            return res.render('products', { user: userData });
        } else {
            return res.render('products', { user: null });
        }
    } catch (error) {
        console.error(error);
        return res.render('products', { user: null, error: 'Error retrieving user data' });
    }
 };

 async renderProfileView(req, res) {
    try {
        const user = { email: req.session.email, role: req.session.role };
        return res.render('profile', { user: user });    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });    
    }
 };

 async handleLogout(req, res) {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { error: 'session couldnt be closed' });
            }
            return res.redirect('/auth/login');
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
    
 };

 async renderAdministrationView(req, res) {
    try {
        const user = req.session.user;
        return res.render('admin',{user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

async renderGitHubLogin(req, res) {
    try {
        return passport.authenticate('github', { scope: ['user:email'] })(req, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

async handleGitHubCallback(req, res) {
    try {
        passport.authenticate('github', { failureRedirect: '/login' })(req, res, (err) => {
            if (err) {
                console.error('Error in auth GitHub callback:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
 };

}


export const authController = new AuthController();
