export  const sideBarToggleStatus = {
    headerToggle: false,
    sidebarToggle: false,
    mainToggle: false
}


export  function sideBarReducer(state, action) {
    switch (action.status) {
        case true:
            return {
                ...state,
                headerToggle: true,
                sidebarToggle: true,
                mainToggle: true

            }

        case false:
            return {
                ...state,
                headerToggle: false,
                sidebarToggle: false,
                mainToggle: false

            }
        default:
            break;
    }
}