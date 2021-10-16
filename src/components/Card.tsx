import { useState } from 'react'
import { ReactComponent as FilledHearthSVG } from '../static/icons/filled-hearth-icon.svg';
import { ReactComponent as EmptyHearthSVG } from '../static/icons/empty-hearth-icon.svg';
import { ReactComponent as TimeSVG } from '../static/icons/time-icon.svg';

type CardProps = {
    /** Author described on the card component */
    author?: string,
    /** Date created on the card component */
    date?: string,
    /** Title of the card */
    title?: string,
    /** Author described on the card component */
    filled?: boolean,
    /** Function used when click the card container */
    containerClick: () => void,
    /** Function used when click the hearth icon */
    iconClick: () => void
}

const Card = (props: CardProps) => {
    const {
        author,
        date,
        title,
        filled,
        containerClick,
        iconClick,
    } = props

    const [fill, setFill] = useState(filled)

    const onClickCard = () => containerClick()
    
    const onClickIcon = (e: React.MouseEvent) => {
        e.stopPropagation()
        iconClick()

        /** Change the fill of the hearth icon, and check on Context */
        setFill(!fill)
    }

    return (
        <div className="card card-hover">
            <div className="container" onClick={onClickCard}>
                <div className="left-card" >
                        <div className="left-card-container">
                            <TimeSVG className="card-icon"/>
                            <span className="card-time">
                                {date} by {author}
                            </span>
                        </div>
                        <span className="card-title">
                            {title}
                        </span>
                </div>
                <div className="right-card">
                    {
                        fill ? 
                            <FilledHearthSVG onClick={onClickIcon}/> :
                            <EmptyHearthSVG onClick={onClickIcon}/>    
                    }
                    
                </div>
            </div>
        </div>
    )
}

export {
    Card
}