export interface Project {
	id?: string
	name: string
	desc?: string
	coverImg?: string
	enabled?: boolean
	taskLists?: string[] // TaskList ID list
	members?: string[] // key MemberID， value role
}
