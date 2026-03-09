import { Router } from 'express'
import { middleware } from '../auth.js';
import { noteModel } from '../db.js';

export const noteRouter = Router();

noteRouter.post("/add", middleware, async (req, res) => {
    const note = req.body.note;
    const tag = req.body.tag

    try {

        const addedNote = await noteModel.create({
            note: note,
            tag: tag,
            userId: req.userId
        });

        if (!addedNote) {
            return res.status(403).send({
                message: "Could not add note"
            })
        }

        res.send({
            addedNote,
            message: "New Note Added"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error, Failed to add note" })
    }
});

noteRouter.get("/notes", middleware, async (req, res) => {
    const userId = req.userId;
    try {

        const response = await noteModel.find({
            userId
        });

        if (!response) {
            res.status(403).send({
                message: "Couldn't find Notes"
            })
        }

        res.send({
            response
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ messsage: "Internal server error, Failed to Search notes" });
    }

});


noteRouter.get("/notes:id", middleware, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.userId;
    try {

        const singleNote = await noteModel.findOne({
            _id: noteId,
            userId
        });

        if (!singleNote) {
            return res.status(403).send({
                message: "Could not find note"
            })
        }

        res.send({
            singleNote
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal server error, failed to fetch note"
        })
    }
});

noteRouter.put("/update:id", middleware, async (req, res) => {
    const userId = req.userId;

    const noteId = req.params.id;

    const note = req.body.note;
    const tag = req.body.tag;

    try {


        const updatedNote = await noteModel.findOneAndUpdate(
            { _id: noteId, userId }, //filter
            { note, tag },
            { returnDocument: 'after' }
        );

        if (!updatedNote) {
            return res.status(403).send({
                message: "Couldn't Update note"
            })
        }

        res.send({
            message: "Updated Note"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error, Failed to update note" })
    }

});

noteRouter.delete("/delete:id", middleware, async (req, res) => {
    const noteId = req.params.id;

    const userId = req.userId;
    try {

        const deletedNote = await noteModel.findOneAndDelete({
            userId,
            _id: noteId
        });

        if (!deletedNote) {
            return res.status(403).send({
                message: "Couldn't delete Note"
            })
        }

        res.send({
            message: "Note deleted successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error, failed to delete note" })
    }
});