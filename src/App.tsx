import React, { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";

function App() {
    type Note = {
        id: string;
        body: string;
    };

    const [notes, setNotes] = useState<Note[]>(() =>
        JSON.parse(localStorage.getItem("notes") || "[]")
    );

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const [currentNoteId, setCurrentNoteId] = useState(
        () => (notes[0] && notes[0].id) || ""
    );

    function deleteNote(event: any, noteId: string) {
        event.stopPropagation();
        setNotes((oldNotes) =>
            oldNotes.filter((note) => {
                return note.id !== noteId;
            })
        );
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        };

        setNotes((prev: any) => {
            return [newNote, ...prev];
        });

        setCurrentNoteId(newNote.id);
    }

    function updateNote(text: string) {
        setNotes((oldNotes) => {
            const newList: { id: string; body: string }[] = [];

            for (let i = 0; i < oldNotes.length; i++) {
                if (oldNotes[i].id === currentNoteId) {
                    const tempNote = {
                        id: oldNotes[i].id,
                        body: text,
                    };
                    newList.unshift(tempNote);
                } else {
                    newList.push(oldNotes[i]);
                }
            }

            return newList;
        });
    }

    function findCurrentNote() {
        return (
            notes.find((note) => {
                return note.id === currentNoteId;
            }) || notes[0]
        );
    }
    return (
        <main>
            {notes.length > 0 ? (
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className="split"
                >
                    <Sidebar
                        notes={notes}
                        currentNote={findCurrentNote()}
                        setCurrentNoteId={setCurrentNoteId}
                        newNote={createNewNote}
                        deleteCurrentNoteId={deleteNote}
                    />
                    {currentNoteId && notes.length > 0 && (
                        <Editor
                            currentNote={findCurrentNote()}
                            updateNote={updateNote}
                        />
                    )}
                </Split>
            ) : (
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                </div>
            )}
        </main>
    );
}

export default App;
