<script lang="ts">
	import CalendarHeader from './calendar-header.svelte';
	import DayView from './views/day.view.svelte';

	interface CalendarProps {
		currentDate: string;
		events: CalendarEvent[];
		pixelsPerMinute: number;
		startHour: number;
		endHour: number;
	}

	let {
		currentDate = $bindable(new Date().toISOString()),
		events = $bindable([]),
		pixelsPerMinute = $bindable(2),
		startHour = $bindable(8),
		endHour = $bindable(18)
	}: CalendarProps = $props();
	const eventsCount = $derived(events.length);
</script>

<div class="bg-background min-h-screen">
	<CalendarHeader {currentDate} {eventsCount} />
	<DayView {events} {pixelsPerMinute} {startHour} {endHour} />
</div>
