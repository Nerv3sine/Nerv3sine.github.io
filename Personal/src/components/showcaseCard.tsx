import "./showcaseCard.css"
import { projData, btnDetails } from "../dataLoading";

interface showcaseCardProps {
    data: projData
}

export default function ShowcaseCard({data}:showcaseCardProps) {
    
    return (
        <div className="cardBody">
            <img className="cardSnapshot" src={data.image}/>
            <h3 className="cardName">{data.caption}</h3>
            <p className="cardSubtext">{data.subCaption}</p>
            {data.buttons.map((btn:btnDetails) => {
                return(<a href={btn.link}><button>{btn.label}</button></a>)
            })}
        </div>
    )
}