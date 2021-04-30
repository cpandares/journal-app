import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';


export  const NoteScrenn  = ()=>{

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);

     const [formValues, handleInputChange, reset] = useForm( note );

     const {body,title,id} = formValues;

     //usar el UseRef para marcar la referencia a al nota activa

     const activeId = useRef( note.id );

     useEffect(()=>{

        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }

     },[note,reset])

     useEffect(()=>{

      dispatch(activeNote(formValues.id, {...formValues}))

     },[formValues,dispatch]);

     const handleDelete = ()=>{
         dispatch(startDeleting(id))
     }

    return(

        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input type="text"
                        placeholder="Awosome Things here"
                        className="notes__title-input"
                        autoComplete="off"
                        value={ title }
                        name="title"
                        onChange = { handleInputChange }
                
                />

                <textarea className="notes__text-area" 
                          placeholder="todayyy"
                          value={ body }
                          name="body"
                          onChange = { handleInputChange }
                          >

                </textarea>
                {
                    note.url &&
                    <div className="notes__image">
                        <img src={ note.url } 
                            
                        />

                    </div>
                }
            </div>
            
            <button className="btn btn-danger" onClick = { handleDelete }>Delete</button>

        </div>
    )

}