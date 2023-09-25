import {RocketIcon} from '@sanity/icons'
import {useState} from "react";
export default function FullRebuild({onComplete}) {
    const [dialogOpen, setDialogOpen] = useState(false)
    return {
        label: 'Rebuild Site',
        icon: RocketIcon,
        onHandle: () => {
            setDialogOpen(true)
        },
        dialog: dialogOpen && {
            type: 'confirm',
            onCancel: onComplete,
            onConfirm: () => {
                fetch('https://api.vercel.com/v1/integrations/deploy/prj_JToXpqAoplaCvu2aCjYpnPi4j1Gy/uiD9rneF22?buildCache=false')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        onComplete()
                    });
            },
            message: 'Trigger a full rebuild of the site? This action will be performed in the background and will take several minutes to complete.'
        }
    }
}