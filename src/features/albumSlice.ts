import { createSlice} from "@reduxjs/toolkit";

type Song = {
    name: string,
    artist: string
}

interface AlbumState {
    value: {
        songs: Song[],
        albumName: string,
        keywords: string[],
        description: string,
    }
}
  
const initialState = { value: {songs: [], albumName: "", keywords: [], description: ""} } as AlbumState

export const albumSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        addSong: (state, action) => {
            state.value.songs.push(action.payload)
            
        },
        removeAlbum: (state) => {
            state = initialState
        },
        moveSongUp: (state,action)=>{
            const song = state.value.songs[action.payload]
            const index = action.payload
            if(index > 0){
                //Remove song from current index
                state.value.songs.splice(action.payload,1)
                //Add song to old index -1
                state.value.songs.splice(action.payload-1, 0, song)
            }
        },
        moveSongDown: (state, action)=>{
            const song = state.value.songs[action.payload]
            const index = action.payload
            if(index < state.value.songs.length-1){
                //Remove song from current index
                state.value.songs.splice(action.payload, 1)
                //Add song to old index +1
                state.value.songs.splice(action.payload+1 ,0, song)
            }

        },
        removeSong: (state, action)=>{
            //Remove song from current index
            state.value.songs.splice(action.payload,1)
        },
        changeAlbumName: (state, action) =>{
            state.value.albumName = action.payload
        },
        updateKeywords: (state,action)=>{
            state.value.keywords = action.payload
        },
        addDescription: (state, action) =>{
            state.value.description = action.payload
        }

    }
})

export const {addSong, removeAlbum, moveSongUp, moveSongDown, removeSong, changeAlbumName, updateKeywords, addDescription} = albumSlice.actions
export default albumSlice.reducer