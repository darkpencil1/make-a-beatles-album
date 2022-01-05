import { createSlice} from "@reduxjs/toolkit";



interface AlbumState {
    value: string[]
  }
  
const initialState = { value: ["moikka", "hyvä biisi", "kolmas biisi", "Hello"] } as AlbumState

export const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        addSong: (state, action) => {
            state.value.push(action.payload)
        },
        removeSongs: (state) => {
            state.value = []
        },
        moveSongUp: (state,action)=>{
            const song = state.value[action.payload]
            //Remove song from current index
            state.value.splice(action.payload,1)
            //Add song to old index -1
            state.value.splice(action.payload-1, 0, song)
        
            
        },
        moveSongDown: (state, action)=>{
            const song = state.value[action.payload]
            //Remove song from current index
            state.value.splice(action.payload, 1)
            //Add song to old index +1
            state.value.splice(action.payload+1 ,0, song)

        },
        removeSong: (state, action)=>{
            //Remove song from current index
            state.value.splice(action.payload,1)
        },
    }
})

export const {addSong, removeSongs, moveSongUp, moveSongDown, removeSong} = albumSlice.actions
export default albumSlice.reducer