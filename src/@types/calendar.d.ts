interface CalendarEvent {
	id: number;
	title: string;
	startTime: string;
	endTime: string;
	startHour: number;
	duration: number;
	startMinutes?: number;
	durationMinutes?: number;
	color: string;
	colorHex?: string;
	avatar?: string;
	participants?: number;
	isNow?: boolean;
}

interface TimeSlot {
	time: string;
	label: string;
	hour: number;
	minute?: number;
	totalMinutes?: number;
}

interface CalendarViewProps {
	events?: CalendarEvent[];
	currentDate?: string;
	initialTab?: string;
	pixelsPerMinute?: number;
	startHour?: number;
	endHour?: number;
}

type CalendarView = 'Month' | 'Week' | 'Agenda' | 'Day';

interface CalendarConfig {
	pixelsPerMinute: number;
	startHour: number;
	endHour: number;
	showMinuteMarks?: boolean;
	minuteMarkInterval?: number;
}

class TimeUtils {
	/**
	 * Convert time string (e.g., "2:30 PM") to total minutes from midnight
	 */
	static timeStringToMinutes(timeString: string): number {
		const [time, period] = timeString.split(' ');
		const [hourStr, minuteStr] = time.split(':');
		let hour = parseInt(hourStr);
		const minute = parseInt(minuteStr) || 0;

		if (period?.toUpperCase() === 'PM' && hour !== 12) {
			hour += 12;
		} else if (period?.toUpperCase() === 'AM' && hour === 12) {
			hour = 0;
		}

		return hour * 60 + minute;
	}

	/**
	 * Convert total minutes from midnight to time string
	 */
	static minutesToTimeString(totalMinutes: number): string {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

		return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
	}

	/**
	 * Calculate duration in minutes between start and end time strings
	 */
	static calculateDurationMinutes(startTime: string, endTime: string): number {
		const startMinutes = this.timeStringToMinutes(startTime);
		const endMinutes = this.timeStringToMinutes(endTime);
		return endMinutes - startMinutes;
	}

	/**
	 * Create a CalendarEvent with minute-based precision
	 */
	static createEvent(
		id: number,
		title: string,
		startTime: string,
		endTime: string,
		color: string,
		options?: Partial<CalendarEvent>
	): CalendarEvent {
		const startMinutes = this.timeStringToMinutes(startTime);
		const durationMinutes = this.calculateDurationMinutes(startTime, endTime);
		const startHour = startMinutes / 60;
		const duration = durationMinutes / 60;

		return {
			id,
			title,
			startTime,
			endTime,
			startHour,
			duration,
			startMinutes,
			durationMinutes,
			color,
			...options
		};
	}
}
