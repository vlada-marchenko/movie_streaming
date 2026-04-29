'use client'

import css from './Plans.module.css'
import Link from 'next/link'

export default function Plans() {
    const plans = [
        {
            id: 1,
            name: 'Basic Plan',
            description: 'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
            price: '9.99'
        },
        {
            id: 2,
            name: 'Standard Plan',
            description: 'Access to a wider selection of movies and shows, including most new releases and exclusive content',
            price: '12.99'
        },
        {
            id: 3,
            name: 'Premium Plan',
            description: 'Access to a widest selection of movies and shows, including all new releases and Offline Viewing',
            price: '14.99'
        }
    ]
    return (
        <div className={css.container} id="plans">
            <h2 className={css.title}>Choose the plan that`s right for you</h2>
            <p className={css.text}>Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</p>

            <ul className={css.plans}>
                {plans.map(plan => {
                    return ( 
                        <li key={plan.id} className={css.plan}>
                            <div>
                            <h3 className={css.planName}>{plan.name}</h3>
                            <p className={css.text}>{plan.description}</p>
                            </div>
                            <p className={css.price}><span className={css.span}>${plan.price}</span>/month</p>

                            <div className={css.buttons}>
                                <Link className={css.trial} href='/subscriptions'>Start Free Trial</Link>
                                <Link className={css.choose} href='/subscriptions'>Choose Plan</Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}