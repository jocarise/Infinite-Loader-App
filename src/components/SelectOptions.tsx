type Option = {
    value: string,
    name: string
}

type OptionsProps = {
    /** Current value of Select */
    selectedValue: string,
    /** Array of Object with the options of the Select*/
    options: Option[],
    /** Function to Update selected value when change */
    onSelectOption: (e: any) => void,
}

const SelectOptions = (props : OptionsProps) => {
    const { 
        selectedValue,
        options,
        onSelectOption
    } = props

    return (
        <div className="margin-left values-selector"> 
            <select
                value={selectedValue}
                onChange={onSelectOption}
                className="options-selector"
            >
                {
                    options.map(({ value, name }, index)=> {
                        return <option value={value} key={value + index}>{name}</option>
                    })
                }   
            </select>
        </div>
    )
}

export {
    SelectOptions,
}