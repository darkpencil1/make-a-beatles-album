import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: {
        artist: "John"
    }
 
}

export const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        changeArtist: (state, action)=>{
            state.value = action.payload
        }
    }

})

export const {changeArtist} = artistSlice.actions

export default artistSlice.reducer