import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'


const initialState = [
  { 
    id: '1', title: 'First Post!', 
    content: 'Hello!', 
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
    date: sub(new Date(), { minutes: 10 }).toISOString() 
  },
  { 
    id: '2', title: 'Second Post', 
    content: 'More text', 
    reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
    date: sub(new Date(), { minutes: 10 }).toISOString() 
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
         prepare(title, content, userId) {
            return {
              payload: {
                id: nanoid(),
                title,
                content, 
                date: new Date().toISOString(),
                userId
              }
            }
          },
          reducer: (state, action) => {
               state.push(action.payload)
           },
    },
    postUpdated(state, action) {
        const { id, title, content } = action.payload
        const existingPost = state.find(post => post.id === id)
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
    },
    reactionAdded(state, action) {
        const { postId, reaction } = action.payload
        const existingPost = state.find(post => post.id === postId)
        if (existingPost) {
          existingPost.reactions[reaction]++
        }
      }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectPosts = state => state.posts;

export default postsSlice.reducer

