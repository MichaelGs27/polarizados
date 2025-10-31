const UsersService = require('../services/users.service');
const usersService = new UsersService();

class UsersController {
    async getPublicProfile(req, res) {
        try {
            const userId = req.params.idUser;
            const profile = await usersService.getPublicProfile(userId);
            
            if (!profile) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const profile = await usersService.getProfile(req.users.idUser);
            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const updatedUsuario = await usersService.update(req.users.idUser, req.body);
            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await usersService.delete(req.users.idUser);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changePassword(req, res) {
        try {
            const { oldpassword, newpassword } = req.body;
            await usersService.changePassword(req.users.idUser, oldpassword, newpassword);
            res.json({ message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getDashboard(req, res) {
        try {
            const dashboard = await usersService.getDashboard(req.users.idUser);
            res.json(dashboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UsersController();