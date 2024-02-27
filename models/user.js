import { customRequire } from "../utils.js";
import { randomUUID } from "node:crypto";

const users = customRequire("./data.json");

export class User {
    static async getAll ({gender}) {
        if (gender) {
            return users?.filter(user => user?.gender === gender);
        } else {
            return users;
        }
    }

    static async getById ({id}) {
        const currentUser = users?.find(user => user?.id === id);
        return currentUser;
    }

    static async createUser ({input}) {
        const newUser = {
            ...input,
            id: randomUUID(),
        }

        return newUser;
    }

    static async updateUser ({id, input}) {
        const itemIdx = users?.findIndex(user => user.id === id)

        if (itemIdx < 0) {
            return false
        }
    
        const user = users[itemIdx];
    
        const updatedUser = {
            ...user,
            ...input,
        }

        return updatedUser;
    }
}