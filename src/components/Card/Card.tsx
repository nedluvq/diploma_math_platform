import { Typography } from "@mui/material"
import { ICard } from "./ICard"
import styles from './card.module.css'
import { Link } from "react-router"
import { routes } from "../../router/routes"

const Card: React.FC<ICard> = (props) => {
    return (
        <Link 
          to={routes.Task.replace(':id', '1')}
          style={{ textDecoration: 'none', color: 'inherit' } }
        >
          <div className={props.isCurrent == true ? (styles.wrapperCurrent) : (styles.wrapper)}>
            <img src={props.image} className={styles.image}/>
            <Typography style={{ backgroundColor: 'transparent' }}>{props.name}</Typography>
        </div>
        </Link>
        
    )
}

export default Card