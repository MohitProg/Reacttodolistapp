import React from "react";

import { useState } from "react";

import NoteContext from "./notecontest";

const NoteState = (props) => {
  const host = "http://localhost:80";
  const Noteinitials = [];

  const [notes, setNotes] = useState(Noteinitials);

  //  get all notes

  const getNotes = async () => {
    // api call here
    const response = await fetch(`${host}/api/note/getallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
         localStorage.getItem("token"),
      },
    });
    const json = await response.json();
  


    setNotes(json);
  };

  // add note
  const Addnotes = async (title, description, tag) => {

    // api call here
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem("token"),
      },
      body: JSON.stringify({ title,description, tag }),

    });


    const res=await response.json()
  
 



    // api call here
    const note = {
      "title":title,
      "description":description,
      "tag":tag
    
    };
    setNotes(notes.concat(note));
  };

  // updateNote

  const editNote = async (id, title, description, tag) => {
 
    // appi call
    const response = await fetch(
      `${host}/api/note/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token":
           localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );

    const json = await response.json();


let newNotes= JSON.parse(JSON.stringify(notes))



    // logic to edit in client ?
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }

    }
    setNotes(newNotes)
  };

  
  // delete notes

  const DeleteNote = async (id) => {
    // API REQYEST
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
         localStorage.getItem("token"),
      },
    });
    const json = await response.json();
 

    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, Addnotes, editNote, DeleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
