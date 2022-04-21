import React from "react";

export default function Sidebar(props: {
    notes: any;
    currentNote: any;
    setCurrentNoteId: any;
    newNote: any;
    deleteCurrentNoteId: any;
}) {
    function getNoteTitle(note: any) {
        const bodyArray = note.body.split("\n");
        const title = bodyArray[0].replace(/[^a-z0-9 -]/gi, "");
        return title;
    }

    const noteElements = props.notes.map((note: any, index: number) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{getNoteTitle(note)}</h4>
                <button
                    className="delete-btn"
                    onClick={(e) => props.deleteCurrentNoteId(e, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>
                    +
                </button>
            </div>
            {noteElements}
        </section>
    );
}
