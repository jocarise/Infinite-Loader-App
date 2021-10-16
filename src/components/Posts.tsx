import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { FavoritesContext } from "App";

import { FILTER_BY_ALL, FILTER_BY_FAVORITES } from "utils/constants";

import useNearScreen from "hooks/useNearScreen";
import debounce from "just-debounce-it";
import { getSavedPosts } from "utils/scripts/favoritesPostStorage";
import { Post } from "utils/types"

import { seachByQuery } from "../services/api.service.search"

import { Loader } from "./Loader"
import { PostCards } from "./PostCards";
import { PostOptions } from "./PostOptions";
import { SelectOptions } from "./SelectOptions";

const FILTER_OPTIONS = [
    {
        by: FILTER_BY_ALL,
        label: "All",
        selected: true,
    },
    {
        by: FILTER_BY_FAVORITES,
        label: "Favorites",
        selected: false,
    }
]

const SEARCH_OPTIONS = [
    {
        name: "React",
        value: "reactjs",
        image: null
    },
    {
        name: "Angular",
        value: "angular",
        image: null
    },
    {
        name: "Vuejs",
        value: "vuejs",
        image: null
    }
];

const Posts = () => {
    /** Boolean value that change when favorite icon is clicked*/
    const { favoriteChange } = useContext(FavoritesContext);

    const [postOptionIndex, setPostIndex] = useState(() => {
        /**Return selected option saved on localStorage or return the default value*/
        const optionFilter: string | null = localStorage.getItem('optionFilter');
        return optionFilter ? parseInt(optionFilter) : 0;
    });
    const [selectedSearchOption, setSelectedSearchOption] = useState(() => {
        /**Return selected search option saved on localStorage or return the default value*/
        const optionSearch: string | null = localStorage.getItem('searchOption');
        return optionSearch ? optionSearch : SEARCH_OPTIONS[0].value;
    });
    
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [favPosts, setFavPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0)

    const externalRef = useRef(null)
    const { isNearScreen } = useNearScreen({ externalRef: loading ?  null : externalRef, once: false })

    /**When is executed save selected option on localStorage */
    const onSelectFilter = (index: number) => () => {
        setPostIndex(index);
        localStorage.setItem('optionFilter', index.toString() );
    }

    /**When is executed reset the page and post states and save selected search option on localStorage */
    const onSelectOption = (e: any) => {
        setPage(0)  
        setPosts([]) 
        localStorage.setItem('searchOption', e.target.value);
        setSelectedSearchOption(e.target.value)
    }

    const loadPostSearch = useCallback( async () => {
           try {
                setLoading(true)
                const data:any = await seachByQuery({ query: selectedSearchOption, page: page });
                const { hits }: { hits: Post[]} = data

                hits && setPosts((prev: Post[]) => { return [...prev, ...hits]})
           } catch(e){
                console.log(e)
           } finally {
                setLoading(false)
           }
        },
        [selectedSearchOption, page],
    )

    /**Execute when favoriteChange change and load favorites posts from localStorage */
    const loadFavoritePost = () => {
        const favPost: Post[] = getSavedPosts()
        setFavPosts(favPost)
    }

    /**Execute when isNearScreen is true, increment page and make the request to get new post */
    const debounceHandleNextPage = useCallback(//eslint-disable-line react-hooks/exhaustive-deps
        debounce( () => setPage((prev) => { return prev + 1 }) , 500), [setPage]
    ) 

    /**Re-render when isNearScreen change and execute the function debounceHandleNextPage */
    useEffect(() => {
        isNearScreen && debounceHandleNextPage()   
    }, [isNearScreen, debounceHandleNextPage])

    /**Re-render when selectedSearchOption change and execute the function selectedSearchOption */
    useEffect(() => {
        loadPostSearch()
    }, [selectedSearchOption, loadPostSearch])

    /**Re-render when favoriteChange change and execute the function loadFavoritePost */
    useEffect(() => {
        loadFavoritePost()
    }, [favoriteChange])

    return (
        <div>
            <PostOptions 
                selectedIndex={postOptionIndex}
                filterOptions={FILTER_OPTIONS}
                selectFilter={onSelectFilter}
            />
            { 
                FILTER_OPTIONS[postOptionIndex]?.by === FILTER_BY_ALL && 
                    <div data-testid="all-component">
                       <SelectOptions
                            selectedValue={selectedSearchOption}
                            options={SEARCH_OPTIONS}
                            onSelectOption={onSelectOption} 
                        />
                        <PostCards 
                            posts={posts}
                        />
                        { !loading && <div id="visor" ref={externalRef}></div>}
                        { loading &&  <Loader />}
                    </div>
            }
            { FILTER_OPTIONS[postOptionIndex]?.by === FILTER_BY_FAVORITES && 
                <div data-testid="favorites-component">
                    <PostCards 
                        posts={favPosts}
                    />
                </div>
            }
        </div>
    )
}

export {
    Posts
}