import React from 'react'
import { useContext ,useState} from 'react'
import NoteContext from '../contest/notes/notecontest';


const Addnote = () => {
    const context = useContext(NoteContext);
    const { notes,Addnotes } = context

    const [note, setnote] = useState({title:"",description:"",tag:""})


    const handleclick=(e)=>{
        e.preventDefault()

        Addnotes(note.title,note.description,note.tag)

        setnote({title:"",description:"",tag:""})



    }

    const onChange=(e)=>{

        setnote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div>
      <div className="container p-4">
        <h1 className='text-center mt-3'>ADD NOTES</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title..</label>
            <input type="text" value={note.title} onChange={onChange} className="form-control" id="title" name='title' minLength={5} aria-describedby="emailHelp" required  />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea value={note.description} className="form-control" name='description' onChange={onChange} id="description" minLength={5} rows="3" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" value={note.tag} onChange={onChange} className="form-control" minLength={3} id="tag" name='tag' required />
          </div>



          <button type="submit" className="btn  btn-success" onClick={handleclick}>Submit</button>
        </form>
        <h1 className='mt-3' >Your Notes</h1>



    


      </div>
    </div>
  )
}

export default Addnote
