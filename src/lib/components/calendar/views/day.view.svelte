<script lang="ts">
	import { onMount } from 'svelte';
	import Timeline from '../timeline.svelte';
	import EventCard from '../event-card.svelte';
	import CurrentTimeIndicator from '../current-time-indicator.svelte';

	interface DayViewProps {
		events?: CalendarEvent[];
		currentDate?: string;
		pixelsPerMinute?: number;
		startHour?: number;
		endHour?: number;
	}

	let {
		events = [],
		currentDate = 'Tuesday, March 31',
		pixelsPerMinute = 2, // 2 pixels per minute (user can customize this)
		startHour = 8,
		endHour = 20
	}: DayViewProps = $props();

	let currentTime = $state('2:30 PM');

	// Calendar configuration
	const config: CalendarConfig = {
		pixelsPerMinute,
		startHour,
		endHour,
		showMinuteMarks: true,
		minuteMarkInterval: 15
	};

	// Helper function to convert time string to minutes from start of day
	function timeStringToMinutes(timeString: string): number {
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

	// Helper function to get minutes from calendar start time
	function getMinutesFromStart(totalMinutes: number): number {
		const startMinutes = config.startHour * 60;
		return totalMinutes - startMinutes;
	}

	// Generate time slots with minute granularity
	function generateTimeSlots() {
		const slots = [];
		for (let hour = config.startHour; hour <= config.endHour; hour++) {
			const time12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
			const label = hour >= 12 ? 'PM' : 'AM';
			const displayHour = hour === 0 ? 12 : time12;

			slots.push({
				time: `${displayHour}:00`,
				label,
				hour,
				minute: 0,
				totalMinutes: hour * 60
			});

			// Add 15, 30, 45 minute marks if desired
			if (config.showMinuteMarks && config.minuteMarkInterval) {
				for (let min = config.minuteMarkInterval; min < 60; min += config.minuteMarkInterval) {
					slots.push({
						time: `${displayHour}:${min.toString().padStart(2, '0')}`,
						label,
						hour,
						minute: min,
						totalMinutes: hour * 60 + min
					});
				}
			}
		}
		return slots;
	}

	const timeSlots = generateTimeSlots();

	onMount(() => {
		// Update current time every minute
		const interval = setInterval(() => {
			const now = new Date();
			currentTime = now.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			});
		}, 60000);

		return () => clearInterval(interval);
	});

	// Helper function to get event times in minutes
	function getEventTimes(event: CalendarEvent): { start: number; end: number } {
		let startMinutes: number;
		let durationMinutes: number;

		if (event.startMinutes !== undefined && event.durationMinutes !== undefined) {
			startMinutes = event.startMinutes;
			durationMinutes = event.durationMinutes;
		} else if (event.startTime) {
			startMinutes = timeStringToMinutes(event.startTime);
			durationMinutes = event.duration * 60;
		} else {
			startMinutes = event.startHour * 60;
			durationMinutes = event.duration * 60;
		}

		return {
			start: startMinutes,
			end: startMinutes + durationMinutes
		};
	}

	// Check if two events overlap
	function eventsOverlap(event1: CalendarEvent, event2: CalendarEvent): boolean {
		const times1 = getEventTimes(event1);
		const times2 = getEventTimes(event2);

		return times1.start < times2.end && times2.start < times1.end;
	}

	// Find all events that overlap with a given event
	function findOverlappingEvents(targetEvent: CalendarEvent): CalendarEvent[] {
		return events.filter(
			(event) => event.id !== targetEvent.id && eventsOverlap(event, targetEvent)
		);
	}

	// Calculate layout for overlapping events
	function calculateEventLayout(event: CalendarEvent): {
		width: string;
		left: string;
		zIndex: number;
	} {
		const overlapping = findOverlappingEvents(event);
		const totalOverlapping = overlapping.length + 1; // +1 for the current event

		if (totalOverlapping === 1) {
			// No overlap, use full width
			return {
				width: 'calc(100% - 40px)',
				left: '0px',
				zIndex: 10
			};
		}

		// Calculate position among overlapping events
		// Sort all overlapping events by start time, then by ID for consistency
		const allOverlapping = [event, ...overlapping].sort((a, b) => {
			const aTime = getEventTimes(a).start;
			const bTime = getEventTimes(b).start;
			if (aTime !== bTime) return aTime - bTime;
			return a.id - b.id;
		});

		const position = allOverlapping.findIndex((e) => e.id === event.id);
		const widthPercentage = 100 / totalOverlapping;
		const leftPercentage = position * widthPercentage;

		return {
			width: `calc(${widthPercentage}% - 8px)`, // Small gap between events
			left: `${leftPercentage}%`,
			zIndex: 10 + position // Higher z-index for later events
		};
	}

	function getEventStyle(event: CalendarEvent) {
		// Use minute-based positioning if available, fallback to hour-based
		let startMinutes: number;
		let durationMinutes: number;

		if (event.startMinutes !== undefined && event.durationMinutes !== undefined) {
			// Use new minute-based properties
			startMinutes = getMinutesFromStart(event.startMinutes);
			durationMinutes = event.durationMinutes;
		} else {
			// Fallback: convert from startTime string or legacy startHour
			if (event.startTime) {
				const totalStartMinutes = timeStringToMinutes(event.startTime);
				startMinutes = getMinutesFromStart(totalStartMinutes);
			} else {
				startMinutes = (event.startHour - config.startHour) * 60;
			}
			durationMinutes = event.duration * 60; // Convert hours to minutes
		}

		// Calculate vertical position and size based on pixelsPerMinute
		const topPosition = startMinutes * config.pixelsPerMinute;
		const height = Math.max(durationMinutes * config.pixelsPerMinute - 2, 20); // Minimum height of 20px

		// Calculate horizontal layout for overlapping events
		const layout = calculateEventLayout(event);

		return `position: absolute; top: ${topPosition}px; height: ${height}px; left: ${layout.left}; width: ${layout.width}; z-index: ${layout.zIndex};`;
	}

	function handleEventClick(event: CalendarEvent) {
		console.log('Event clicked:', event);
	}

	function handleNewEvent() {
		console.log('New event clicked');
	}

	function handlePrevious() {
		console.log('Previous clicked');
	}

	function handleNext() {
		console.log('Next clicked');
	}

	function handleToday() {
		console.log('Today clicked');
	}

	// Calculate current time line position dynamically
	function getCurrentTimeLinePosition(): number {
		const now = new Date();
		const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
		const minutesFromStart = getMinutesFromStart(currentTotalMinutes);
		return minutesFromStart * config.pixelsPerMinute + 10; // Add offset
	}

	const currentTimeLinePosition = getCurrentTimeLinePosition();

	const isCurrentTimeHigherThenEndHour = $derived(new Date().getHours() > config.endHour);
</script>

<div class="bg-background min-h-screen">
	<div class="flex gap-4 pt-6">
		<!-- Timeline Sidebar -->
		<Timeline
			{timeSlots}
			pixelsPerMinute={config.pixelsPerMinute}
			showMinuteMarks={config.showMinuteMarks}
			startHour={config.startHour}
			endHour={config.endHour}
		/>

		<!-- Timeline Content -->
		<div class="relative flex-1">
			<!-- Current time indicator -->
			{#if !isCurrentTimeHigherThenEndHour}
				<CurrentTimeIndicator {currentTime} timeLinePosition={currentTimeLinePosition} />
			{/if}

			<!-- Events Container -->
			<div
				class="relative"
				style="height: {(config.endHour - config.startHour) * 60 * config.pixelsPerMinute +
					20}px; padding: 10px 20px;"
			>
				{#each events as event (event.id)}
					<EventCard {event} style={getEventStyle(event)} onClick={handleEventClick} />
				{/each}
			</div>
		</div>
	</div>
</div>
