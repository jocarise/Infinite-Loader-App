import { useContext } from "react";
import { FavoritesContext } from "App";

import { Post } from "utils/types"
import { openInNewTab } from 'utils/scripts/openNewTab';
import { checkIfPostExist, removePost, savePost } from "utils/scripts/favoritesPostStorage";
import { timeDiffCalc } from "utils/scripts/date";

import { Card } from "./Card"

type PostsCardProps = {
    /** Array of Objects with the Post properties */
    posts: Post[],
}

const PostCards = (props: PostsCardProps)  => {
    const {
        posts
    } = props

    /** Check when a favoriteIcon click and re-render */
    const { favoriteChange, setFavoriteChange }  = useContext(FavoritesContext);

    const saveOrRemoveFavoritesPost = (post: Post) => () => {
        const exist: boolean = checkIfPostExist(post.objectID ? post.objectID  : "0")

        !exist && savePost(post)
        exist && removePost(post.objectID ? post.objectID  : "0")

        setFavoriteChange(!favoriteChange)
    }

    const goToUrl = (url:string) => () => openInNewTab(url)

    return (
        <div className="card-container">
            {
                posts && posts.length > 0 && posts.map((post: Post) => {
                    const { author, story_title, story_url , created_at, objectID } = post

                    if(author && story_title && story_url && created_at){
                        return (
                            <Card 
                                author={author}
                                title={story_title}
                                date={timeDiffCalc({ dateFuture: created_at ? new Date(created_at) : Date.now(), dateNow: Date.now() })}
                                containerClick={goToUrl(story_url)}
                                iconClick={saveOrRemoveFavoritesPost(post)}
                                filled={checkIfPostExist(objectID ? objectID : "0")}
                                key={objectID}
                            />
                        )
                    }
                    return null
                })
            }
        </div>
    )
}

export {
    PostCards
}