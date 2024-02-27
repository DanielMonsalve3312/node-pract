import { validatePartialUserSchema, validateUserSchema } from '../schema.js';
import { User } from '../models/user.js';

export class UsersController {
    static async getAll (req, res) {
        const {gender} = req.query;
        const filterUsers = await User.getAll({gender})
        res.send(filterUsers)
    }

    static async getById (req, res) {
        const currentUser = await User.getById({id: Number(req.params.id)})
    
        if (currentUser) {
            res.send(currentUser)
        } else {
            res.status(404).send({message: "The user that you intent search don't exist"});
        }
    }

    static async create (req, res) {
        const validationResult = validateUserSchema(req.body);
    
        if (validationResult.error) {
            res.status(400).json({ error: JSON.parse(validationResult.error.message) })
        }
    
        const newUser = await User.createUser({input: validationResult.data});
    
        res.status(201).json(newUser);
    }

    static async update (req, res) {
        const information = validatePartialUserSchema(req.body);
        
        if (information.error) {
            return res.status(400).json({message: JSON.parse(information?.error?.message)})
        }
        
        const updatedUser = await User.updateUser({id: Number(req.params.id), input: information.data});
    
        if (updatedUser === false) {
            return res.status(404).json({message: "404 not found"})
        }
    
        res.status(201).json(updatedUser);
    }
}