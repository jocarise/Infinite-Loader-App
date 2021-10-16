import { FilterOptions } from "utils/types"

type PostOptionsProps = {
    /** Array of Object with filter options properties */
    filterOptions: FilterOptions[],
    /** Current selected index of the array of filter options */
    selectedIndex: number,
    /** Function to change the current selected option index */
    selectFilter: (index: number) => any,
}

const PostOptions = (props:PostOptionsProps) => {
    const { 
        filterOptions,
        selectFilter,
        selectedIndex
    } = props

    return (
        <div className="selection-container">
            {
                filterOptions.map(({ label, by }, index) => {
                    return (
                        <div 
                            className="Rectangle" 
                            key={by + index}
                            style={{
                                border: index === selectedIndex ? "solid 1px #1797ff" : "solid 1px #d6d6d6",
                            }}
                            onClick={selectFilter(index)}
                        >
                            <span 
                                className="selection-text" 
                                style={{
                                    color: index === selectedIndex ? "#1797ff" : "#606060"
                                }}
                            >
                                {label}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export {
    PostOptions
}