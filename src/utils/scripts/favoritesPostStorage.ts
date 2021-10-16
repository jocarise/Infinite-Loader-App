import { Post } from './../types';

/**
 * Get favorites post saved on localStorage
 *
 * @return {Array} Array of objects | empty array.
 */
const getSavedPosts = () => {
    return JSON.parse(localStorage.getItem('favoritesPosts') || '[]')
}

/**
 * Get current favorites post and update with the new post on localStorage
 *
 * @param {Post} Post object.
 * @return {void}
 */
const savePost = (newPost: Post) => {
    const olderPosts = getSavedPosts()
    const newPosts = [...olderPosts, newPost]
    localStorage.setItem('favoritesPosts', JSON.stringify(newPosts))
}

/**
 * Get current favorites post and remove it with the postId from localStorage
 *
 * @param {string} postId
 * @return {void}
 */
const removePost = (postId: string) => {
    const olderPosts = getSavedPosts()
    const removePostId = parseInt(postId ? postId : "0")

    const newPostRemove = olderPosts.filter((post: Post) =>  {
        const { objectID } = post
       if(objectID && removePostId){
            const newObject = parseInt(objectID);
            return removePostId !== newObject
        } 

        return post
    })

    localStorage.setItem('favoritesPosts', JSON.stringify(newPostRemove))
}

/**
 * Get current favorites post and check if exist with the postId from localStorage
 *
 * @param {string} postId
 * @return {boolean}
 */
const checkIfPostExist = (postId: string) => {
    const newPostId = parseInt(postId ? postId : "0")
    const olderPosts: Post[] = getSavedPosts()

    const exist: boolean = olderPosts.some(({ objectID }) => {
        if(objectID && newPostId){
            const newObject = parseInt(objectID);
            return newPostId === newObject
        }

        return true
    }); 

    return exist
}

export {
    getSavedPosts,
    savePost,
    removePost,
    checkIfPostExist,
}