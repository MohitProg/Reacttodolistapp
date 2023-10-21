import React from 'react'
import { useContext } from 'react'
import NoteContext from '../contest/notes/notecontest';

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {DeleteNote} = context

 
  return (
 <>


<div className="card col-lg-3  border border-success my-2 mx-2"  key={props.note._id}>

  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <hr />
    <p className="card-text">{props.note.description}
    </p>
    <span><i className="bi  mx-2 bi-trash-fill" onClick={()=>{DeleteNote(props.note._id)}}></i></span>
    <span>  <i className="bi bi-pencil-square" onClick={()=>{props.updateNote()}}></i></span>

  </div>
</div>
 </>
  )
}

export default Noteitem;
