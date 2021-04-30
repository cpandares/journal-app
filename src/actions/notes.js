import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { filesUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';



export const addNewNote = ()=>{

    return async ( dispatch, getState ) =>{

        const { uid } = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

       dispatch(activeNote( doc.id,newNote ))

       dispatch( addNewNoteStart(doc.id, newNote) )

    }

}

export const startLoadingNotes = ( uid )=>{

   return async ( dispatch ) =>{
     const notes = await loadNotes(uid); //Mostrar notas
     dispatch(setNotes( notes ))
   }

}

export const activeNote = (id, note )=>({

    type: types.notesActive,
    payload:{
        id,
        ...note
    }


});

export const addNewNoteStart = (id, note)=>({

    type: types.notesAddNew,
    payload: {id, ...note}

});


export const setNotes = (notes)=>({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNotes = ( note )=>{
    
    return async ( dispatch, getState )=>{
        
       const { uid } = getState().auth;

    if(!note.url){
        delete note.url;
    }

       const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNotes(note.id, noteToFirestore));

        Swal.fire('Guardada', note.title, 'success');
    }

  

}

export const refreshNotes = (id,note)=>({

    
    type: types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
    
})

export const startUploading = ( file )=>{

    return  async( dispatch, getState )=>{

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title:'Uploading...',
            text:'Please  wait...',
            allowOutsideClick:false,
            didOpen: ()=>{
                Swal.showLoading();
            }
        })

        const fileUrl = await filesUpload(file);

        activeNote.url = fileUrl

        dispatch( startSaveNotes( activeNote ) )

        Swal.close()
       

    }

}

export const startDeleting = (id)=>{

    Swal.fire({
        title:'Deleting...',
        text:'Please  wait...',
        allowOutsideClick:false,
        didOpen: ()=>{
            Swal.showLoading();
        }
    })

    return async ( dispatch, getState )=>{
        
        //El id del Usuario
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch(deleteNote(id) );

        Swal.close()
    }

}

export const deleteNote = (id)=>({
    type: types.notesDelete,
    payload:id
});

export const noteLogout = ()=>({

    
    type: types.notesLogoutCleaning
  


});