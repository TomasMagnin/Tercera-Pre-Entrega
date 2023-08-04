import passport from 'passport';

class  SessionsController {

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
};

async getCurrentUser(req, res) {
    try {
        return res.status(200).json({ user: req.session.user });    
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

export const sessionsController = new SessionsController();

