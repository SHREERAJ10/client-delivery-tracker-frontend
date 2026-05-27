import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { StickyNote } from "lucide-react"

export function DeliverableNote({ note }) {
    return (
        <Popover>
            <PopoverTrigger asChild className="rounded-none">
                <Button variant="outline"><StickyNote /></Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="rounded-none">
                <PopoverHeader>
                    <PopoverTitle>Note:</PopoverTitle>
                    <PopoverDescription>
                        {note || "Add note to get started!"}
                    </PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    )
}
