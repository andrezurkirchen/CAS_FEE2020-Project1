import {notes} from '../services/notes'
//import {SecurityUtil} from '../utils/security'

export class NotesController {

    async getOrders(req, res) {
        res.json((await orderStore.all(SecurityUtil.currentUser(req)) || []))
    };

    async createPizza(req, res) {
        res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
    };

    async showOrder(req, res) {
        res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    async deleteOrder(req, res) {
        res.json(await orderStore.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const notesController = new NotesController();