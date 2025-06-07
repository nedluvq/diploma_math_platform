import image from '../../assets/avatar.png'
import styles from './profilebadge.module.css'
import { Badge } from '../../interfaces/IBadge'

const ProfileBadge: React.FC<Badge> = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img className={styles.avatar} src={image}/>
                <p>{props.name}</p>
            </div>
        </div>
    )
}

export default ProfileBadge