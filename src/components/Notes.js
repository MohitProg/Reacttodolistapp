import React from "react";
import { useContext, useEffect, useRef ,useState} from "react";
import NoteContext from "../contest/notes/notecontest";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const ref = useRef(null);
  const refClose=useRef(null);
  let Navigate=useNavigate()

 const [newNote, setnewNote] = useState({id:"" , etitle:"",edescription:"",etag:""})



  useEffect(() => {

    if(localStorage.getItem("token")){
      getNotes();

    }else{
  Navigate("/login")
    }
  }, []);



  
  const updateNote = (note) => {
    ref.current.click();


  setnewNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})

  };

  const handleClick=(e)=>{
    e.preventDefault()
    refClose.current.click();

    console.log("update a note ",newNote)

    editNote(newNote.id,newNote.etitle,newNote.edescription,newNote.etag)
  }


  const onChange = (e) => {

    setnewNote({...newNote,[e.target.name]:e.target.value})


  };
  return (
    <>
      <Addnote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* update modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
           
                title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title..
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={newNote.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="edescription"
                    onChange={onChange}
                    id="edescription"
                    rows="3"
                      value={newNote.edescription}
                    
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    className="form-control"
                    id="etag"
                    name="etag"
                      value={newNote.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  type="button" onClick={handleClick} className="btn btn-success">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row p-3 justify-content-center">
        {notes.length===0 && "NO NOTES TO DISPALY"}
          {notes.map((note) => {
     
            return (
              <>
                <Noteitem
          
                 
                  updateNote={() => updateNote(note)}
                  note={note}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
