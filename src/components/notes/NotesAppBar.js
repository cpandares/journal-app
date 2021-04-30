import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploading } from "../../actions/notes"

export const NotesAppBar = ()=>{

   

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes);

    const handleUpdateNote = ()=>{
        dispatch( startSaveNotes(active) )
    }

  const  handlePictureUpload = ()=>{
        document.querySelector('#file').click();
    }

    const handleFileChange = (e)=>{
      const filesUpload = e.target.files[0];

      if(filesUpload){
          dispatch( startUploading(filesUpload) )
      }
    }

    return(
        <div className="notes__appbar">

            <span>27 abril 2021 </span>
            
            <input  type="file" 
                    id="file"
                    name="file"
                    style={{ display:'none' }}
                    onChange = { handleFileChange }
                    />

            <div>
                <button
                    onClick = { handlePictureUpload } 
                    className="btn">
                    pincture
                </button>
                <button 
                    className="btn"
                     onClick = {handleUpdateNote}   
                    >
                    Save
                </button>
            </div>
        </div>
    )

}