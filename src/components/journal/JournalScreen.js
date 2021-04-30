import { NothingSelected } from "./NothingSelected";
import { useSelector } from "react-redux";
import { NoteScrenn } from "../notes/NoteScreen";
import { Sidebar } from "./Sidebar";


export const JournalScreen = ()=>{

     const { active } = useSelector( state => state.notes )

    return (
        <div className="journal__main-content">
            
            <Sidebar />

            <main>

               { 
                    (active)
                        ? (<NoteScrenn />)
                        : (<NothingSelected />)

              }
                
            </main>

        </div>
    )

}