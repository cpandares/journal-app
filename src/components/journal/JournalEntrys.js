import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";


export const JournalEntries = ()=>{

    //const entrys = [1,2,3,4,5,6,7,8,9,10];

    const {notes} = useSelector( state =>state.notes )
    console.log(notes)

    return (
        
        <div className="journal__entrys">
           {
               notes.map(note =>(
                   <JournalEntry key={note.id} 
                                { ...note }
                   />
               ))
           }
        </div>

    )


}