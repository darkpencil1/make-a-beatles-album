import { createSlice} from "@reduxjs/toolkit";



interface SongsState {
    value: string[]
  }
  
const initialState = { value: [] } as SongsState

/*const initialState = {
    value: {
        songs: [""]
    }
}*/

export const songSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        changeSongs: (state, action)=>{
            state.value = action.payload
        },
        removeSelectedSongs: (state)=>{
            state.value = []
        }
    }

})

export const {changeSongs, removeSelectedSongs} = songSlice.actions

export default songSlice.reducer