import React, { useContext, useReducer } from "react";
import {sideBarReducer}  from'./side-bar-reducer.js'
import {sideBarToggleStatus}  from'./side-bar-reducer.js'

const SideBarContext = React.createContext()

const SideBarContextDispath = React.createContext()

export  function useSideBarState(){
    const context = useContext(SideBarContext);
   
  
   
    return context;
}

export function useSideBarDispath(){
    const discontext = useContext(SideBarContextDispath);
  

    return discontext;
}



export function ProviderSideBar({children}){
    const [state,dispatch] = useReducer(sideBarReducer , sideBarToggleStatus)
    return(
        <SideBarContext.Provider value={state}>
            <SideBarContextDispath.Provider value={dispatch}>
             {children}
            </SideBarContextDispath.Provider>
        
    </SideBarContext.Provider>
    )
}