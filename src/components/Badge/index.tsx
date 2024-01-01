
import styles from './index.module.css'

type BadgeProps = {
    type: string[];
}

export const Badge = ({ type }: BadgeProps) => {
    return (
        <article className={type.includes('grass') || type.includes('bug') ? styles.badge_container_green :
            type.includes('stile') || type.includes('dark') || type.includes('rock') ? styles.badge_container_gray :
                type.includes('water') || type.includes('ice') ? styles.badge_container_blue :
                    type.includes('fire') || type.includes('fighting') || type.includes('dragon') ? styles.badge_container_red :
                        type.includes('normal') || type.includes('gosth') ? styles.badge_container_light_blue :
                            type.includes('poison') || type.includes('psychic') || type.includes('fairy') || type.includes('ghost') ? styles.badge_container_purple :
                                type.includes('ground') ? styles.badge_container_brown :
                                    styles.badge_container_yellow
        }
        >

            <span className={styles.badge_text}>
                {type}
            </span>
        </article>
    )

}