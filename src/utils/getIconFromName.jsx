import { Lock, Mail, UserRound } from 'lucide-react'

function getIconFromName(icon) {
    switch(icon){
        case "UserRound":
            return <UserRound size={20} strokeWidth={2} color="#7C7C7C" />
        case "Lock":
            return <Lock size={20} strokeWidth={2} color="#7C7C7C" />
        case "Mail":
            return <Mail size={20} strokeWidth={2} color="#7C7C7C" />
    }
}

export default getIconFromName;