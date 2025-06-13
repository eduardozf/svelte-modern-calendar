export const eventsMock: CalendarEvent[] = [
	{
		id: 1,
		title: 'Team Meeting',
		startTime: '8:00 AM',
		endTime: '9:15 AM',
		startHour: 8,
		duration: 1.25,
		startMinutes: 8 * 60, // 8:00 AM = 480 minutes from midnight
		durationMinutes: 75, // 1 hour 15 minutes
		color: 'bg-blue-600',
		colorHex: '#0398dc', // Soft blue
		avatar: 'A'
	},
	{
		id: 2,
		title: 'Coffee Break',
		startTime: '9:15 AM',
		endTime: '9:30 AM',
		startHour: 9.25,
		duration: 0.25,
		startMinutes: 9 * 60 + 15, // 9:15 AM = 555 minutes
		durationMinutes: 15, // 15 minutes
		color: 'bg-amber-500',
		colorHex: '#f59e0b'
	},
	{
		id: 3,
		title: 'Project Review',
		startTime: '9:30 AM',
		endTime: '10:45 AM',
		startHour: 9.5,
		duration: 1.25,
		startMinutes: 9 * 60 + 30, // 9:30 AM = 570 minutes
		durationMinutes: 75, // 1 hour 15 minutes
		color: 'bg-emerald-500',
		colorHex: '#10b981'
	},
	{
		id: 4,
		title: 'Client Call',
		startTime: '11:00 AM',
		endTime: '11:45 AM',
		startHour: 11,
		duration: 0.75,
		startMinutes: 11 * 60, // 11:00 AM = 660 minutes
		durationMinutes: 45, // 45 minutes
		color: 'bg-violet-500',
		colorHex: '#818cf8',
		avatar: 'C'
	},
	// Overlapping events example - same time slot
	{
		id: 5,
		title: 'Lunch Meeting',
		startTime: '12:00 PM',
		endTime: '1:00 PM',
		startHour: 12,
		duration: 1,
		startMinutes: 12 * 60, // 12:00 PM = 720 minutes
		durationMinutes: 60, // 1 hour
		color: 'bg-orange-500',
		colorHex: '#f97316',
		avatar: 'L'
	},
	{
		id: 6,
		title: 'Personal Call',
		startTime: '12:30 PM',
		endTime: '1:30 PM',
		startHour: 12.5,
		duration: 1,
		startMinutes: 12 * 60 + 30, // 12:30 PM = 750 minutes
		durationMinutes: 60, // 1 hour
		color: 'bg-purple-500',
		colorHex: '#a855f7',
		avatar: 'P'
	},
	{
		id: 7,
		title: 'Design Review',
		startTime: '1:00 PM',
		endTime: '2:20 PM',
		startHour: 13,
		duration: 1.33,
		startMinutes: 13 * 60, // 1:00 PM = 780 minutes
		durationMinutes: 80, // 1 hour 20 minutes
		color: 'bg-pink-500',
		colorHex: '#ec4899',
		avatar: 'E',
		participants: 4
	},
	// Triple overlap example
	{
		id: 8,
		title: 'Team Sync',
		startTime: '2:30 PM',
		endTime: '3:30 PM',
		startHour: 14.5,
		duration: 1,
		startMinutes: 14 * 60 + 30, // 2:30 PM = 870 minutes
		durationMinutes: 60, // 1 hour
		color: 'bg-teal-500',
		colorHex: '#0d9488',
		avatar: 'T',
		isNow: true
	},
	{
		id: 9,
		title: 'Code Review',
		startTime: '3:00 PM',
		endTime: '4:00 PM',
		startHour: 15,
		duration: 1,
		startMinutes: 15 * 60, // 3:00 PM = 900 minutes
		durationMinutes: 60, // 1 hour
		color: 'bg-indigo-500',
		colorHex: '#6366f1',
		avatar: 'C'
	},
	{
		id: 10,
		title: 'Client Demo',
		startTime: '3:15 PM',
		endTime: '4:15 PM',
		startHour: 15.25,
		duration: 1,
		startMinutes: 15 * 60 + 15, // 3:15 PM = 915 minutes
		durationMinutes: 60, // 1 hour
		color: 'bg-red-500',
		colorHex: '#dc2626',
		avatar: 'D',
		participants: 3
	},
	{
		id: 11,
		title: 'End of Day Wrap-up',
		startTime: '5:00 PM',
		endTime: '5:30 PM',
		startHour: 17,
		duration: 0.5,
		startMinutes: 17 * 60, // 5:00 PM = 1020 minutes
		durationMinutes: 30, // 30 minutes
		color: 'bg-gray-600',
		colorHex: '#64748b',
		avatar: 'W'
	}
];
