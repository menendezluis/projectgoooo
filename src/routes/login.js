import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import { usuarios } from '../dao/index.js';

const rutaLogin = express.Router();

const where ="usuarios";

//passport
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done)=>{
        const { email, name, address, age, tel, img } = req.body;
        const allUsuarios = await usuarios.getAll(where);
        const usuario = allUsuarios.find((usuario) => usuario.username == username);
        if (usuario) {
            return done(null, false);//res.sendFile('/views/register-error.html', { root: '.' });
        };
        const user = { username, password, email , name, address, age, tel, img};

        await usuarios.save(user);
        return done(null, user);
    }));

passport.use('login', new LocalStrategy(async (username, password, done)=>{
    const allUsuarios = await usuarios.getAll(where);
    const usuario = allUsuarios.find((usuario) => usuario.username == username && usuario.password == password);
    if (!usuario) {
        return done(null,false);//res.sendFile('/views/login-error.html', { root: '.' });
    };
    return done(null, usuario);//res.redirect('/auth/datos');
}));

//serializado de datos sensibles
passport.serializeUser((user, done)=>{
    done(null, user.username);
});

passport.deserializeUser(async(username, done)=>{
    
    const allUsuarios = await usuarios.getAll(where); 
    const usuario = allUsuarios.find(usuario => usuario.username == username);
    if(usuario){
        done(null, usuario);
    } else {
        done(null, false); 
    };

});

//endopoints
rutaLogin.get('/register', (req, res) => {
    res.sendFile('/views/register.html', { root: '.' });
});

rutaLogin.post('/register', passport.authenticate('register', { failureRedirect: '/auth/registerError', successRedirect: '/auth/'}));

rutaLogin.post('/login', passport.authenticate('login', { failureRedirect: '/auth/loginError', successRedirect: '/auth/datos'}));

rutaLogin.get('/loginError', (req, res) => {
    res.sendFile('/views/login-error.html', { root: '.' });
});

rutaLogin.get('/registerError', (req, res) => {
    res.sendFile('/views/register-error.html', { root: '.' });
});

rutaLogin.get('/login', (req, res) => {
    res.sendFile('/views/login.html', { root: '.' });
});

rutaLogin.get('/datos', async (req, res) => {
    const allUsuarios = await usuarios.getAll(where);
    const usuario = allUsuarios.find(element => element.username == req.user.username);
    if (req.isAuthenticated()){
        req.session.username = req.user.username;
        req.session._id = usuario.id
        
        res.render('carritos',{
            usuario : usuario.username,
        })
    } else {
        res.redirect('/auth/login');
    } 
});
  
rutaLogin.get('/logout', (req, res) => {
    
    req.session.destroy((err)=>{
        if (!err) {
            return res.redirect('/auth/login');
          } else {
            return res.redirect('/auth/login');
          }
    })
});

rutaLogin.get('/', (req, res) => {
    if (req.isAuthenticated()){
        res.redirect('/auth/datos');
    } else {
        res.redirect('/auth/login');
    }
});

export { rutaLogin };