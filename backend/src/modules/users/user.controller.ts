import { Request, Response } from "express";
import User from "./user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lalala';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El email ya está registrado.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: 'Usuario Registrado correctamente.',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({ success: false, message: 'Error en el registro', error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || user.disabled) {
            return res.status(401).json({ success: false, message: 'Usuario no valido o desabilitado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, admin: user.admin }, JWT_SECRET, { expiresIn: '1d' });
        
        return res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ success: false, message: 'Error en el login', error: (error as Error).message });
    }
};