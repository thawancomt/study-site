
export default function NotesSearchInput() {
    return (
        <input type="text" 
        className={" w-full border  rounded-lg p-2 text-accent placeholder:text-accent/40 focus:outline-none border-muted-foreground"} 
        placeholder="Search for notes"/>
    )
}