import { gtagActions } from "./analytics";

export const events = {
    grantsBookClick: () => {
        gtagActions.event({
            category: 'portfolio',
            label: 'eap',
            action: 'click',
            value: 'clicked'
        })
    }
}

